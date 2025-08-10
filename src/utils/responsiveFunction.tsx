import { Dimensions, Platform, PixelRatio } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { MMKVLoader } from 'react-native-mmkv-storage';

const designBaseWidth = 430;
const designBaseHeight = 932;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const safeBottomPadding = initialWindowMetrics?.insets?.bottom ?? 0;
const horizontalRatio = DEVICE_WIDTH / designBaseWidth;
const verticalRatio = (DEVICE_HEIGHT - safeBottomPadding) / designBaseHeight;

export const StorageInstance = new MMKVLoader().initialize();

export const scaleHorizontal = (value: number) => {
  const adjustedValue = value * horizontalRatio;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(adjustedValue));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(adjustedValue)) - 1;
  }
};

export const adjustTextSize = (baseSize: number, adjustmentFactor = 0.5) => {
  return baseSize + (scaleHorizontal(baseSize) - baseSize) * adjustmentFactor;
};

export const scaleVertical = (value: number) => {
  const adjustedValue = value * verticalRatio;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(adjustedValue));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(adjustedValue)) - 1;
  }
};

export const dropShadowConfig = (
  level = 3,
  color = '#000000',
  opacity = 0.2,
  blur = 10,
  verticalOffset = 2,
  horizontalOffset = 0,
) => ({
  elevation: level,
  shadowRadius: blur,
  shadowOpacity: opacity,
  shadowColor: color,
  shadowOffset: {
    width: horizontalOffset,
    height: verticalOffset,
  },
});
