import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PhotoSvg = (props: ISvgProps) => (
  <Svg
    width={20}
    height={20}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path
      d='M1 0a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1Zm1.5 3.5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v4.086c0 .89-1.077 1.337-1.707.707l-.086-.086a1 1 0 0 0-1.414 0l-1.086 1.086a1 1 0 0 0 0 1.414l4 4a1 1 0 0 1 .293.707V16.5a1 1 0 0 1-1 1h-1.086a1 1 0 0 1-.707-.293l-9-9a1 1 0 0 0-1.414 0l-.086.086c-.63.63-1.707.184-1.707-.707V3.5Z'
      fill='#fff'
      fillOpacity={0.5}
    />
  </Svg>
);

export default PhotoSvg;
