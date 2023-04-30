import { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ListRenderItemInfo,
  FlatList,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  Ionicons,
} from '@expo/vector-icons';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import PartySvg from '@nightlight/components/svgs/PartySvg';
import {
  ProfileRoute,
  BottomTabScreenProps,
  TabRoute,
  User,
  ProfileMenuButtonProps,
} from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import { formatPhoneNumber, getNumFriends } from '@nightlight/src/utils/utils';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import ProfileMenuButton from '@nightlight/components/profile/ProfileMenuButton';

const ProfileScreen = ({ navigation }: BottomTabScreenProps) => {
  const { userDocument } = useAuthContext();

  const [user, setUser] = useState<User | null | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newFirstName, setNewFirstName] = useState<string>();
  const [newLastName, setNewLastName] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>();
  const [newPhone, setNewPhone] = useState<string>();
  const [formattedNewPhone, setFormattedNewPhone] = useState<string | null>();
  const [newBirthday, setNewBirthday] = useState<Date>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [newFavoriteVenue, setNewFavoriteVenue] = useState<string>();

  useEffect(() => {
    if (userDocument) {
      setUser({
        ...userDocument,
        // parse the birthday into Date object
        birthday: new Date(userDocument.birthday),
      });
    }
  }, [userDocument]);

  useEffect(() => {
    // if no longer editing, reset the new values to the user's current values
    if (!isEditing && user) {
      setNewFirstName(user.firstName);
      setNewLastName(user.lastName);
      setNewEmail(user.email);
      setNewPhone(user.phone);
      setFormattedNewPhone(formatPhoneNumber(user.phone));
      setNewBirthday(user.birthday);
      // setNewFavoriteVenue(user.favoriteVenue); // TODO: uncomment when favoriteVenue is added to User
    }
  }, [isEditing, user]);

  // Determine formatted phone number as user types
  useEffect(() => {
    if (newPhone) setFormattedNewPhone(formatPhoneNumber(newPhone));
  }, [newPhone]);

  // array of buttons to render in the profile menu
  const profileMenuButtons: ProfileMenuButtonProps[] = [
    {
      icon: <Entypo name='lock' size={24} color={COLORS.WHITE} />,
      text: 'Reset Password',
      onPress: () => alert('TODO: reset password'),
    },
    {
      icon: <Ionicons name='settings' size={24} color={COLORS.WHITE} />,
      text: 'Settings',
      onPress: () => navigation.navigate(ProfileRoute.SETTINGS),
    },
    {
      icon: <AntDesign name='questioncircle' size={24} color={COLORS.WHITE} />,
      text: 'Support',
      onPress: () => alert('TODO: support'),
    },
  ];

  const toggleEditMode = () => {
    setIsEditing(prev => !prev);
  };

  const handleSaveEdits = () => {
    // TODO: add validation
    // TODO: add country code to phone number
    // TODO: parse birthday into Date object
    alert('TODO: save edits');
  };

  const handleChangeCoverPicture = () => {
    alert('TODO: change cover picture');
  };

  const handleNavigateToEmergencyContacts = () => {
    navigation.navigate(ProfileRoute.EMERGENCY_CONTACTS);
  };

  const handlePhoneChange = (text: string) => {
    // only allow numbers
    setNewPhone(text.replace(/\D/g, ''));
  };

  const renderProfileMenuButton = ({
    item,
    index,
  }: ListRenderItemInfo<ProfileMenuButtonProps>) => {
    const isFirstItem: boolean = index === 0;
    const isLastItem: boolean = index === profileMenuButtons.length - 1;

    return (
      <ProfileMenuButton
        {...item}
        isFirstItem={isFirstItem}
        isLastItem={isLastItem}
      />
    );
  };

  const renderItemSeparator = () => (
    <View style={ProfileScreenStyles.itemSeparator} />
  );

  return (
    <ScrollView
      testID={TabRoute.PROFILE_STACK}
      style={ProfileScreenStyles.scrollView}
      contentContainerStyle={ProfileScreenStyles.scrollViewContent}>
      {/* Cover Pic */}
      <View style={ProfileScreenStyles.coverPicContainer}>
        <Image
          style={ProfileScreenStyles.coverPic}
          // TODO: make this dynamic
          source={require('@nightlight/assets/images/cover-photo.png')}
        />
      </View>

      <View style={ProfileScreenStyles.contentContainer}>
        <View style={ProfileScreenStyles.contentHeader}>
          {/* Profile Pic */}
          {user?.imgUrlProfileSmall ? (
            <Image
              source={{ uri: user.imgUrlProfileSmall }}
              style={ProfileScreenStyles.profilePic}
            />
          ) : (
            <View style={ProfileScreenStyles.profilePic}>
              <Text style={ProfileScreenStyles.initials}>
                {user && user.firstName[0] + user.lastName[0]}
              </Text>
            </View>
          )}

          {/* Edit Button */}
          <View style={ProfileScreenStyles.editButtonsContainer}>
            {isEditing && (
              <TouchableOpacity
                onPress={handleSaveEdits}
                activeOpacity={0.75}
                style={[
                  ProfileScreenStyles.editProfileButton,
                  ProfileScreenStyles.saveEditsButton,
                ]}>
                <Text style={ProfileScreenStyles.editProfileText}>Save</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={toggleEditMode}
              activeOpacity={0.75}
              style={ProfileScreenStyles.editProfileButton}>
              <Text style={ProfileScreenStyles.editProfileText}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info */}
        <View style={ProfileScreenStyles.userInfoContainer}>
          {isEditing ? (
            <>
              <TextInput
                value={newFirstName}
                onChangeText={setNewFirstName}
                style={ProfileScreenStyles.textInput}
                placeholder='First Name'
              />
              <TextInput
                value={newLastName}
                onChangeText={setNewLastName}
                style={ProfileScreenStyles.textInput}
                placeholder='Last Name'
              />
              <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                style={ProfileScreenStyles.textInput}
                placeholder='Email'
              />
              <TextInput
                value={formattedNewPhone || newPhone}
                onChangeText={handlePhoneChange}
                style={ProfileScreenStyles.textInput}
                placeholder='Phone'
              />
              <TouchableOpacity
                onPress={() => setIsDatePickerOpen(true)}
                style={ProfileScreenStyles.textInput}
                activeOpacity={0.75}>
                <Text style={ProfileScreenStyles.datePickerButtonText}>
                  {newBirthday?.toLocaleString('en-US', {
                    timeZone: 'UTC',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={isDatePickerOpen}
                date={newBirthday || new Date()}
                onConfirm={(date: Date) => {
                  setIsDatePickerOpen(false);
                  setNewBirthday(date);
                }}
                onCancel={() => {
                  setIsDatePickerOpen(false);
                }}
                mode='date'
                theme='dark'
              />
            </>
          ) : (
            <>
              <Text style={ProfileScreenStyles.userName}>
                {user && user.firstName + ' ' + user.lastName}
              </Text>
              <View style={ProfileScreenStyles.userDetailContainer}>
                <MaterialCommunityIcons
                  name='email'
                  size={20}
                  color={COLORS.GRAY}
                  style={ProfileScreenStyles.userDetailIcon}
                />
                <Text style={ProfileScreenStyles.userDetailText}>
                  {user && user.email}
                </Text>
              </View>
              <View style={ProfileScreenStyles.userDetailContainer}>
                <FontAwesome
                  name='phone'
                  size={20}
                  color={COLORS.GRAY}
                  style={ProfileScreenStyles.userDetailIcon}
                />
                <Text style={ProfileScreenStyles.userDetailText}>
                  {user && formatPhoneNumber(user.phone)}
                </Text>
              </View>
              <View style={ProfileScreenStyles.userDetailContainer}>
                <MaterialCommunityIcons
                  name='cake-variant'
                  size={20}
                  color={COLORS.GRAY}
                  style={ProfileScreenStyles.userDetailIcon}
                />
                <Text style={ProfileScreenStyles.userDetailText}>
                  {user &&
                    user.birthday.toLocaleString('en-US', {
                      timeZone: 'UTC',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Stats */}
        <View style={ProfileScreenStyles.statsContainer}>
          <View style={ProfileScreenStyles.statContainer}>
            <Text style={ProfileScreenStyles.statNumber}>
              {user && getNumFriends(user)}
            </Text>
            <Text style={ProfileScreenStyles.statText}>friends</Text>
          </View>
          <View style={ProfileScreenStyles.statDelimiter} />
          <View style={ProfileScreenStyles.statContainer}>
            <Text style={ProfileScreenStyles.statNumber}>TODO:</Text>
            <Text style={ProfileScreenStyles.statText}>groups made</Text>
          </View>
          <View style={ProfileScreenStyles.statDelimiter} />
          <View style={ProfileScreenStyles.statContainer}>
            <Text style={ProfileScreenStyles.statNumber}>TODO:</Text>
            <Text style={ProfileScreenStyles.statText}>minutes safe</Text>
          </View>
        </View>

        {/* Favorite Venue */}
        <View style={ProfileScreenStyles.favoriteVenueContainer}>
          <PartySvg />
          <View style={ProfileScreenStyles.favoriteVenueTextContainer}>
            {/* TODO: need field on user doc */}
            {isEditing ? (
              <TextInput
                value={newFavoriteVenue}
                onChangeText={setNewFavoriteVenue}
                style={ProfileScreenStyles.textInput}
                placeholder='Favorite Venue'
              />
            ) : (
              <Text style={ProfileScreenStyles.favoriteVenueText}>TODO:</Text>
            )}
            <Text style={ProfileScreenStyles.favoriteVenueDescription}>
              seems to be your favorite venue these days
            </Text>
          </View>
        </View>

        {/* Emergency Contacts Link */}
        <View style={ProfileScreenStyles.emergencyContactsButtonContainer}>
          <ProfileMenuButton
            icon={
              <MaterialIcons
                name='medical-services'
                size={24}
                color={COLORS.WHITE}
              />
            }
            text='Emergency Contacts'
            onPress={handleNavigateToEmergencyContacts}
            isFirstItem
            isLastItem
          />
        </View>

        {/* Profile Menu */}
        <FlatList
          style={ProfileScreenStyles.profileMenuContainer}
          data={profileMenuButtons}
          renderItem={renderProfileMenuButton}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={renderItemSeparator}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
