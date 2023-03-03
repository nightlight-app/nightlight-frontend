import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import EmergencyContactsScreen from '@nightlight/screens/profile/EmergencyContactsScreen';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import PartySvg from '@nightlight/components/svgs/PartySvg';
import BottleSvg from '@nightlight/components/svgs/BottleSvg';
import { ProfileRoute, ProfileScreenProps } from '@nightlight/src/types';

// TODO: should this be in utils?
/**
 * Determines the text to display for a given month index
 *
 * @param index The index of the month (0-11)
 * @returns The string 'Jan' for index 0, 'Dec' for index 11, and the index + 1 for all other indices
 */
const getMonthText = (index: number) => {
  switch (index) {
    case 0:
      return 'Jan';
    case 11:
      return 'Dec';
    default:
      return index + 1;
  }
};

// TODO: determine logged in user
const user = TEST_USERS[0];

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  // TODO:
  const handleChangeCoverPicture = () => {};

  // TODO:
  const handleSettingsPress = () => {};

  // TODO:
  const handleEditProfile = () => {};

  // TODO:
  const handleNavigateToEmergencyContacts = () => {
    navigation.navigate(ProfileRoute.EMERGENCY_CONTACTS);
  };

  return (
    <ScrollView
      testID={ProfileRoute.PROFILE}
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

        {/* Profile Statistics */}
        <View style={ProfileScreenStyles.profileStatsContainer}>
          <View style={ProfileScreenStyles.profileStatContainer}>
            <Text style={ProfileScreenStyles.profileStat}>
              {user.friends.length}
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
              <BottleSvg />
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

// Create new stack navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NUM_MONTHS } from '@nightlight/src/constants';
import { COLORS } from '@nightlight/src/global.styles';
import { TEST_USERS } from '@nightlight/src/testData';
import { formatPhoneNumber } from '@nightlight/src/utils/utils';

const Stack = createNativeStackNavigator();

const ProfileScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ProfileRoute.PROFILE}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ProfileRoute.PROFILE} component={ProfileScreen} />
      <Stack.Screen
        name={ProfileRoute.EMERGENCY_CONTACTS}
        component={EmergencyContactsScreen}
      />
      {/* <Stack.Screen name={ProfileRoute.SETTINGS} component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
};

export default ProfileScreenStack;
