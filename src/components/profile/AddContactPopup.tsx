import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import AddContactPopupStyles from './AddContactPopup.styles';
import { customFetch } from '@nightlight/src/api';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { Feather } from '@expo/vector-icons';

const AddContactPopup = () => {
  const { userDocument } = useAuthContext();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleNumberChange = (text: string) => {
    setNumber(text);
  };

  const handleExit = () => {

  }

  const handlePress = () => {
    const emergencyContact = {
      name: name,
      phone: number,
    };
    customFetch({
      resourceUrl: `/users/${userDocument?._id}/add-emergency-contact/`,
      options: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emergencyContact),
        method: 'PATCH',
      },
    }).catch(e => {
      console.error('[Emergency Contacts]', JSON.stringify(e));
    });
  };

  return (
    <View style={AddContactPopupStyles.popupBox}>
      <View style={AddContactPopupStyles.titleRow}>
        <Text style={AddContactPopupStyles.contactTitle}>New Contact</Text>
        <Pressable onPress={handleExit}>
        <Feather style={AddContactPopupStyles.feather} name='x' size={24} color='white' />
        </Pressable>
      </View>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        style={AddContactPopupStyles.searchBar}
        placeholder='Name'
        keyboardAppearance='dark'
      />
      <TextInput
        value={number}
        onChangeText={handleNumberChange}
        style={AddContactPopupStyles.searchBar}
        placeholder='Phone Number'
        keyboardAppearance='dark'
      />
      <Pressable onPress={handlePress} style={AddContactPopupStyles.addButton}>
        <Text style={AddContactPopupStyles.addText}>+ Add</Text>
      </Pressable>
    </View>
  );
};

export default AddContactPopup;
