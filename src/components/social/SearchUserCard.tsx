import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import UserCardStyles from '@nightlight/components/social/SearchUserCard.styles';
import { SearchUserCardProps } from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';

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
      customFetch({
        resourceUrl: `/users/${userDocument?._id}/request-friend/?friendId=${friendId}`,
        options: {
          method: 'PATCH',
        },
      })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.error('Error: ', e.response.message);
        });
    } else {
      // send request to backend to remove friend
      customFetch({
        resourceUrl: `/users/${userDocument?._id}/remove-friend/?friendId=${friendId}`,
        options: {
          method: 'PATCH',
        },
      })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.error('Error: ', e.response.message);
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
