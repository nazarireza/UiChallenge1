import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated, {multiply, divide, sub} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';

const X_VELOCITY = -0.85;

export default ({x}) => {
  const {width} = usePagingDimensions();
  const opacity = sub(1, divide(x, width / 2));
  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [{translateX: multiply(x, X_VELOCITY)}], opacity},
      ]}>
      <Text style={styles.titleText}>Travel description</Text>
      <Text style={styles.descriptionText}>
        The leopard (Panthera pardus) is one of the five extant species in the
        genus Panthera, a member of the Felidae.
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 55,
    padding: 40,
  },
  titleText: {
    color: 'rgba(255,255,255,.4)',
    fontSize: 16,
  },
  descriptionText: {
    color: 'rgba(255,255,255,.2)',
    fontSize: 14,
    marginTop: 15,
  },
});
