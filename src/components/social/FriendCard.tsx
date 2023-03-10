import React from 'react';
import { View, Image, Text } from 'react-native';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import { FriendCardProps } from '@nightlight/src/types';
import EllipseSvg from '@nightlight/src/components/svgs/EllipseSvg';
import PinSvg from '@nightlight/src/components/svgs/PinSvg';

const FriendCard = ({ name, index, isInGroup }: FriendCardProps) => {
  let isEvenIndex = index % 2 !== 0;

  return (
    <View
      style={[
        FriendCardStyles.container,
        isEvenIndex && FriendCardStyles.containerAlt,
      ]}>
      <View style={FriendCardStyles.leftSide}>
        <Image
          source={require('@nightlight/assets/images/anon.png')}
          style={FriendCardStyles.profileImage}
        />
        <View>
          <Text style={FriendCardStyles.name}>{name}</Text>
          {isInGroup && (
            <Text style={FriendCardStyles.activeText}>Active 10m ago</Text>
          )}
        </View>
      </View>
      <View style={FriendCardStyles.rowview}>
        {isInGroup && <PinSvg />}
        <EllipseSvg style={FriendCardStyles.ellipse} />
      </View>
    </View>
  );
};

export default FriendCard;
