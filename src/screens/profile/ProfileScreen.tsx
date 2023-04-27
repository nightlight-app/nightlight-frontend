import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  MaterialCommunityIcons,
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
} from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';
import { formatPhoneNumber, getNumFriends } from '@nightlight/src/utils/utils';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { TEST_USERS } from '@nightlight/src/testData';
import Button from '@nightlight/components/Button';

const ProfileScreen = ({ navigation }: BottomTabScreenProps) => {
  const { userDocument } = useAuthContext();

  // TODO: change TEST_USER[0] to a fallback user with defualt data
  const user: User = userDocument
    ? {
        ...userDocument,
        // parse the birthday into Date object
        birthday: new Date(userDocument.birthday),
      }
    : TEST_USERS[0];

  // compute user initials
  const userInitials = user.firstName[0] + user.lastName[0];

  // TODO:
  const handleChangeCoverPicture = () => {
    Alert.alert('TODO: change cover picture');
  };

  // TODO:
  const handleSettingsPress = () => {
    navigation.navigate(ProfileRoute.SETTINGS);
  };

  // TODO:
  const handleEditProfile = () => {
    Alert.alert('TODO: make fields editable edit profile');
  };

  const handleNavigateToEmergencyContacts = () => {
    navigation.navigate(ProfileRoute.EMERGENCY_CONTACTS);
  };

  return (
    <ScrollView
      testID={TabRoute.PROFILE_STACK}
      style={ProfileScreenStyles.scrollView}>
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
          {user.imgUrlProfileSmall ? (
            <Image
              source={{ uri: user.imgUrlProfileSmall }}
              style={ProfileScreenStyles.profilePic}
            />
          ) : (
            <View style={ProfileScreenStyles.profilePic}>
              <Text style={ProfileScreenStyles.initials}>{userInitials}</Text>
            </View>
          )}

          {/* Edit Button */}
          <TouchableOpacity
            onPress={handleEditProfile}
            activeOpacity={0.75}
            style={ProfileScreenStyles.editProfileButton}>
            <Text style={ProfileScreenStyles.editProfileText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={ProfileScreenStyles.userInfoContainer}>
          <Text style={ProfileScreenStyles.userName}>
            {user.firstName} {user.lastName}
          </Text>
          <View style={ProfileScreenStyles.userDetailContainer}>
            <MaterialCommunityIcons
              name='email'
              size={20}
              color={COLORS.GRAY}
              style={ProfileScreenStyles.userDetailIcon}
            />
            <Text style={ProfileScreenStyles.userDetailText}>{user.email}</Text>
          </View>
          <View style={ProfileScreenStyles.userDetailContainer}>
            <FontAwesome
              name='phone'
              size={20}
              color={COLORS.GRAY}
              style={ProfileScreenStyles.userDetailIcon}
            />
            <Text style={ProfileScreenStyles.userDetailText}>
              {formatPhoneNumber(user.phone)}
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
              {user.birthday.toLocaleString('en-US', {
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
              {getNumFriends(user)}
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

        {/* Favorite Bar */}
        <View style={ProfileScreenStyles.favoriteBarContainer}>
          <PartySvg />
          <View style={ProfileScreenStyles.favoriteBarTextContainer}>
            {/* TODO: need field on user doc */}
            <Text style={ProfileScreenStyles.favoriteBarText}>TODO:</Text>
            <Text style={ProfileScreenStyles.favoriteBarDescription}>
              seems to be your favorite bar these days
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

// {/* Cover Picture */}
// <View style={ProfileScreenStyles.coverPicContainer}>
// <Image
//   style={ProfileScreenStyles.coverPic}
//   // TODO: make this dynamic
//   source={require('@nightlight/assets/images/cover-photo.png')}
// />
//   {/* Change Cover Picture */}
//   <TouchableOpacity
//     onPress={handleChangeCoverPicture}
//     activeOpacity={0.5}
//     style={ProfileScreenStyles.changeCoverButton}>
//     <FontAwesome name='picture-o' size={25} color={COLORS.WHITE} />
//   </TouchableOpacity>
// </View>

// {/* Settings Button */}
// <SafeAreaView style={ProfileScreenStyles.settingsButtonContainer}>
//   <TouchableOpacity
//     onPress={handleSettingsPress}
//     activeOpacity={0.5}
//     style={ProfileScreenStyles.settingsButton}>
//     <Ionicons name='settings' size={25} color={COLORS.WHITE} />
//   </TouchableOpacity>
// </SafeAreaView>

// {/* Profile Picture */}
// {/* TODO: add press action?? (expand or edit?) */}
// {user.imgUrlProfileSmall ? (
//   <Image
//     source={{ uri: user.imgUrlProfileSmall }}
//     style={ProfileScreenStyles.profilePic}
//   />
// ) : (
//   <View style={ProfileScreenStyles.profilePic}>
//     <Text style={ProfileScreenStyles.initials}>{userInitials}</Text>
//   </View>
// )}

// {/* Profile Details */}
// <View style={ProfileScreenStyles.profileDetailsContainer}>
//   {/* Edit Profile Button */}
//   <TouchableOpacity
//     onPress={handleEditProfile}
//     activeOpacity={0.5}
//     style={ProfileScreenStyles.editProfileButton}>
//     <FontAwesome name='pencil' size={25} color={COLORS.WHITE} />
//   </TouchableOpacity>

//   {/* User Info */}
//   <Text style={ProfileScreenStyles.name}>
//     {user.firstName} {user.lastName}
//   </Text>
//   <Text style={ProfileScreenStyles.phoneNumber}>
//     {formatPhoneNumber(user.phone)}
//   </Text>

//   {/* Profile Statistics */}
//   <View style={ProfileScreenStyles.profileStatsContainer}>
//     <View style={ProfileScreenStyles.profileStatContainer}>
//       <Text style={ProfileScreenStyles.profileStat}>
//         {getNumFriends(userDocument)}
//       </Text>
//       <Text style={ProfileScreenStyles.profileStatDesc}>friends</Text>
//     </View>
//     <View style={ProfileScreenStyles.profileStatDivider} />
//     <View style={ProfileScreenStyles.profileStatContainer}>
//       <Text style={ProfileScreenStyles.profileStat}>
//         {/* TODO: need field on user object */}
//         {2}
//       </Text>
//       <Text style={ProfileScreenStyles.profileStatDesc}>nights out</Text>
//     </View>
//     <View style={ProfileScreenStyles.profileStatDivider} />
//     <View style={ProfileScreenStyles.profileStatContainer}>
//       <Text style={ProfileScreenStyles.profileStat}>
//         {user.birthday.toLocaleDateString('en-US', { timeZone: 'UTC' })}
//       </Text>
//       <Text style={ProfileScreenStyles.profileStatDesc}>
//         your special day
//       </Text>
//     </View>
//   </View>

//   {/* Emergency Contacts Button */}
//   <Button
//     onPress={handleNavigateToEmergencyContacts}
//     text='See Emergency Contacts'
//     style={ProfileScreenStyles.emergencyContactsButton}
//   />
// </View>
