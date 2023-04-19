import { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import { EmergencyContact, ProfileRoute } from '@nightlight/src/types';
import EmergencyContactsScreenStyles from '@nightlight/screens/profile/EmergencyContactsScreen.styles';
import ContactCard from '@nightlight/components/profile/ContactCard';
import Button from '@nightlight/components/Button';
import { customFetch } from '@nightlight/src/api';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import AddContactPopup from '@nightlight/components/profile/AddContactPopup';


const EmergencyContactsScreen = () => {

const addContact = () => {
  setRenderPopup(!renderPopup)
};


const [renderPopup, setRenderPopup]=useState(false)
const { userDocument } = useAuthContext();
const [contacts, setContacts] = useState([])
// get contacts from backend
useEffect(()=> {
  customFetch({
    resourceUrl: `/users/${userDocument?._id}/emergency-contacts/`,
    options: {
      method: 'GET',
    },
  })
    .then(response => {
      setContacts(response.emergencyContacts)
    })
    .catch(e => {
      console.error('[Emergency Contacts]', JSON.stringify(e));
    });
}, []);
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
        keyboardAppearance='dark'
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
      <Button
        onPress={()=>setRenderPopup(true)}
        text='Add New Contact'
        style={EmergencyContactsScreenStyles.addButton}
      />
      {renderPopup && <AddContactPopup closePopup={()=>setRenderPopup(false)}>/</AddContactPopup>}
    </SafeAreaView>
  );
};

export default EmergencyContactsScreen;
