import { Text, SafeAreaView, View, Alert } from 'react-native';
import SettingsScreenStyles from '@nightlight/src/screens/profile/SettingsScreen.styles';
import Button from '@nightlight/components/Button';
import { COLORS } from '@nightlight/src/global.styles';
import { handleFirebaseSignOut } from '@nightlight/src/utils/utils';

const SettingsScreen = () => {
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
          <View
            style={{
              backgroundColor: COLORS.NIGHTLIGHT_BLACK,
              height: 40,
              marginVertical: 5,
            }}></View>
        </View>
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>Notifications</Text>
          <View style={SettingsScreenStyles.settingContainer}>
            <View>
              <Text style={SettingsScreenStyles.settingLabel}>
                Friend requests
              </Text>
              <Text style={SettingsScreenStyles.settingDescription}>
                description
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.NIGHTLIGHT_BLUE,
                height: 25,
                width: 50,
              }}></View>
          </View>
          <View style={SettingsScreenStyles.settingContainer}>
            <View>
              <Text style={SettingsScreenStyles.settingLabel}>
                Group invitations
              </Text>
              <Text style={SettingsScreenStyles.settingDescription}>
                description
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.NIGHTLIGHT_BLUE,
                height: 25,
                width: 50,
              }}></View>
          </View>
          <View style={SettingsScreenStyles.settingContainer}>
            <View>
              <Text style={SettingsScreenStyles.settingLabel}>
                Emergency alerts
              </Text>
              <Text style={SettingsScreenStyles.settingDescription}>
                description
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.NIGHTLIGHT_BLUE,
                height: 25,
                width: 50,
              }}></View>
          </View>
        </View>
        <View style={SettingsScreenStyles.category}>
          <Text style={SettingsScreenStyles.categoryLabel}>Account</Text>
          <Button
            onPress={() => alert('TODO: delete account')}
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
