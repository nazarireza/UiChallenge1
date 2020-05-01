import {
  block,
  set,
  add,
  cond,
  eq,
  max,
  lessThan,
  clockRunning,
  Easing,
} from 'react-native-reanimated';
import {timing, useClock} from 'react-native-redash';
import usePagingDimensions from './usePagingDimensions';
import {State} from 'react-native-gesture-handler';
import {DELAY_HEIGHT, ACTIVE_AREA_DISTANCE} from './constants';

export default ({translationY, state, lastY}) => {
  const clock = useClock([]);
  const {height} = usePagingDimensions();
  const yMax = -height + ACTIVE_AREA_DISTANCE - DELAY_HEIGHT;
  const y = block([
    cond(
      eq(state, State.END),
      [
        set(lastY, [
          timing({
            clock,
            duration: 500,
            from: max(add(lastY, translationY), yMax),
            to: cond(lessThan(translationY, lastY), yMax, 0),
            easing: Easing.bezier(0.41, 0, 0.55, 1),
          }),
        ]),
        cond(eq(clockRunning(clock), 0), [
          set(state, State.UNDETERMINED),
          set(translationY, 0),
        ]),
        lastY,
      ],
      max(add(lastY, translationY), yMax),
    ),
  ]);
  return {y};
};
