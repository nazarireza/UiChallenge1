import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  sub,
  multiply,
  eq,
  cond,
} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export default ({x, onPress, visibleProgress}) => {
  const {width} = usePagingDimensions();
  const opacity1 = interpolate(x, {
    inputRange: [width * 0.5, width],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity2 = sub(1, multiply(visibleProgress, 2));
  const opacity = cond(eq(visibleProgress, 0), opacity1, opacity2);
  return (
    <Animated.View style={{opacity}}>
      <AnimatedTouchableOpacity
        {...{onPress}}
        style={styles.mapButtonContainer}
        activeOpacity={0.7}>
        <Text style={styles.mapButtonText}>ON MAP</Text>
      </AnimatedTouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mapButtonContainer: {
    paddingVertical: 10,
  },
  mapButtonText: {
    fontSize: 12,
    color: 'rgba(255,255,255,.4)',
  },
});
