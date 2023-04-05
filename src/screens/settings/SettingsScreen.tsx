import { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import SettingsScreenStyles from '@nightlight/screens/settings/SettingsScreen.styles';
import Button from '@nightlight/components/Button';
import { COLORS } from '@nightlight/src/global.styles';
import { handleFirebaseSignOut } from '@nightlight/src/utils/utils';
import ToggleSetting from '@nightlight/components/settings/ToggleSetting';
import HorizontalSelect from '@nightlight/components/settings/HorizontalSelect';

const SettingsScreen = () => {
  const [locationVisibility, setLocationVisibility] = useState('friendsGroup');
  const [notifyFriendRequests, setNotifyFriendRequests] = useState(true);
  const [notifyGroupInvitations, setNotifyGroupInvitations] = useState(true);
  const [notifyEmergencyAlerts, setNotifyEmergencyAlerts] = useState(true);

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

  const handleDeleteAccount = () => {
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
          onPress: () =>
            alert(
              'TODO: prompt user to enter password, then delete account in Firebase and remove user from database'
            ),
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
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>
            Location Visibility
          </Text>
          <Text style={SettingsScreenStyles.categoryDescription}>
            Who can see your location?
          </Text>
          <HorizontalSelect
            options={[
              { label: 'No one', value: 'noOne' },
              { label: 'Friends', value: 'friends' },
              { label: 'Friends + Group', value: 'friendsGroup' },
            ]}
            value={locationVisibility}
            onChangeValue={setLocationVisibility}
          />
        </View>
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
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>Account</Text>
          <Button
            onPress={handleDeleteAccount}
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
