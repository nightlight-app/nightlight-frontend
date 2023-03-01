import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PhoneSvg = (props: ISvgProps) => (
  <Svg
    width={26}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.978 0C.412 0 0 .412 0 .978v39.273c0 .566.412.978.978.978h23.82c.567 0 .978-.412.978-.978V.978c0-.566-.412-.978-.977-.978H.977Zm4.167 5.147H20.58v25.736H5.145V5.147Zm7.717 28.31a2.548 2.548 0 0 1 2.573 2.573 2.548 2.548 0 0 1-2.573 2.574 2.548 2.548 0 0 1-2.572-2.574 2.548 2.548 0 0 1 2.572-2.573Z"
      fill="#4A86E8"
    />
  </Svg>
)

export default PhoneSvg;
