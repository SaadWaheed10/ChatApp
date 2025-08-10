import { Text, TextProps } from 'react-native';
import { memo } from 'react';
import { adjustTextSize } from '../utils/responsiveFunction';

interface TextConfig extends TextProps {
  textContent: string | number;
  textSize: number;
  textColor?: string;
  textLineHeight?: number;
  isHomeScreen?: boolean;
}

const StyledText = ({
  textContent,
  textSize,
  textColor,
  textLineHeight,
  style,
  numberOfLines,
  ...otherProps
}: TextConfig) => {
  return (
    <Text
      {...otherProps}
      style={[
        {
          fontSize: adjustTextSize(textSize),
          color: textColor ?? '#000000',
          lineHeight: textLineHeight,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
    >
      {textContent}
    </Text>
  );
};

export default memo(StyledText);
