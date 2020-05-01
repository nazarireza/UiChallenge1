import {cond, and, neq, lessThan, abs} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {DELAY_HEIGHT, X_AXIS, Y_AXIS} from './constants';

export default ({y, state}) => {
  return cond(
    and(
      neq(state, State.ACTIVE),
      neq(state, State.END),
      lessThan(abs(y), DELAY_HEIGHT),
    ),
    X_AXIS,
    Y_AXIS,
  );
};
