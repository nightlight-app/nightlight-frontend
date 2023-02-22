import { Pressable, SafeAreaView, Text } from 'react-native';
import { handleSignOut } from '../../config/firebaseConfig';
import ProfileScreenStyles from './ProfileScreen.styles';

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Pressable style={ProfileScreenStyles.logOutButton}>
        <Text
          style={ProfileScreenStyles.logOutButtonText}
          onPress={() => handleSignOut()}>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
