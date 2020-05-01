import {useWindowDimensions} from 'react-native';

export default () => {
  const {width, height} = useWindowDimensions();
  const interpolatedWidth = width - 125;
  const interpolatedHeight = height - 200;

  return {width: interpolatedWidth, height: interpolatedHeight};
};
