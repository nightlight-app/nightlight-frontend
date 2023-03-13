import { SERVER_URL } from '@env';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import GroupMembersStyles from './GroupMembers.styles';

const GroupMembers = () => {
  const { userDocument } = useAuthContext();
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    if (userDocument?.currentGroup) {
      fetch(`${SERVER_URL}groups?groupId=${userDocument.currentGroup}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
        });
    }
  }, [userDocument?.currentGroup]);

  return (
    <SafeAreaView style={{ position: 'absolute' }}>
      {/*  */}
      <View style={GroupMembersStyles.container}>
        <Text>Group Members</Text>
      </View>
    </SafeAreaView>
  );
};

export default GroupMembers;
