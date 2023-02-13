import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Mask, Path } from 'react-native-svg';
import { MapCardBottomSvgProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

// TODO: Fix Figma to have width of 370px and export again

const MapCardBottomSvg = ({
  borderColor = COLORS.NIGHTLIGHT_BLACK,
  ...props
}: MapCardBottomSvgProps) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={369}
    height={40}
    fill='none'
    {...{ ...props, borderColor: undefined }}
    style={{ ...styles.shadow, ...props.style }}>
    <Mask id='b' fill={COLORS.WHITE}>
      <Path
        fillRule='evenodd'
        d='M370-95c0-8.284-6.716-15-15-15H15c-8.284 0-15 6.716-15 15V25c0 8.284 6.716 15 15 15h108.696c6.902 0 12.708-4.848 15.884-10.976C147.901 12.97 164.669 2 184 2c19.331 0 36.099 10.97 44.42 27.024C231.596 35.152 237.402 40 244.304 40H354c8.284 0 15-6.716 15-15V-95Z'
        clipRule='evenodd'
      />
    </Mask>
    <Path
      fill={COLORS.NIGHTLIGHT_GRAY}
      fillRule='evenodd'
      d='M369-95c0-8.284-6.716-15-15-15H15c-8.284 0-15 6.716-15 15V25c0 8.284 6.716 15 15 15h108.696c6.902 0 12.708-4.848 15.884-10.976C147.901 12.97 164.669 2 184 2c19.331 0 36.099 10.97 44.42 27.024C231.596 35.152 237.402 40 244.304 40H354c8.284 0 15-6.716 15-15V-95Z'
      clipRule='evenodd'
    />
    <Path
      fill={borderColor}
      d='m228.42 29.024-1.776.92 1.776-.92ZM15-108h339v-4H15v4ZM2 25V-95h-4V25h4Zm121.696 13H15v4h108.696v-4Zm17.66-8.056C149.346 14.527 165.445 4 184 4V0c-20.107 0-37.545 11.412-46.196 28.104l3.552 1.84ZM184 4c18.555 0 34.654 10.527 42.644 25.944l3.552-1.84C221.545 11.412 204.107 0 184 0v4Zm170 34H244.304v4H354v-4Zm13-133V25h4V-95h-4ZM354 42c9.389 0 17-7.611 17-17h-4c0 7.18-5.82 13-13 13v4Zm-230.304 0c7.893 0 14.268-5.513 17.66-12.056l-3.552-1.84C134.843 33.817 129.607 38 123.696 38v4ZM-2 25c0 9.389 7.611 17 17 17v-4C7.82 38 2 32.18 2 25h-4Zm356-133c7.18 0 13 5.82 13 13h4c0-9.389-7.611-17-17-17v4ZM226.644 29.944C230.036 36.487 236.411 42 244.304 42v-4c-5.911 0-11.147-4.183-14.108-9.896l-3.552 1.84ZM15-112c-9.389 0-17 7.611-17 17h4c0-7.18 5.82-13 13-13v-4Z'
      mask='url(#b)'
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
