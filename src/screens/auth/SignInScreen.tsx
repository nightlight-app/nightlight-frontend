import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SignInScreenStyles from '@nightlight/screens/auth/SignInScreen.styles';
import NightlightLogoSvg from '@nightlight/components/svgs/NightlightLogoSvg';
import { COLORS } from '@nightlight/src/global.styles';
import { handleSignIn } from '@nightlight/src/utils/utils';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetInputFields = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignInPress = () => {
    handleSignIn(email, password).then(() => {
      resetInputFields();
    });
  };

  return (
    <SafeAreaView style={SignInScreenStyles.container}>
      {/* nightlight Logo */}
      <NightlightLogoSvg style={SignInScreenStyles.logo} />

      {/* Sign-In Inputs Container */}
      <View style={SignInScreenStyles.inputsContainer}>
        <Text style={SignInScreenStyles.inputsTitle}>Sign in with email</Text>
        <TextInput
          placeholder='Email'
          placeholderTextColor={COLORS.DARK_GRAY}
          style={SignInScreenStyles.emailInput}
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor={COLORS.DARK_GRAY}
          style={SignInScreenStyles.passwordInput}
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
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
        onPress={handleSignInPress}
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
        {/* TODO: should we make this the actual Google logo? (idk abt copyright stuff) */}
        <AntDesign
          name='google'
          size={20}
          color={COLORS.DARK_GRAY}
          style={SignInScreenStyles.googleLogo}
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
