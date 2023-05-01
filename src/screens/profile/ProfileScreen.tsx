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
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
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
  const [newProfilePictureUri, setNewProfilePictureUri] = useState<string>();
  const [newCoverPictureUri, setNewCoverPictureUri] = useState<string>();

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
      setNewProfilePictureUri(user.imgUrlProfileLarge);
      setNewCoverPictureUri(user.imgUrlCover);
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
    // TODO: upload new profile/cover pictures?
    alert('TODO: save edits');
  };

  const handleChangeProfilePicture = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setNewProfilePictureUri(result.assets[0].uri);
      }
    } catch (error: any) {
      console.error(error);
      // TODO: setErrorBannerMessage(UNEXPECTED_ERROR_MESSAGE);
    }
  };

  const handleChangeCoverPicture = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 1], // TODO: confirm aspect ratio
        quality: 1,
      });

      if (!result.canceled) {
        setNewCoverPictureUri(result.assets[0].uri);
      }
    } catch (error: any) {
      console.error(error);
      // TODO: setErrorBannerMessage(UNEXPECTED_ERROR_MESSAGE);
    }
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
          <View style={ProfileScreenStyles.profilePicContainer}>
            {user?.imgUrlProfileLarge ? (
              <Image
                source={{
                  uri: isEditing
                    ? newProfilePictureUri
                    : user.imgUrlProfileLarge,
                }}
                style={ProfileScreenStyles.profilePic}
              />
            ) : (
              <View style={ProfileScreenStyles.profilePic}>
                <Text style={ProfileScreenStyles.initials}>
                  {user && user.firstName[0] + user.lastName[0]}
                </Text>
              </View>
            )}
            {isEditing && (
              <TouchableOpacity
                onPress={handleChangeProfilePicture}
                activeOpacity={0.75}
                style={ProfileScreenStyles.changeProfilePictureButton}>
                <FontAwesome name='pencil' size={24} color={COLORS.GRAY} />
              </TouchableOpacity>
            )}
          </View>

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
                autoCapitalize='words'
                autoComplete='name-given'
                autoCorrect={false}
                returnKeyType='done'
                clearButtonMode='while-editing'
                keyboardAppearance='dark'
              />
              <TextInput
                value={newLastName}
                onChangeText={setNewLastName}
                style={ProfileScreenStyles.textInput}
                placeholder='Last Name'
                autoCapitalize='words'
                autoComplete='name-family'
                autoCorrect={false}
                returnKeyType='done'
                clearButtonMode='while-editing'
                keyboardAppearance='dark'
              />
              <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                style={ProfileScreenStyles.textInput}
                placeholder='Email'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='done'
                clearButtonMode='while-editing'
                keyboardAppearance='dark'
              />
              <TextInput
                value={formattedNewPhone || newPhone}
                onChangeText={handlePhoneChange}
                style={ProfileScreenStyles.textInput}
                placeholder='Phone'
                autoCapitalize='none'
                autoComplete='tel'
                autoCorrect={false}
                keyboardType='phone-pad'
                returnKeyType='done'
                maxLength={14}
                clearButtonMode='while-editing'
                keyboardAppearance='dark'
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
                timeZoneOffsetInMinutes={0}
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
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                returnKeyType='done'
                clearButtonMode='while-editing'
                keyboardAppearance='dark'
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
