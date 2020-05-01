import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PageIndicator from './PageIndicator';
import MapButton from './MapButton';

export default ({x, onMapButtonPressed, visibleProgress}) => (
  <View style={styles.footerContainer}>
    <View style={[styles.footerItemContainer, styles.start]}>
      <MapButton {...{x, onPress: onMapButtonPressed, visibleProgress}} />
    </View>
    <View style={[styles.footerItemContainer, styles.center]}>
      <PageIndicator {...{x, visibleProgress}} />
    </View>
    <View style={[styles.footerItemContainer, styles.end]}>
      <Icon name="share-alt" color="rgba(255,255,255,.5)" size={15} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  footerItemContainer: {
    flex: 1,
  },
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
});
