import { Route } from '@nightlight/src/types';
import { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Pressable } from 'react-native';
import EmergencyContactScreenStyles from '@nightlight/screens/emergency-contacts/EmergencyContactScreen.styles';
import ContactCard from '@nightlight/components/emergency-contacts/ContactCard';
import { ScrollView } from 'react-native-gesture-handler';

// TODO: hard coded contacts for now, change to pull from backend
const contacts = [
  {
    name: 'Mom',
    phone: '(123)-111-2343',
  },
  {
    name: 'Dad',
    phone: '(123)-232-3485',
  },
  {
    name: 'Roommate',
    phone: '(918)-846-0185',
  },
  {
    name: 'Zi',
    phone: '(615)-936-1214',
  },
];

const addContact = () => {
  console.log('need add contact page here');
};

const EmergencyContactScreen = () => {
  // keep track of user's search input
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <SafeAreaView
      testID={Route.EMERGENCY}
      style={EmergencyContactScreenStyles.safeview}>
      <Text style={EmergencyContactScreenStyles.title}>Emergency Contacts</Text>
      <Text style={EmergencyContactScreenStyles.subtitle}>
        Your people, all in one place
      </Text>
      <View style={EmergencyContactScreenStyles.search}>
        <TextInput
          value={searchInput}
          onChangeText={(text: string) => setSearchInput(text)}
          style={EmergencyContactScreenStyles.searchText}
          placeholder='Search contacts'></TextInput>
      </View>
      <View style={EmergencyContactScreenStyles.contactList}>
        <ScrollView
          contentContainerStyle={EmergencyContactScreenStyles.scrollView}>
          {contacts
            .filter((item: { name: string; phone: string }, index) => {
              if (searchInput === '') return item;
              else if (
                item.name.toLowerCase().includes(searchInput.toLowerCase())
              )
                return item;
            })
            .map((item: { name: string; phone: string }, index) => (
              <ContactCard
                key={index}
                index={index}
                name={item.name}
                phone={item.phone}
              />
            ))}
          {contacts
            .filter((item: { name: string; phone: string }, index) => {
              if (searchInput === '') return item;
              else if (
                item.name.toLowerCase().includes(searchInput.toLowerCase())
              )
                return item;
            })
            .map((item: { name: string; phone: string }, index) => (
              <ContactCard
                key={index}
                index={index}
                name={item.name}
                phone={item.phone}
              />
            ))}
          {contacts
            .filter((item: { name: string; phone: string }, index) => {
              if (searchInput === '') return item;
              else if (
                item.name.toLowerCase().includes(searchInput.toLowerCase())
              )
                return item;
            })
            .map((item: { name: string; phone: string }, index) => (
              <ContactCard
                key={index}
                index={index}
                name={item.name}
                phone={item.phone}
              />
            ))}
        </ScrollView>
      </View>
      <Pressable
        onPress={addContact}
        style={EmergencyContactScreenStyles.addButton}>
        <Text style={EmergencyContactScreenStyles.addText}>
          Add New Contact
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default EmergencyContactScreen;
