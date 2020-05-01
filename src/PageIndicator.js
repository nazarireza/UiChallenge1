import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  divide,
  interpolate,
  Extrapolate,
  multiply,
  sub,
} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';

export default ({x, visibleProgress}) => {
  const {width} = usePagingDimensions();
  const normalizeX = divide(x, width);
  const getIndicatorOpacity = (index) =>
    interpolate(normalizeX, {
      inputRange: [index - 0.5, index, index + 0.5],
      outputRange: [0.5, 1, 0.5],
      extrapolate: Extrapolate.CLAMP,
    });
  const opacity = sub(1, multiply(visibleProgress, 2));
  return (
    <Animated.View style={[styles.indicatorContainer, {opacity}]}>
      <Animated.View
        style={[styles.indicatorItem, {opacity: getIndicatorOpacity(0)}]}
      />
      <Animated.View
        style={[styles.indicatorItem, {opacity: getIndicatorOpacity(1)}]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
  },
  indicatorItem: {
    width: 5,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 2,
  },
});
