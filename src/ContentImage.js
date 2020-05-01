import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  divide,
  sub,
  abs,
  min,
  max,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';
import {DELAY_HEIGHT} from './constants';

const TARGET_SCALE = 0.85;
const TARGET_OPACITY = 0.3;
const TARGET_TRANSLATE_X = 15;

export default ({y}) => {
  const {height} = usePagingDimensions();
  const activeRegionHeight = height - DELAY_HEIGHT;
  const scale = max(
    TARGET_SCALE,
    sub(
      1,
      divide(
        min(abs(min(sub(y, -DELAY_HEIGHT), 0)), activeRegionHeight),
        activeRegionHeight,
      ),
    ),
  );
  const opacity = interpolate(scale, {
    inputRange: [TARGET_SCALE, 1],
    outputRange: [TARGET_OPACITY, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateX = interpolate(scale, {
    inputRange: [TARGET_SCALE, 1],
    outputRange: [TARGET_TRANSLATE_X, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.Image
      style={[styles.image, {transform: [{scale}, {translateX}], opacity}]}
      source={require('./assets/animals.png')}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 600,
    aspectRatio: 2.2,
  },
});
