import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NightlightLogo from '@nightlight/assets/images/nightlight-logo.png';
import SignInScreenStyles from '@nightlight/screens/auth/SignInScreen.styles';
import { COLORS } from '@nightlight/src/global.styles';

const SignInScreen = () => {
  return (
    <SafeAreaView style={SignInScreenStyles.container}>
      {/* nightlight Logo */}
      {/* TODO: make image an SVG */}
      <Image source={NightlightLogo} style={SignInScreenStyles.logo} />

      {/* Sign-In Inputs Container */}
      <View style={SignInScreenStyles.inputsContainer}>
        <Text style={SignInScreenStyles.inputsTitle}>Sign in with email</Text>
        <TextInput
          placeholder='Email'
          placeholderTextColor={COLORS.DARK_GRAY}
          style={SignInScreenStyles.emailInput}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor={COLORS.DARK_GRAY}
          style={SignInScreenStyles.passwordInput}
        />
        <TouchableOpacity
          activeOpacity={0.75}
          style={SignInScreenStyles.forgotPasswordLink}>
          <Text style={SignInScreenStyles.forgotPasswordText}>
            forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign-In Button */}
      <TouchableOpacity
        activeOpacity={0.75}
        style={SignInScreenStyles.signInButton}>
        <Text style={SignInScreenStyles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={SignInScreenStyles.signInOptionDividerContainer}>
        <View style={SignInScreenStyles.signInOptionDividerLine} />
        <Text style={SignInScreenStyles.signInOptionText}>
          or continue with
        </Text>
        <View style={SignInScreenStyles.signInOptionDividerLine} />
      </View>

      {/* Sign in with Google */}
      <TouchableOpacity
        activeOpacity={0.75}
        style={SignInScreenStyles.signInWithGoogleButton}>
        {/* TODO: Replace with Google logo as SVG */}
        <View
          style={{
            ...SignInScreenStyles.googleLogo,
            backgroundColor: 'pink',
          }}
        />
        <Text style={SignInScreenStyles.signInWithGoogleButtonText}>
          Sign in with Google
        </Text>
      </TouchableOpacity>

      {/* Register Message */}
      <View style={SignInScreenStyles.registerMessageContainer}>
        <Text style={SignInScreenStyles.registerPretext}>New here? </Text>
        <TouchableOpacity
          activeOpacity={0.75}
          style={SignInScreenStyles.registerLink}>
          <Text style={SignInScreenStyles.registerText}>Register now!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
