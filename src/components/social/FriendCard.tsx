import React from 'react';
import { View, Image, Text } from 'react-native';
import FriendCardStyles from '@nightlight/components/social/FriendCard.styles';
import { FriendCardProps } from '@nightlight/src/types';
import PinSvg from '@nightlight/src/components/svgs/PinSvg';

const FriendCard = ({ name, index, isInGroup, imgUrl }: FriendCardProps) => {
  const isEvenIndex = index % 2 !== 0;

  const imgPath = imgUrl;

  return (
    <View
      style={[
        FriendCardStyles.container,
        isEvenIndex && FriendCardStyles.containerAlt,
      ]}>
      <View style={FriendCardStyles.leftSide}>
        <Image
          source={imgPath
          ? { uri: `${imgPath}` }
          : require('@nightlight/assets/images/anon.png')}
          style={FriendCardStyles.profileImage}
        />
        <View>
          <Text style={FriendCardStyles.name}>{name}</Text>
          {isInGroup && (
            <Text style={FriendCardStyles.activeText}>Active 10m ago</Text>
          )}
        </View>
      </View>
      <View style={FriendCardStyles.rowView}>
        {/* TODO: use expo icon instead of svg? */}
        {isInGroup && <PinSvg />}
      </View>
    </View>
  );
};

export default FriendCard;
