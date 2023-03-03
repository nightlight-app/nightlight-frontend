import { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import { EmergencyContact, ProfileRoute } from '@nightlight/src/types';
import EmergencyContactsScreenStyles from '@nightlight/screens/profile/EmergencyContactsScreen.styles';
import ContactCard from '@nightlight/components/profile/ContactCard';

// TODO: hard coded contacts for now, change to pull from backend
const contacts = [
  {
    name: 'Mom',
    phone: '1231112343',
  },
  {
    name: 'Dad',
    phone: '1232323485',
  },
  {
    name: 'Roommate',
    phone: '9188460185',
  },
  {
    name: 'Zi',
    phone: '6159361214',
  },
];

// TODO:
const addContact = () => {
  Alert.alert('TODO: add contact');
};

const EmergencyContactsScreen = () => {
  // keep track of user's search input
  const [searchInput, setSearchInput] = useState<string>('');
  const [displayedContacts, setDisplayedContacts] =
    useState<EmergencyContact[]>(contacts);

  // TODO: improve search algorithm?
  useEffect(() => {
    if (!searchInput) setDisplayedContacts(contacts);
    else
      setDisplayedContacts(
        contacts.filter((contact: EmergencyContact) =>
          contact.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
  }, [searchInput]);

  const handleSearchChange = (text: string) => setSearchInput(text);

  // TODO: fix type?
  const renderContact = ({
    item,
    index,
  }: ListRenderItemInfo<EmergencyContact>) => {
    const isFirstItem = index === 0;
    const isLastItem = index === contacts.length - 1;

    return (
      <ContactCard
        name={item.name}
        phone={item.phone}
        isFirstItem={isFirstItem}
        isLastItem={isLastItem}
      />
    );
  };

  const renderContactSeparator = () => (
    <View style={EmergencyContactsScreenStyles.contactSeparator} />
  );

  const renderEmptyContacts = () => (
    <View style={EmergencyContactsScreenStyles.emptyContactsContainer}>
      <Text style={EmergencyContactsScreenStyles.emptyContactsText}>
        You haven't specified any emergency contacts yet!
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      testID={ProfileRoute.EMERGENCY_CONTACTS}
      style={EmergencyContactsScreenStyles.screenContainer}>
      <Text style={EmergencyContactsScreenStyles.title}>
        Emergency Contacts
      </Text>
      <Text style={EmergencyContactsScreenStyles.subtitle}>
        Your people, all in one place
      </Text>
      <TextInput
        value={searchInput}
        onChangeText={handleSearchChange}
        style={EmergencyContactsScreenStyles.searchBar}
        placeholder='Search contacts'
      />
      <FlatList
        style={EmergencyContactsScreenStyles.contactList}
        data={displayedContacts}
        renderItem={renderContact}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderContactSeparator}
        ListEmptyComponent={renderEmptyContacts}
        scrollEnabled={displayedContacts.length > 0}
        indicatorStyle='white'
      />
      <TouchableOpacity
        onPress={addContact}
        activeOpacity={0.75}
        style={EmergencyContactsScreenStyles.addButton}>
        <Text style={EmergencyContactsScreenStyles.addText}>
          Add New Contact
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmergencyContactsScreen;
