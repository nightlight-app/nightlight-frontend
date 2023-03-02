import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { G, Circle, Defs, Path } from 'react-native-svg';

const NotificationSvg = (props: ISvgProps) => (
  <Svg
    width={50}
    height={50}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <G filter='url(#a)'>
      <Circle
        cx={25}
        cy={25}
        r={21}
        fill='#fff'
        fillOpacity={0.25}
        // shapeRendering="crispEdges"
      />
    </G>
    <Path
      d='M25.023 14.395c-3.861 0-7 3.138-7 7v3.372c0 .711-.303 1.796-.665 2.403l-1.341 2.228c-.829 1.377-.257 2.905 1.26 3.419a24.408 24.408 0 0 0 15.481 0c1.412-.467 2.03-2.135 1.26-3.419l-1.341-2.228c-.35-.607-.654-1.692-.654-2.403v-3.372c0-3.85-3.15-7-7-7Z'
      stroke='#fff'
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap='round'
    />
    <Path
      d='M27.182 14.733a7.88 7.88 0 0 0-4.317 0 2.316 2.316 0 0 1 2.158-1.47c.98 0 1.82.607 2.159 1.47Z'
      stroke='#fff'
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Path
      d='M28.523 33.237a3.51 3.51 0 0 1-3.5 3.5 3.512 3.512 0 0 1-2.473-1.027 3.511 3.511 0 0 1-1.027-2.473'
      stroke='#fff'
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
    <Defs></Defs>
  </Svg>
);

export default NotificationSvg;
