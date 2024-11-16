import React, {
  forwardRef,
  memo,
  ReactElement,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import isEqual from 'react-fast-compare';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps, Keyboard,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';
import { Device } from 'ui/device.ui';
import {
  HS,
  MHS,
  VS,
} from 'ui/sizes.ui';

import { useScrollToTop } from '@react-navigation/native';
import { IconEmptyBox } from 'assets/svgIcons';
import { RootColor, ThemeContext } from 'ui/theme/theme.context';
import TextBase from '../text/text.base';

interface Props<T> extends Omit<FlatListProps<T>, "data"> {
  scrollIndex?: number,
  onRefreshProp?: () => Promise<T[]>,
  onLoadMoreProp?: (page: number) => Promise<T[]>,
  tabLabel?: string,
  skeleton?: () => ReactElement
  canCallLoadmore?: boolean
  emptyTitle?: string
  limit?: number
  isAutoFirstLoad?: boolean
  showLoadingWhenReload?: boolean
  hideHeaderWhenEmptyData?: boolean
}

export interface TypedRefBaseListCustom<T> {
  refresh: () => void
  filterList: (functionCB: React.SetStateAction<T[]>) => void
  addItemToList: (item: any) => void
  loadMore: () => void
  list: T[]
  scrollToTop: () => void
}

const ListBaseComponent = <T,>(props: Props<T>, ref: React.Ref<TypedRefBaseListCustom<T>>) => {
  const {
    scrollIndex,
    onRefreshProp,
    onLoadMoreProp,
    style = {},
    tabLabel,
    skeleton,
    canCallLoadmore = true,
    isAutoFirstLoad = true,
    ListEmptyComponent,
    emptyTitle,
    limit = 20,
    keyExtractor,
    scrollEnabled = true,
    showLoadingWhenReload = false,
    hideHeaderWhenEmptyData,
    ...flatlistProps
  } = props;
  const { theme } = useContext(ThemeContext)
  const flatlistRef = useRef<FlatList<T>>(null);
  const canLoadmore = useRef(true);
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(isAutoFirstLoad);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const page = useRef(1)
  const hasScrolled = useRef(false)

  useScrollToTop(flatlistRef);

  useEffect(() => {
    if (loading) {
      onRefresh()
    }
  }, [loading])

  const onRefresh = async () => {
    try {
      const res = await onRefreshProp?.();
      setLoading(false);
      if (res) {
        if (res.length < limit) {
          canLoadmore.current = false
        } else {
          canLoadmore.current = true
        }
        setList(res);
        page.current = 1
        return;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refresh: () => {
      setLoading(true);
    },
    filterList: (functionCallback) => {
      setList(functionCallback)
    },
    addItemToList: (item) => {
      setList(prev => ([item, ...prev]))
    },
    removeAll: () => {
      setList([])
    },
    loadMore: callManualLoadmore,
    list: list,
    scrollToTop: () => {
      flatlistRef.current?.scrollToOffset({ offset: 0, animated: false })
    }
  }), [list]);

  const renderFooterComponent = () => {
    return (
      <View style={styles.footerLoading}>
        {
          isLoadMore && <ActivityIndicator color={RootColor.MainColor} size={"large"} />
        }
      </View>
    )
  };

  const callManualLoadmore = async () => {
    if (canLoadmore.current) {
      try {
        canLoadmore.current = false;
        setIsLoadMore(true)
        const res = await onLoadMoreProp?.(page.current + 1);

        if (res && res.length < limit) {
          canLoadmore.current = false
        } else {
          canLoadmore.current = true
        }
        setIsLoadMore(false)
        if (res && res.length > 0) {
          setList(prev => ([...prev, ...res]))
          page.current = page.current + 1
        }
      } catch (error) {
        canLoadmore.current = true
        setIsLoadMore(false)
      }
    }
  }

  const handleLoadMore = async () => {
    if (!isLoadMore && hasScrolled.current && canCallLoadmore && canLoadmore.current) {
      try {
        setIsLoadMore(true)
        const res = await onLoadMoreProp?.(page.current + 1);
        if (res && res.length < limit) {
          canLoadmore.current = false
        } else {
          canLoadmore.current = true
        }
        setIsLoadMore(false)
        if (res && res.length > 0) {
          setList(prev => ([...prev, ...res]))
          page.current = page.current + 1
        }
      } catch (error) {
        canLoadmore.current = false
        setIsLoadMore(false)
      }
    }
    hasScrolled.current = false;
  }

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.viewEmpty}>
        <View style={[styles.iconEmpty, { backgroundColor: theme.btnActive }]}>
          <IconEmptyBox color={theme.textLight} size={MHS._46} />
        </View>
        <TextBase title={emptyTitle || "Not found"} fontSize={26} fontWeight="700" style={styles.textTitleEmpty} />
      </View>
    )
  }, [])

  if (loading && skeleton && ((list.length === 0 && !showLoadingWhenReload) || showLoadingWhenReload)) {
    return skeleton()
  }

  return (
    <FlatList
      {...flatlistProps}
      ref={flatlistRef}
      data={list}
      style={style}
      onMomentumScrollBegin={() => Keyboard.dismiss()}
      scrollEventThrottle={16}
      //@ts-ignore
      keyExtractor={(item, index) => keyExtractor ? keyExtractor(item, index) : `${item._id ? item._id : index}`}
      ListFooterComponent={!loading ? (props.ListFooterComponent || renderFooterComponent) : undefined}
      extraData={list}
      onScrollBeginDrag={() => hasScrolled.current = true}
      onScrollEndDrag={() => hasScrolled.current = true}
      onEndReached={handleLoadMore}
      // onEndReachedThreshold={0.5}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Device.isAndroid}
      ListHeaderComponent={hideHeaderWhenEmptyData && list.length == 0 ? null : props.ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent || renderEmptyComponent}
      refreshControl={
        scrollEnabled && !flatlistProps.horizontal ?
          <RefreshControl colors={["#48B794"]} refreshing={false} onRefresh={onRefresh} />
          : undefined
      }
      bounces={scrollEnabled}
      bouncesZoom={scrollEnabled}
    />
  );
}

const styles = StyleSheet.create({
  footerLoading: {
    height: VS._40,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    height: VS._40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HS._16
  },
  viewEmpty: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: VS._100,
    // width: Device.width - HS._32
  },
  iconEmpty: {
    width: MHS._66,
    height: MHS._66,
    borderRadius: MHS._66,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitleEmpty: {
    textAlign: "center",
    marginVertical: VS._16,
    marginHorizontal: HS._32
  },
})

const ForwardedListBase = forwardRef(ListBaseComponent) as <T>(
  props: Props<T> & { ref?: Ref<TypedRefBaseListCustom<T>> }
) => ReturnType<typeof ListBaseComponent>;

const ListBase = memo(
  ForwardedListBase,
  isEqual
) as typeof ForwardedListBase;

// Export the component
export default ListBase;
