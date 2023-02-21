import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlSpace?: string;
}

const PencilSvg = (props: ISvgProps) => (
  <Svg
    width={20}
    height={20}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path
      d='M16.25 1.25a1.768 1.768 0 1 0-2.5 2.5l2.5 2.5a1.768 1.768 0 1 0 2.5-2.5l-2.5-2.5Zm-4.836 5.164a2 2 0 0 0-2.828 0l-8 8A2 2 0 0 0 0 15.828V18a2 2 0 0 0 2 2h2.172a2 2 0 0 0 1.414-.586l8-8a2 2 0 0 0 0-2.828l-2.172-2.172Z'
      fill='#fff'
      fillOpacity={0.5}
    />
  </Svg>
);

export default PencilSvg;
