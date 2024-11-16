import React, { memo } from "react";
import isEqual from "react-fast-compare";

import { Text, TextProps, TextStyle } from "react-native";
import { MHS } from "ui/sizes.ui";

interface Props extends TextProps {
  title?: string | string[];
  style?: TextStyle;
  numberOfLines?: number;
  fontSize?: number;
  fontWeight?: "400" | "normal" | "bold" | "100" | "200" | "300" | "500" | "600" | "700" | "800" | "900" | undefined;
  color?: string;
  textAlign?: "center" | "left" | "right"
}

const TextBase = (props: Props) => {
  const { style, title, children, numberOfLines, fontSize = 14, fontWeight = "400", textAlign = "left" } = props;
  const color = props.color || "#474747";
  //@ts-ignore
  if (!MHS?.[`_${fontSize}`]) {
    console.warn("Not existing fontsize size: ", fontSize)
  }
  //@ts-ignore
  const _fontSize = MHS?.[`_${fontSize}`] || 14

  return (
    <Text
      {...props}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: _fontSize,
          color,
          includeFontPadding: false,
        },
        { textAlign },
        { fontWeight: fontWeight },
        style,
      ]}
    >
      {title || ""}
      {children}
    </Text>
  )
}

export default memo(TextBase, isEqual);
