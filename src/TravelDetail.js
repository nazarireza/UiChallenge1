import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Animated, {
  sub,
  interpolate,
  Extrapolate,
  min,
  concat,
} from 'react-native-reanimated';
import usePagingDimensions from './usePagingDimensions';
import {mix} from 'react-native-redash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  DELAY_HEIGHT,
  ACTIVE_AREA_DISTANCE,
  DETAIL_MARGIN_BOTTOM,
  LEOPARDS_POINT_DISTANCE_FROM_CENTER,
  VULTURES_POINT_DISTANCE_FROM_CENTER,
} from './constants';
import {VultureThumbnail, LeopardThumbnail} from './Thumbnail';

const HORIZONTAL_TRANSITION = 30;

export default ({x, y}) => {
  const {width, height} = usePagingDimensions();
  const opacity = interpolate(x, {
    inputRange: [width * 0.5, width],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateX = interpolate(x, {
    inputRange: [width * 0.5, width],
    outputRange: [width * 0.5, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const getDetailContainerTranslateX = (direction) =>
    mix(
      opacity,
      direction === 'LEFT' ? -HORIZONTAL_TRANSITION : HORIZONTAL_TRANSITION,
      0,
    );
  const translateYMax = -height + ACTIVE_AREA_DISTANCE;
  const translateY = min(0, sub(y, -DELAY_HEIGHT));
  const rotate = concat(
    interpolate(translateY, {
      inputRange: [translateYMax, 0],
      outputRange: [180, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
    'deg',
  );
  const thumbnailOpacity = interpolate(translateY, {
    inputRange: [translateYMax, -DELAY_HEIGHT],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const getThumbnailContainerTranslateX = (direction) =>
    mix(
      thumbnailOpacity,
      direction === 'LEFT' ? -HORIZONTAL_TRANSITION : HORIZONTAL_TRANSITION,
      0,
    );

  return (
    <View style={[styles.container]} pointerEvents="none">
      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [{translateX}, {translateY}],
            opacity,
          },
        ]}>
        <Text style={styles.titleText}>Travel details</Text>
        <Animated.View style={{transform: [{rotate}]}}>
          <Icon name="chevron-up" color="rgba(255,255,255,.5)" size={15} />
        </Animated.View>
      </Animated.View>
      <View style={[styles.detailContainer]}>
        <Animated.View
          style={[
            styles.leftDetailContainer,
            {
              opacity,
              transform: [{translateX: getDetailContainerTranslateX('LEFT')}],
            },
          ]}>
          <Text style={styles.subTitleText}>Start camp</Text>
          <Text style={styles.subTitleTimeText}>02:40 PM</Text>
        </Animated.View>
        <Animated.Text style={[styles.distanceText, {opacity}]}>
          72 km.
        </Animated.Text>
        <Animated.View
          style={{
            opacity,
            transform: [
              {translateX: getDetailContainerTranslateX('RIGHT')},
              {translateY},
            ],
          }}>
          <Text style={styles.subTitleText}>Base camp</Text>
          <Text style={styles.subTitleTimeText}>07:30 AM</Text>
        </Animated.View>
      </View>
      <Animated.View
        style={[styles.thumbnailsContainer, {opacity: thumbnailOpacity}]}>
        <LeopardThumbnail
          style={{
            transform: [
              {translateY: LEOPARDS_POINT_DISTANCE_FROM_CENTER - 30},
              {translateX: getThumbnailContainerTranslateX('LEFT')},
            ],
          }}
        />
        <VultureThumbnail
          style={{
            transform: [
              {translateY: VULTURES_POINT_DISTANCE_FROM_CENTER - 30},
              {translateX: getThumbnailContainerTranslateX('RIGHT')},
            ],
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 40,
    justifyContent: 'flex-end',
  },
  titleText: {
    color: 'rgba(255,255,255,.4)',
    fontSize: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: DETAIL_MARGIN_BOTTOM,
    marginTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  subTitleText: {
    fontSize: 12,
    color: 'rgba(255,255,255,.4)',
  },
  subTitleTimeText: {
    fontSize: 10,
    color: 'rgba(255,255,255,.2)',
    marginTop: 10,
  },
  leftDetailContainer: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 12,
    color: 'rgba(255,255,255,.7)',
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnailsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
