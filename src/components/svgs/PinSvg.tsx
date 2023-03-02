import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PinSvg = (props: ISvgProps) => (
  <Svg
    width={21}
    height={28}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path
      d='M9.42 27.435C1.476 15.915 0 14.734 0 10.5 0 4.701 4.701 0 10.5 0S21 4.701 21 10.5c0 4.233-1.475 5.416-9.42 16.935a1.313 1.313 0 0 1-2.16 0Zm1.08-12.56a4.375 4.375 0 1 0 0-8.75 4.375 4.375 0 0 0 0 8.75Z'
      fill='#4A86E8'
    />
  </Svg>
);

export default PinSvg;
