import { Text } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import BannerStyles from '@nightlight/src/components/Banner.styles';
import { BannerProps } from '@nightlight/src/types';

const Banner = ({ message, backgroundColor, textColor }: BannerProps) => {
  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={{ ...BannerStyles.banner, backgroundColor }}>
      <Text style={{ ...BannerStyles.bannerText, color: textColor }}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default Banner;
