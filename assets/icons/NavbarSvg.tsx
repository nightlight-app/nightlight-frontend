import React from "react";
import { StyleSheet } from "react-native";
import Svg, { type SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

interface ISvgProps extends SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
}

const NavbarSvg = (props: ISvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={390}
        height={80}
        fill="none"
        style={styles.shadow}
        {...props}
    >
        <Path
            fill="#212121"
            stroke="#141414"
            strokeWidth={2}
            d="M195 51c22.92 0 42.306-15.119 48.735-35.925C246.106 7.402 252.315 1 260 1h115c7.732 0 14 6.268 14 14v64H1V15C1 7.268 7.268 1 15 1h115c7.685 0 13.894 6.402 16.265 14.075C152.694 35.881 172.08 51 195 51Z"
        />
        <Path fill="#212121" d="M2 78h386v2H2z" />
    </Svg>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default NavbarSvg;
