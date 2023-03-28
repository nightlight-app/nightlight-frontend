import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '@nightlight/src/global.styles';

const BackgroundStaticMapSvg = (props: ISvgProps) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={390}
    height={328}
    fill='none'
    {...props}>
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      d='m61.268 311.828 146.185-509.774 15.192 4.357L76.46 316.184z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      d='M384.062 258.282-57.475 131.665l4.357-15.193L388.419 243.09zM42.847 28.508l59.005-205.759 15.38 4.41L58.228 32.92z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      d='M508.029 230.223-108.274-28.024l6.109-14.577 616.302 258.247z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      d='m262.244 306.104 129.397-451.23 15.192 4.356-129.396 451.23zm-103.306 12.687 140.608-490.328 15.193 4.357-140.608 490.328z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      d='M254.972 11.26-25.86-69.273l4.41-15.38L259.383-4.12z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_BLUE}
      d='M229.655 107.065-18.73 2.985l1.932-4.612 248.385 104.08zm97.993 128.507-129.058-37.01 1.378-4.806 129.058 37.01z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_BLUE}
      d='m198.71 198.13 27.665-96.475 4.807 1.379-27.666 96.474z'
    />
    <Path
      fill={COLORS.NIGHTLIGHT_BLUE}
      d='M229.655 107.066-111.009-35.682l1.932-4.611 340.664 142.747zm102.732 112.196c-7.497-9.643-8.841-10.6-9.052-14.289a9.165 9.165 0 1 1 18.3-1.045c.211 3.689-1.015 4.793-7.367 15.227a1.147 1.147 0 0 1-1.881.107Zm.316-10.999a3.819 3.819 0 1 0-.435-7.625 3.819 3.819 0 0 0 .435 7.625Z'
    />
  </Svg>
);

export default BackgroundStaticMapSvg;
