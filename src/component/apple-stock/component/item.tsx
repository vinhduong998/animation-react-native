import { Canvas, Path, Shadow, SkPath, Skia } from '@shopify/react-native-skia';
import { curveBasis, line, scaleLinear, scaleTime } from 'd3';
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

interface TypedItem {
  title: string
  name: string,
  price: number
  original_price: number
  data: {
    date: string
    value: number
  }[]
}

type DataPoint = {
  date: string;
  value: number;
};

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

const window = Dimensions.get("window")

const GRAPH_HEIGHT = 60;
const GRAPH_WIDTH = window.width / 3;


function financial(x: number | string) {
  return Number.parseFloat(String(x)).toFixed(2);
}

const Item = ({ item }: { item: TypedItem }) => {
  const makeGraph = (data: DataPoint[]): GraphData => {
    const max = Math.max(...data.map((val) => val.value));
    const min = Math.min(...data.map((val) => val.value));
    const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 0]);

    const x = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
      .range([0, GRAPH_WIDTH]);

    const curvedLine = line<DataPoint>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return {
      max,
      min,
      curve: skPath!,
    };
  };

  const color = Number(item.price) > Number(item.original_price) ? "#32A54A" : "#cc3232"

  const graphData = makeGraph(item.data);

  const path = useDerivedValue(() => {
    return graphData.curve;
  }, [])

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.titleItem}>{item.title}</Text>
        <Text style={styles.descriptionTitle}>{item.name}</Text>
      </View>
      <View style={styles.content}>
        <Canvas
          style={{ width: GRAPH_WIDTH, height: GRAPH_HEIGHT }}
        >
          <Path
            style="stroke"
            path={path}
            strokeWidth={3}
            color={color}
          >
            <Shadow dx={0} dy={1} blur={50} color={color} />
            <Shadow dx={0} dy={1} blur={60} color={color} />
            <Shadow dx={0} dy={1} blur={30} color={color} />
          </Path>
        </Canvas>
      </View>
      <View>
        <Text style={styles.price}>{financial(item.price)}</Text>
        <Text style={[styles.originalPrice, { color }]}>{financial(item.price - item.original_price)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10
  },
  titleItem: {
    fontSize: 18,
    color: "white",
    fontWeight: "600"
  },
  descriptionTitle: {
    fontSize: 14,
    color: "white"
  },
  price: {
    fontSize: 16,
    color: "white",
    fontWeight: "600"
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: "600"
  },
  content: {
    flex: 1,
    alignItems: "flex-end"
  },
})

export default Item;