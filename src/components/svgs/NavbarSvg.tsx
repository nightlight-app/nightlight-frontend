import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ISvgProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import { NAVBAR_HEIGHT, NAVBAR_WIDTH } from '@nightlight/src/constants';

const NavbarSvg = (props: ISvgProps) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={NAVBAR_WIDTH}
    height={NAVBAR_HEIGHT}
    fill='none'
    {...props}
    style={{ ...styles.shadow, ...props.style }}>
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      stroke={COLORS.NIGHTLIGHT_BLACK}
      strokeWidth={2}
      d='M195 51c22.92 0 42.306-15.119 48.735-35.925C246.106 7.402 252.315 1 260 1h115c7.732 0 14 6.268 14 14v64H1V15C1 7.268 7.268 1 15 1h115c7.685 0 13.894 6.402 16.265 14.075C152.694 35.881 172.08 51 195 51Z'
    />
    <Path fill={COLORS.NIGHTLIGHT_GRAY} d='M2 78h386v2H2z' />
  </Svg>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.NIGHTLIGHT_BLACK,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default NavbarSvg;
