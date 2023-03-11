import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@nightlight/src/types';

const SignUpScreen = ({ navigation }: NativeStackScreenProps) => {
  const handleSignInPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      {/* Name */}
      <Text>Hey there,</Text>
      <TextInput placeholder='John' />
      <View>
        <TextInput placeholder='Doe' />
        <Text>!</Text>
      </View>

      {/* Email */}
      <Text>I know we just met, but let's keep in touch!</Text>
      <TextInput placeholder='john.doe@gmail.com' />

      {/* Password */}
      <Text>🤐</Text>
      <TextInput placeholder='********' secureTextEntry={true} />
      <TextInput placeholder="Let's confirm that ^" secureTextEntry={true} />

      {/* Phone Number */}
      <Text>What's the best number to hit you up?</Text>
      <View>
        <Text>+1</Text>
        <TextInput placeholder='(XXX) XXX-XXXX' />
      </View>

      {/* Profile Picture Upload */}
      <Text>Now, show off that smile! 😁</Text>

      {/* Sign In Message */}
      <View>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handleSignInPress} activeOpacity={0.75}>
          <Text>Sign in now!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
