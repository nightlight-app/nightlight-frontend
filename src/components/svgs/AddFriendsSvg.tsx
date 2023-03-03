import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Circle, Defs, G, Path } from 'react-native-svg';

const AddFriendsSvg = (props: ISvgProps) => (
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
      d='M33 34.201h-4.8m2.4 2.423v-4.846M25.19 37c-2.184 0-4.355-.557-6.011-1.672-2.904-1.963-2.904-5.16 0-7.111 3.3-2.23 8.71-2.23 12.01 0m-5.795-4.47a2.163 2.163 0 0 0-.396 0 5.28 5.28 0 0 1-3.638-1.637 5.383 5.383 0 0 1-1.485-3.73 5.41 5.41 0 0 1 .4-2.059 5.369 5.369 0 0 1 1.151-1.746c.494-.5 1.08-.896 1.727-1.166A5.27 5.27 0 0 1 25.189 13c2.94 0 5.327 2.41 5.327 5.38 0 2.907-2.28 5.27-5.123 5.366Z'
      stroke='#fff'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs />
  </Svg>
);

export default AddFriendsSvg;
