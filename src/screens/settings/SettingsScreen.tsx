import { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsScreenStyles from '@nightlight/screens/settings/SettingsScreen.styles';
import Button from '@nightlight/components/Button';
import { COLORS } from '@nightlight/src/global.styles';
import { handleFirebaseSignOut } from '@nightlight/src/utils/utils';
import ToggleSetting from '@nightlight/components/settings/ToggleSetting';
import HorizontalSelect from '@nightlight/components/settings/HorizontalSelect';
import { LOCATION_VISIBILITY_OPTIONS } from '@nightlight/src/constants';
import {
  LocationVisibilityValue,
  ProfileRoute,
  ProfileStackParamList,
} from '@nightlight/src/types';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';
import { customFetch } from '@nightlight/src/api';

const SettingsScreen = ({}: NativeStackScreenProps<
  ProfileStackParamList,
  ProfileRoute.SETTINGS
>) => {
  const { userDocument } = useAuthContext();

  const [locationVisibility, setLocationVisibility] = useState<
    LocationVisibilityValue | undefined
  >();
  const [notifyFriendRequests, setNotifyFriendRequests] = useState<
    boolean | undefined
  >();
  const [notifyGroupInvitations, setNotifyGroupInvitations] = useState<
    boolean | undefined
  >();
  const [notifyEmergencyAlerts, setNotifyEmergencyAlerts] = useState<
    boolean | undefined
  >();

  const handleToggleNotifyFriendRequests = () => {
    setNotifyFriendRequests(prev => !prev);
  };
  const handleToggleNotifyGroupInvitations = () => {
    setNotifyGroupInvitations(prev => !prev);
  };
  const handleToggleNotifyEmergencyAlerts = () => {
    setNotifyEmergencyAlerts(prev => !prev);
  };

  useEffect(() => {
    console.log(
      '[Settings] TODO: Fetch user settings from database? or local storage?'
    );

    setLocationVisibility(LOCATION_VISIBILITY_OPTIONS.at(-1)?.value);
    setNotifyFriendRequests(true);
    setNotifyGroupInvitations(true);
    setNotifyEmergencyAlerts(true);
  }, []);

  useEffect(() => {
    console.log(
      '[Settings] TODO: change locationVisibility to',
      locationVisibility
    );
  }, [locationVisibility]);

  useEffect(() => {
    console.log(
      '[Settings] TODO: change notifyFriendRequests to',
      notifyFriendRequests
    );
  }, [notifyFriendRequests]);

  useEffect(() => {
    console.log(
      '[Settings] TODO: change notifyGroupInvitations to',
      notifyGroupInvitations
    );
  }, [notifyGroupInvitations]);

  useEffect(() => {
    console.log(
      '[Settings] TODO: change notifyEmergencyAlerts to',
      notifyEmergencyAlerts
    );
  }, [notifyEmergencyAlerts]);

  const handleDeleteAccount = async () => {
    const userId = userDocument?._id;
    // FIXME: endpoint not working?
    try {
      await customFetch({
        resourceUrl: `/users/${userId}`,
        options: {
          method: 'DELETE',
        },
      });
      console.log(`[Settings] Successfully deleted account with ID ${userId}.`);
      handleFirebaseSignOut();
    } catch (error: any) {
      // TODO: banner
      console.error(
        `[Settings] Error deleting account with ID ${userId}:`,
        error
      );
    }
  };

  const handleDeleteAccountPress = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleDeleteAccount,
          style: 'destructive',
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        onPress: handleFirebaseSignOut,
      },
    ]);
  };

  return (
    <SafeAreaView style={SettingsScreenStyles.container}>
      <View style={SettingsScreenStyles.contentContainer}>
        <Text style={SettingsScreenStyles.title}>Settings</Text>

        {/* Location Visibility */}
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>
            Location Visibility
          </Text>
          <Text style={SettingsScreenStyles.categoryDescription}>
            Who can see your location?
          </Text>
          <HorizontalSelect
            options={LOCATION_VISIBILITY_OPTIONS}
            value={locationVisibility}
            onChangeValue={setLocationVisibility}
          />
        </View>

        {/* Notifications */}
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>Notifications</Text>
          <ToggleSetting
            label='Friend requests'
            description='Get notified when you receive a friend request'
            value={notifyFriendRequests}
            toggleValue={handleToggleNotifyFriendRequests}
          />
          <ToggleSetting
            label='Group invitations'
            description='Get notified when you receive a group invitation'
            value={notifyGroupInvitations}
            toggleValue={handleToggleNotifyGroupInvitations}
          />
          <ToggleSetting
            label='Emergency alerts (recommended)'
            description='Get notified when one of your group members is in an emergency situation'
            value={notifyEmergencyAlerts}
            toggleValue={handleToggleNotifyEmergencyAlerts}
            dangerous
          />
        </View>

        {/* Account */}
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>Account</Text>
          <Button
            onPress={handleDeleteAccountPress}
            text='Delete Account'
            textColor={COLORS.RED}
            style={SettingsScreenStyles.dangerButton}
          />
          <Button
            onPress={handleSignOut}
            text='Logout'
            textColor={COLORS.RED}
            style={SettingsScreenStyles.dangerButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
