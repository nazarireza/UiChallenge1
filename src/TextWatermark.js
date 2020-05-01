import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {multiply} from 'react-native-reanimated';

const X_VELOCITY = 0.5;

export default ({x}) => {
  return (
    <Animated.Text
      style={[
        styles.watermarkText,
        {
          transform: [
            {rotate: '90deg'},
            {translateX: -45},
            {translateY: multiply(x, X_VELOCITY)},
          ],
        },
      ]}>
      72
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  watermarkText: {
    position: 'absolute',
    fontSize: 300,
    fontWeight: 'bold',
    color: 'white',
    left: -30,
  },
});
