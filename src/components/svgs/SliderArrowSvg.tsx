import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ISvgProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const SliderArrowSvg = (props: ISvgProps) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={53}
    height={31}
    fill='none'
    {...props}>
    <G filter='url(#a)'>
      <Path
        fill={COLORS.NIGHTLIGHT_GRAY}
        d='M22.936 1.621a5 5 0 0 1 7.128 0l20.54 20.872c3.11 3.161.871 8.507-3.564 8.507H5.96c-4.435 0-6.675-5.346-3.564-8.507L22.936 1.62Z'
      />
    </G>
  </Svg>
);

export default SliderArrowSvg;
