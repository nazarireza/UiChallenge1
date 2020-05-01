import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  useValues,
  onScrollEvent,
  onGestureEvent,
  useTimingTransition,
} from 'react-native-redash';
import TextWatermark from './TextWatermark';
import ShapeWatermark from './ShapeWatermark';
import TravelDescription from './TravelDescription';
import TravelDetail from './TravelDetail';
import Header from './Header';
import Footer from './Footer';
import ContentImage from './ContentImage';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import useVerticalPanGesture from './useVerticalPanGesture';
import MapImage from './MapImage';
import Timeline from './Timeline';

export default () => {
  const [x, translationY, lastY, state] = useValues(
    [0, 0, State.UNDETERMINED, 0],
    [],
  );
  const [mapIsVisible, setMapIsVisible] = useState(false);
  const {y} = useVerticalPanGesture({translationY, lastY, state});
  const visibleProgress = useTimingTransition(mapIsVisible, {duration: 600});
  return (
    <>
      <StatusBar barStyle="light-content" hidden />
      <PanGestureHandler
        {...onGestureEvent({
          translationY,
          state,
        })}>
        <Animated.View style={styles.container}>
          <Animated.ScrollView
            onScroll={onScrollEvent({x})}
            scrollEventThrottle={1}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            bounces={false}
            contentContainerStyle={styles.imageContainer}>
            <TextWatermark {...{x}} />
            <ShapeWatermark {...{x, y, state}} />
            <ContentImage {...{y, state}} />
          </Animated.ScrollView>
          <TravelDescription {...{x}} />
          <TravelDetail {...{x, y}} />
          <MapImage {...{visibleProgress}} />
          <Timeline {...{x, y, state, visibleProgress}} />
          <Header
            {...{visibleProgress}}
            onBackButtonPressed={() => setMapIsVisible(false)}
          />
          <Footer
            {...{x, visibleProgress}}
            onMapButtonPressed={() => setMapIsVisible(true)}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292826',
  },
  image: {
    width: 600,
    aspectRatio: 2.2,
  },
  imageContainer: {
    paddingEnd: 100,
    alignItems: 'center',
  },
});
