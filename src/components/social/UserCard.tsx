import React, { useState } from 'react';
import { View, Image, Text, Button, Pressable } from 'react-native';
import UserCardStyles from '@nightlight/components/social/UserCard.styles';
import { SearchUserCardProps } from '@nightlight/src/types';
import EllipseSvg from '@nightlight/src/components/svgs/EllipseSvg';

const SearchUserCard = ({
  firstName,
  lastName,
  index,
  isAdded,
}: SearchUserCardProps) => {
  let isEvenIndex = index % 2 !== 0;
  const [added, setAdded] = useState(isAdded);
  const [addText, setAddText] = useState(added? "ADDED" : "ADD");

  const handlePress = () => {
    setAdded(!added);
    setAddText(added? "ADD" : "ADDED");
  }

  return (
    <View
      style={[
        UserCardStyles.container,
        isEvenIndex && UserCardStyles.containerAlt,
      ]}>
      <View style={UserCardStyles.leftSide}>
        <Image
          source={require('@nightlight/assets/images/anon.png')}
          style={UserCardStyles.profileImage}
        />
        <View>
          <Text style={UserCardStyles.name}>
            {firstName} {lastName}
          </Text>
        </View>
      </View>
      <View style={UserCardStyles.rowview}>
        <Pressable
          onPress={handlePress}
          style={[
            UserCardStyles.addButton,
            added && UserCardStyles.addedButton,
          ]}>
          <Text style={UserCardStyles.addButtonText}>{addText}</Text>
        </Pressable>
        {/* <EllipseSvg style={UserCardStyles.ellipse} /> */}
      </View>
    </View>
  );
};

export default SearchUserCard;
