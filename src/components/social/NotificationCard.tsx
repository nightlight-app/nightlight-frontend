import React from 'react';
import { View, Image, Text } from 'react-native';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import { FriendCardProps, NotificationCardProps } from '@nightlight/src/types';
import EllipseSvg from '@nightlight/src/components/svgs/EllipseSvg';
import PinSvg from '@nightlight/src/components/svgs/PinSvg';
import NotificationCardStyles from './NotificationCard.styles';
import FriendCard from './FriendCard';

const NotificationCard = ({ index, message }: NotificationCardProps) => {
  let isEvenIndex = index % 2 !== 0;

  return (
    <View
      style={[
        NotificationCardStyles.container,
        isEvenIndex && NotificationCardStyles.containerAlt,
      ]}>
      <View style={NotificationCardStyles.leftSide}>
      <Image
          source={require('@nightlight/assets/images/anon.png')}
          style={NotificationCardStyles.profileImage}
        />
        <View style = {NotificationCardStyles.textbox}>
          <Text style={NotificationCardStyles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;