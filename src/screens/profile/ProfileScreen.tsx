import { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
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
import { TEST_USERS } from '@nightlight/src/testData';
import ProfileMenuButton from '@nightlight/components/profile/ProfileMenuButton';

const ProfileScreen = ({ navigation }: BottomTabScreenProps) => {
  const { userDocument } = useAuthContext();

  const [user, setUser] = useState<User | null | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newFirstName, setNewFirstName] = useState<string>();
  const [newLastName, setNewLastName] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>();
  const [newPhone, setNewPhone] = useState<string>();
  const [newBirthday, setNewBirthday] = useState<Date>();
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
    alert('TODO: save edits');
  };

  const handleChangeCoverPicture = () => {
    alert('TODO: change cover picture');
  };

  const handleNavigateToEmergencyContacts = () => {
    navigation.navigate(ProfileRoute.EMERGENCY_CONTACTS);
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
            <Text style={ProfileScreenStyles.favoriteVenueText}>TODO:</Text>
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
