import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import UserCardStyles from '@nightlight/components/social/SearchUserCard.styles';
import { SearchUserCardProps } from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import axios from 'axios';
import { SERVER_URL } from '@env';

const SearchUserCard = ({
  firstName,
  lastName,
  index,
  isAdded,
  image,
  friendId,
}: SearchUserCardProps) => {
  let isEvenIndex = index % 2 !== 0;
  const [added, setAdded] = useState(isAdded);
  const [addText, setAddText] = useState(added ? 'ADDED' : 'ADD');
  const { userDocument } = useAuthContext();

  const handlePress = () => {
    setAdded(prev => !prev);
    setAddText(added ? 'ADD' : 'ADDED');

    // send request to backend to add friend
    if (!added) {
      axios
        .patch(
          `${SERVER_URL}/users/${userDocument?._id}/requestFriend/?friendId=${friendId}`,
          {}
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log('Error: ', e.response.data.message);
        });
    } else {
      // send request to backend to remove friend
      axios
        .patch(
          `${SERVER_URL}/users/${userDocument?._id}/removeFriend/?friendId=${friendId}`,
          {}
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log('Error: ', e.response.data.message);
        });
    }
  };

  return (
    <View
      style={[
        UserCardStyles.container,
        isEvenIndex && UserCardStyles.containerAlt,
      ]}>
      <View style={UserCardStyles.leftSide}>
        <Image
          source={
            image === '@nightlight/assets/images/anon.png'
              ? require('@nightlight/assets/images/anon.png')
              : { uri: `${image}` }
          }
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
