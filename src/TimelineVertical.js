import React from 'react';
import {Circle, Rect} from 'react-native-svg';
import Animated, {
  cond,
  divide,
  abs,
  min,
  eq,
  sub,
  add,
  max,
  neq,
} from 'react-native-reanimated';
import {
  DELAY_HEIGHT,
  CANVAS_INITIAL_WIDTH,
  CIRCLE_1_RADIUS,
  CIRCLE_2_RADIUS,
  CIRCLE_STROKE_WIDTH,
  LEOPARDS_POINT_DISTANCE_FROM_CENTER,
  VULTURES_POINT_DISTANCE_FROM_CENTER,
} from './constants';
import {mix} from 'react-native-redash';
import useTransitionAxis from './useTransitionAxis';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const CIRCLE_SIZE = 5 * 2;

export default ({opacity, y, state, visibleProgress, canvasHeight}) => {
  const transitionAxis = useTransitionAxis({y, state});
  const yPositions = [
    canvasHeight,
    canvasHeight / 2 + LEOPARDS_POINT_DISTANCE_FROM_CENTER,
    canvasHeight / 2 + VULTURES_POINT_DISTANCE_FROM_CENTER,
    (CIRCLE_1_RADIUS + CIRCLE_STROKE_WIDTH) * 2,
  ];
  const _x = (index, radius) => {
    const target =
      CANVAS_INITIAL_WIDTH / 2 -
      (CIRCLE_SIZE * 4) / 2 +
      radius +
      CIRCLE_STROKE_WIDTH +
      index * CIRCLE_SIZE +
      (CIRCLE_SIZE / 2 - radius);
    const start = CANVAS_INITIAL_WIDTH / 2;
    return cond(
      eq(transitionAxis, 1),
      mix(opacity, start, target),
      mix(
        divide(min(abs(min(y, 0)), DELAY_HEIGHT), DELAY_HEIGHT),
        target,
        start,
      ),
    );
  };
  const _y = (index) => {
    const traget = yPositions[index] - CIRCLE_1_RADIUS - CIRCLE_STROKE_WIDTH;
    const translateY = min(0, sub(y, -DELAY_HEIGHT));
    const lineTarget = max(
      traget,
      add(translateY, canvasHeight - CIRCLE_1_RADIUS - CIRCLE_STROKE_WIDTH),
    );
    return lineTarget;
  };
  const rectY = add(_y(3), CIRCLE_1_RADIUS);
  const rectHeight = max(0, sub(sub(canvasHeight, rectY), 8));
  const shapeOpacity = cond(neq(visibleProgress, 0), 0, 1);

  return (
    <>
      <AnimatedRect
        x={CANVAS_INITIAL_WIDTH / 2 - 1}
        y={rectY}
        width={2}
        height={rectHeight}
        fill="white"
        fillOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(0, CIRCLE_1_RADIUS)}
        cy={_y(0)}
        r={CIRCLE_1_RADIUS}
        stroke="white"
        strokeWidth={CIRCLE_STROKE_WIDTH}
        strokeOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(1, CIRCLE_2_RADIUS)}
        cy={_y(1)}
        r={CIRCLE_2_RADIUS}
        stroke="white"
        strokeWidth={CIRCLE_STROKE_WIDTH + 1}
        strokeOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(2, CIRCLE_2_RADIUS)}
        cy={_y(2)}
        r={CIRCLE_2_RADIUS}
        stroke="white"
        strokeWidth={CIRCLE_STROKE_WIDTH + 1}
        strokeOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(3, CIRCLE_1_RADIUS)}
        cy={_y(3)}
        r={CIRCLE_1_RADIUS}
        fill="white"
        fillOpacity={shapeOpacity}
      />
    </>
  );
};
