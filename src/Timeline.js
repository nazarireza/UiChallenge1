import React from 'react';
import {StyleSheet} from 'react-native';
import {Svg} from 'react-native-svg';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';
import {
  DETAIL_MARGIN_BOTTOM,
  CANVAS_INITIAL_WIDTH,
  ADDITIONAL_CANVAS_SIZE,
  ACTIVE_AREA_DISTANCE,
} from './constants';
import TimelineMap from './TimelineMap';
import TimelineVertical from './TimelineVertical';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default ({x, y, state, visibleProgress}) => {
  const {width, height} = usePagingDimensions();
  const canvasHeight = height - ACTIVE_AREA_DISTANCE + ADDITIONAL_CANVAS_SIZE;
  const opacity = interpolate(x, {
    inputRange: [width * 0.5, width],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={[styles.container, {opacity}]} pointerEvents="none">
      <AnimatedSvg width={CANVAS_INITIAL_WIDTH} height={canvasHeight}>
        <TimelineMap {...{visibleProgress, canvasHeight}} />
        <TimelineVertical
          {...{
            opacity,
            y,
            state,
            visibleProgress,
            canvasHeight,
          }}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: DETAIL_MARGIN_BOTTOM + ADDITIONAL_CANVAS_SIZE,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
