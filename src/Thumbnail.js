import React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Animated from 'react-native-reanimated';

export const LeopardThumbnail = ({style, opacity = 0.5}) => {
  return (
    <Animated.View style={[styles.thumbnail1Container, {opacity}, style]}>
      <Image
        source={require('./assets/leopards.png')}
        style={styles.thumbnailImage1}
        resizeMode="contain"
      />
      <Text style={styles.subTitleText}>Leopards -</Text>
    </Animated.View>
  );
};

export const VultureThumbnail = ({style, opacity = 0.5}) => {
  return (
    <Animated.View style={[styles.thumbnail2Container, {opacity}, style]}>
      <Image
        source={require('./assets/vultures.png')}
        style={styles.thumbnailImage2}
        resizeMode="contain"
      />
      <Text style={styles.subTitleText}>- Vultures</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  thumbnail1Container: {
    position: 'absolute',
    left: 50,
    alignItems: 'center',
  },
  thumbnail2Container: {
    position: 'absolute',
    right: 50,
    alignItems: 'center',
    opacity: 0.5,
  },
  thumbnailImage1: {
    height: 15,
    aspectRatio: 1.8,
  },
  thumbnailImage2: {
    height: 20,
    aspectRatio: 0.8,
  },
  subTitleText: {
    fontSize: 12,
    color: 'rgba(255,255,255,.4)',
  },
});
