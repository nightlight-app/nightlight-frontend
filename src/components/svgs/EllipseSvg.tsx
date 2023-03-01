import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Ellipse } from 'react-native-svg';

const EllipseSvg = (props: ISvgProps) => (
  <Svg
    width={6}
    height={23}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Ellipse
      cx={2.611}
      cy={19.609}
      rx={2.65}
      ry={2.611}
      transform='rotate(-90 2.611 19.609)'
      fill='#fff'
    />
    <Ellipse
      cx={2.611}
      cy={11.129}
      rx={2.65}
      ry={2.611}
      transform='rotate(-90 2.611 11.13)'
      fill='#fff'
    />
    <Ellipse
      cx={2.611}
      cy={2.65}
      rx={2.65}
      ry={2.611}
      transform='rotate(-90 2.611 2.65)'
      fill='#fff'
    />
  </Svg>
);

export default EllipseSvg;
