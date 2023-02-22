import { ISvgProps } from '@nightlight/src/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BottleSvg = (props: ISvgProps) => (
  <Svg
    fill={'white'}
    height={70}
    width={50}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 550.752 550.752'
    xmlSpace='preserve'
    {...props}>
    <Path d='M329.193 199.787c-2.557-3.028-3.908-6.476-3.908-9.968 0-.17-.006-.339-.017-.508L316.986 67.34c4.355-3.444 7.163-8.761 7.163-14.731v-4.608c0-1.575-.196-3.144-.584-4.662a18.996 18.996 0 0 0-.432-1.434 25.417 25.417 0 0 0 6.03-16.44C329.163 11.424 317.739 0 303.698 0a25.309 25.309 0 0 0-14.075 4.241C285.505 1.497 280.642 0 275.548 0s-9.957 1.497-14.075 4.241A25.306 25.306 0 0 0 247.398 0c-14.041 0-25.464 11.424-25.464 25.465a25.35 25.35 0 0 0 5.791 16.149c-.086.237-.173.475-.249.715a18.776 18.776 0 0 0-.874 5.672v4.608c0 5.971 2.809 11.288 7.164 14.731l-8.282 121.971a7.812 7.812 0 0 0-.017.508c0 3.492-1.352 6.939-3.909 9.968-16.631 19.704-33.413 61.702-33.413 111.114 0 30.6 1.302 199.137 1.315 200.777 0 23.006 13.755 39.073 33.451 39.073H327.84c19.696 0 33.451-16.067 33.451-39.016.013-1.698 1.315-170.235 1.315-200.835 0-46.958-16.809-91.441-33.413-111.113zM247.398 15c3.204 0 6.192 1.451 8.198 3.981a7.497 7.497 0 0 0 11.754 0c2.006-2.53 4.994-3.981 8.198-3.981s6.191 1.451 8.198 3.981a7.497 7.497 0 0 0 11.754 0c2.006-2.53 4.995-3.981 8.198-3.981 5.77 0 10.464 4.694 10.464 10.465a10.43 10.43 0 0 1-1.435 5.258 18.762 18.762 0 0 0-7.365-1.508h-42.63a7.497 7.497 0 0 0-7.136 2.733c-2.005 2.53-4.994 3.981-8.198 3.981-5.77 0-10.464-4.694-10.464-10.465S241.628 15 247.398 15zm98.894 496.679c0 11.982-5.705 24.073-18.451 24.073H222.912c-13.619 0-18.451-12.968-18.451-24.131-.013-1.698-1.315-170.178-1.315-200.72 0-45.377 15.487-84.392 29.875-101.438a33.616 33.616 0 0 0 3.239-4.547h47.703c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-43.486l8.048-118.52h26.85c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-29.987a3.791 3.791 0 0 1-3.787-3.787v-2.353c1.863.436 3.802.673 5.796.673a25.28 25.28 0 0 0 17.208-6.715h40.756A3.78 3.78 0 0 1 309.147 48v4.608a3.79 3.79 0 0 1-3.786 3.787h-1.633a7.5 7.5 0 0 0-1.514 14.847l8.058 118.672h-1.148c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h5.366a33.528 33.528 0 0 0 3.239 4.547c14.847 17.588 29.876 58.08 29.876 101.438.001 30.544-1.3 199.024-1.313 200.78zm-70.916-246.215c-19.22 0-37.064 11.031-50.245 31.062-12.543 19.062-19.452 44.262-19.452 70.957s6.908 51.895 19.452 70.957c13.181 20.029 31.024 31.061 50.245 31.061s37.064-11.031 50.245-31.061c12.543-19.063 19.452-44.262 19.452-70.957s-6.908-51.896-19.452-70.957c-13.181-20.031-31.025-31.062-50.245-31.062zm54.696 102.018c0 23.798-6.031 46.069-16.982 62.711-10.314 15.675-23.708 24.307-37.714 24.307s-27.4-8.632-37.714-24.307c-10.951-16.642-16.982-38.913-16.982-62.711s6.031-46.07 16.982-62.712c10.314-15.675 23.708-24.307 37.714-24.307s27.4 8.632 37.714 24.307c10.951 16.642 16.982 38.915 16.982 62.712z' />
  </Svg>
);

export default BottleSvg;
