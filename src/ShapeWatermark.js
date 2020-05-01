import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  divide,
  cond,
  sub,
  abs,
  min,
  eq,
} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';
import {DELAY_HEIGHT} from './constants';
import useTransitionAxis from './useTransitionAxis';

export default ({x, y, state}) => {
  const {width} = usePagingDimensions();
  const transitionAxis = useTransitionAxis({y, state});
  const scale = cond(
    eq(transitionAxis, 1),
    divide(x, width),
    sub(1, divide(min(abs(min(y, 0)), DELAY_HEIGHT), DELAY_HEIGHT)),
  );
  return (
    <Animated.View
      style={[
        styles.watermarkCircle,
        {
          transform: [{translateY: -100}, {scale}],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  watermarkCircle: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 200 / 2,
    position: 'absolute',
    right: 80,
  },
});
