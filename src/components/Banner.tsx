import { Text } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import BannerStyles from '@nightlight/src/components/Banner.styles';
import { BannerProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const Banner = ({
  message,
  backgroundColor = COLORS.RED,
  textColor = COLORS.WHITE,
}: BannerProps) => {
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
