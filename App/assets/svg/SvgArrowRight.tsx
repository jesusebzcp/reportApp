import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const SvgRight = (props: SvgProps) => (
  <Svg width={17} height={15} fill="none" {...props}>
    <Path
      d="M0 7.726a.75.75 0 0 1 .648-.743l.102-.007h13.184L9.171 2.233a.75.75 0 0 1 .974-1.136l.084.073 6.05 6.024c.039.038.073.08.101.124l.024.04a.46.46 0 0 1 .044.093.544.544 0 0 1 .032.1.508.508 0 0 1 .016.1.604.604 0 0 1 .004.075v.029l-.003.044.003-.073a.753.753 0 0 1-.148.447l-.006.008a.75.75 0 0 1-.066.075l-6.05 6.026a.75.75 0 0 1-1.132-.98l.073-.083 4.761-4.743H.75a.75.75 0 0 1-.75-.75Z"
      fill="#14181D"
    />
  </Svg>
);
