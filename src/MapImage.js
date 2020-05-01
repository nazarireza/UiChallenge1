import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Animated, {
  concat,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';
import {LeopardThumbnail, VultureThumbnail} from './Thumbnail';
import {
  LEOPARDS_POINT_DISTANCE_FROM_CENTER,
  VULTURES_POINT_DISTANCE_FROM_CENTER,
} from './constants';

export default ({visibleProgress}) => {
  const rotate = concat(mix(visibleProgress, 10, 0), 'deg');
  const scale = mix(visibleProgress, 1.5, 1);
  const contentOpacity = interpolate(visibleProgress, {
    inputRange: [0.4, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={[styles.container, {opacity: visibleProgress}]}
      pointerEvents="none">
      <Animated.View style={[{transform: [{rotate}, {scale}]}]}>
        <Image source={require('./assets/map.png')} style={styles.image} />
      </Animated.View>
      <Animated.View
        style={[styles.contentContainer, {opacity: contentOpacity}]}>
        <Text style={[styles.titleText, styles.subTitleText]}>Base camp</Text>
        <LeopardThumbnail style={styles.thumbnail1Container} opacity={1} />
        <VultureThumbnail style={styles.thumbnail2Container} opacity={1} />
        <Text style={[styles.footerText, styles.subTitleText]}>Start camp</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#292826',
  },
  image: {
    opacity: 0.6,
  },
  thumbnail1Container: {
    left: 150,
    transform: [{translateY: LEOPARDS_POINT_DISTANCE_FROM_CENTER - 20}],
  },
  thumbnail2Container: {
    right: 80,
    transform: [{translateY: VULTURES_POINT_DISTANCE_FROM_CENTER + 10}],
  },
  subTitleText: {
    fontSize: 12,
    color: 'rgba(255,255,255,.8)',
  },
  titleText: {
    position: 'absolute',
    top: 145,
    right: 120,
  },
  footerText: {
    position: 'absolute',
    bottom: 120,
    right: 200,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
