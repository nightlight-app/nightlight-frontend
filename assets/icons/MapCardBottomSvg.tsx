import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MapCardBottomSvgProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const MapCardBottomSvg = ({
  borderColor = COLORS.NIGHTLIGHT_BLACK,
  ...props
}: MapCardBottomSvgProps) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={370}
    height={37}
    fill='none'
    {...{ ...props, borderColor: undefined }}
    style={{ ...styles.shadow, ...props.style }}>
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      stroke={borderColor}
      strokeWidth={2}
      d='M1 22V-1h368v23c0 7.732-6.268 14-14 14H243.722c-6.083 0-11.404-4.087-14.579-9.558C220.318 11.232 203.855 1 185 1s-35.318 10.232-44.143 25.442C137.682 31.913 132.361 36 126.278 36H15C7.268 36 1 29.732 1 22Z'
    />
  </Svg>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default MapCardBottomSvg;
