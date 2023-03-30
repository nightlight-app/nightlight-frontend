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
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import PartySvg from '@nightlight/components/svgs/PartySvg';
import BottleSvg from '@nightlight/components/svgs/BottleSvg';
import {
  ProfileRoute,
  BottomTabScreenProps,
  TabRoute,
  User,
} from '@nightlight/src/types';
import { NUM_MONTHS } from '@nightlight/src/constants';
import { COLORS } from '@nightlight/src/global.styles';
import {
  formatPhoneNumber,
  getMonthText,
  getNumFriends,
  handleSignOut,
} from '@nightlight/src/utils/utils';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { TEST_USERS } from '@nightlight/src/testData';
import { Path } from 'react-native-svg';

const ProfileScreen = ({ navigation }: BottomTabScreenProps) => {
  const { userDocument } = useAuthContext();
  
  // TODO: change TEST_USER[0] to a fallback user with defualt data
  const user: User = userDocument
    ? {
        ...userDocument,
        // parse the birthday into Date object
        birthday: new Date(userDocument.birthday),
      }
    : 
    TEST_USERS[0];

  // TODO:
  const handleChangeCoverPicture = () => {
    Alert.alert('TODO: change cover picture');
  };

  // TODO:
  const handleSettingsPress = () => {
    Alert.alert('TODO: navigate to settings');
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
      contentContainerStyle={ProfileScreenStyles.scrollViewContainer}>
      {/* Cover Picture */}
      <View style={ProfileScreenStyles.coverPicContainer}>
        <Image
          style={ProfileScreenStyles.coverPic}
          // TODO: make this dynamic
          source={require('@nightlight/assets/images/cover-photo.png')}
        />
        {/* Change Cover Picture */}
        <TouchableOpacity
          onPress={handleChangeCoverPicture}
          activeOpacity={0.5}
          style={ProfileScreenStyles.changeCoverButton}>
          <FontAwesome name='picture-o' size={25} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>

      {/* Settings Button */}
      <SafeAreaView style={ProfileScreenStyles.settingsButtonContainer}>
        <TouchableOpacity
          onPress={handleSettingsPress}
          activeOpacity={0.5}
          style={ProfileScreenStyles.settingsButton}>
          <Ionicons name='settings' size={25} color={COLORS.WHITE} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Profile Picture */}
      {/* TODO: add press action?? (expand or edit?) */}
      <Image
        source={{ uri: user.imgUrlProfileSmall }}
        style={ProfileScreenStyles.profilePic}
      />

      {/* Profile Details */}
      <View style={ProfileScreenStyles.profileDetailsContainer}>
        {/* Edit Profile Button */}
        <TouchableOpacity
          onPress={handleEditProfile}
          activeOpacity={0.5}
          style={ProfileScreenStyles.editProfileButton}>
          <FontAwesome name='pencil' size={25} color={COLORS.WHITE} />
        </TouchableOpacity>

        {/* User Info */}
        <Text style={ProfileScreenStyles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={ProfileScreenStyles.phoneNumber}>
          {formatPhoneNumber(user.phone)}
        </Text>

        {/* TODO: move logout button? */}
        <TouchableOpacity
          onPress={handleSignOut}
          style={ProfileScreenStyles.logOutButton}
          activeOpacity={0.75}>
          <Text style={ProfileScreenStyles.logOutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* Profile Statistics */}
        <View style={ProfileScreenStyles.profileStatsContainer}>
          <View style={ProfileScreenStyles.profileStatContainer}>
            <Text style={ProfileScreenStyles.profileStat}>
              {getNumFriends(userDocument)}
            </Text>
            <Text style={ProfileScreenStyles.profileStatDesc}>friends</Text>
          </View>
          <View style={ProfileScreenStyles.profileStatDivider} />
          <View style={ProfileScreenStyles.profileStatContainer}>
            <Text style={ProfileScreenStyles.profileStat}>
              {/* TODO: need field on user object */}
              {2}
            </Text>
            <Text style={ProfileScreenStyles.profileStatDesc}>nights out</Text>
          </View>
          <View style={ProfileScreenStyles.profileStatDivider} />
          <View style={ProfileScreenStyles.profileStatContainer}>
            <Text style={ProfileScreenStyles.profileStat}>
              {user.birthday.toLocaleDateString('en-US', { timeZone: 'UTC' })}
            </Text>
            <Text style={ProfileScreenStyles.profileStatDesc}>
              your special day
            </Text>
          </View>
        </View>

        {/* Favorite Bar */}
        <View style={ProfileScreenStyles.favoriteBarContainer}>
          <PartySvg />
          <View style={ProfileScreenStyles.favoriteBarTextContainer}>
            {/* TODO: need field on user doc */}
            <Text style={ProfileScreenStyles.favoriteBarText}>Underground</Text>
            <Text style={ProfileScreenStyles.favoriteBarDesc}>
              seems to be your favorite bar these days
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={ProfileScreenStyles.calendarContainer}>
          {[...Array(NUM_MONTHS)].map((_, index) => (
            <View key={index} style={ProfileScreenStyles.monthView}>
              <BottleSvg>
               {/* <Path d={BottleSvg} fill="#c4c4c4" /> */}
               <Path d={`M20,180 L80,180 L80,${180 - 0.5 * 140} L20,${180 - 0.5 * 140}Z`} fill="#0080ff" />
               </BottleSvg>
              <Text style={ProfileScreenStyles.monthText}>
                {getMonthText(index)}
              </Text>
            </View>
          ))}
        </View>

        {/* Emergency Contacts Button */}
        <TouchableOpacity
          onPress={handleNavigateToEmergencyContacts}
          activeOpacity={0.75}
          style={ProfileScreenStyles.emergencyContactsButton}>
          <Text style={ProfileScreenStyles.emergencyContactsButtonText}>
            See Emergency Contacts
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
