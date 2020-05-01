import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

const X_TRANSITION = 20;
const BACK_BUTTON_WIDTH = 35;

export default ({onBackButtonPressed, visibleProgress}) => {
  const menuButtonOpacity = interpolate(visibleProgress, {
    inputRange: [0.5, 0.75],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const menuButtonTranslateX = mix(menuButtonOpacity, -X_TRANSITION, 0);
  const backButtonOpacity = interpolate(visibleProgress, {
    inputRange: [0.75, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const backButtonTranslateX = mix(backButtonOpacity, X_TRANSITION, 0);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logoTypeText}>SY</Text>
      <View style={styles.headerRightContainer}>
        <Animated.View
          style={[
            {
              opacity: menuButtonOpacity,
              transform: [{translateX: menuButtonTranslateX}],
            },
          ]}>
          <Icon name="grip-lines" color="rgba(255,255,255,.5)" size={15} />
        </Animated.View>
        <Animated.View
          style={[
            styles.backButtonContainer,
            {
              opacity: backButtonOpacity,
              transform: [{translateX: backButtonTranslateX}],
            },
          ]}>
          <TouchableOpacity activeOpacity={0.7} onPress={onBackButtonPressed}>
            <Text style={styles.backButtonText}>BACK</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoTypeText: {
    color: 'rgba(255,255,255,.5)',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    width: BACK_BUTTON_WIDTH,
    left: -BACK_BUTTON_WIDTH / 2,
  },
  backButtonText: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 12,
    width: 100,
    fontWeight: 'bold',
  },
  headerRightContainer: {},
});
