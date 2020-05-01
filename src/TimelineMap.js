import React, {useState} from 'react';
import {Path, Circle} from 'react-native-svg';
import {path} from 'd3-path';
import Animated, {useCode, call, cond, neq} from 'react-native-reanimated';
import {
  CANVAS_INITIAL_HEIGHT,
  CANVAS_INITIAL_WIDTH,
  CIRCLE_1_RADIUS,
  CIRCLE_2_RADIUS,
  CIRCLE_STROKE_WIDTH,
} from './constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRCLE_2_DELTA_Y = -5;
const CIRCLE_3_DELTA_Y = -38;

export default ({visibleProgress, canvasHeight}) => {
  const [progressX, setProgressX] = useState(0);
  useCode(() => call([visibleProgress], ([p]) => setProgressX(p)), []);
  const heightScaleDelta = canvasHeight - CANVAS_INITIAL_HEIGHT;
  const _x = (__x) => {
    const delta = CANVAS_INITIAL_WIDTH / 2 - __x;
    return (1 - progressX) * delta + __x;
  };
  const _y = (__y, delta = 50) => {
    return (1 - progressX) * delta + __y + heightScaleDelta;
  };
  const getPath = () => {
    if (progressX === 0) {
      return '';
    }
    let p = path();
    p.moveTo(_x(105), CIRCLE_1_RADIUS + 60);
    p.bezierCurveTo(
      _x(125),
      _y(50, CIRCLE_2_DELTA_Y),
      _x(110),
      _y(75, CIRCLE_2_DELTA_Y),
      _x(135),
      _y(105, CIRCLE_2_DELTA_Y),
    );
    p.quadraticCurveTo(
      _x(200),
      _y(195, CIRCLE_3_DELTA_Y),
      _x(135),
      _y(260, CIRCLE_3_DELTA_Y),
    );
    p.bezierCurveTo(_x(85), _y(255), _x(125), _y(315), _x(90), _y(315));
    p.quadraticCurveTo(_x(35), _y(310), _x(25), _y(355));
    p.lineTo(_x(15), canvasHeight - CIRCLE_1_RADIUS * 2);
    return p.toString();
  };
  const shapeOpacity = cond(neq(visibleProgress, 0), 1, 0);

  return (
    <>
      <Path d={getPath()} stroke="white" strokeWidth={2} />
      <AnimatedCircle
        cx={_x(105)}
        cy={CIRCLE_1_RADIUS + 55}
        r={CIRCLE_1_RADIUS}
        fill="white"
        fillOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(135)}
        cy={_y(105, CIRCLE_2_DELTA_Y)}
        r={CIRCLE_2_RADIUS}
        stroke="white"
        strokeWidth={CIRCLE_STROKE_WIDTH + 1}
        strokeOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(135)}
        cy={_y(260, CIRCLE_3_DELTA_Y)}
        r={CIRCLE_2_RADIUS}
        stroke="white"
        strokeWidth={CIRCLE_STROKE_WIDTH + 1}
        strokeOpacity={shapeOpacity}
      />
      <AnimatedCircle
        cx={_x(15)}
        cy={canvasHeight - (CIRCLE_1_RADIUS + CIRCLE_STROKE_WIDTH)}
        r={CIRCLE_1_RADIUS}
        stroke="white"
        strokeWidth={CIRCLE_STROKE_WIDTH}
        strokeOpacity={shapeOpacity}
      />
    </>
  );
};
