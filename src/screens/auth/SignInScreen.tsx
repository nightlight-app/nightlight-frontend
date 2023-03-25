import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SignInScreenStyles from '@nightlight/screens/auth/SignInScreen.styles';
import NightlightLogoSvg from '@nightlight/components/svgs/NightlightLogoSvg';
import { COLORS } from '@nightlight/src/global.styles';
import { auth } from '@nightlight/src/config/firebaseConfig';
import Banner from '@nightlight/components/Banner';
import { AuthRoute, NativeStackScreenProps } from '@nightlight/src/types';
import Button from '@nightlight/components/Button';
import { SIGN_IN_ERROR_CODES } from '@nightlight/src/constants';

const SignInScreen = ({ navigation }: NativeStackScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // Hide error message when inputs change
  useEffect(() => {
    if (isErrorVisible) setIsErrorVisible(false);
  }, [email, password]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const resetInputFields = () => {
    setEmail('');
    setPassword('');
  };

  const handleForgotPasswordPress = () => {
    Alert.alert('TODO: Handle forgot password');
  };

  const handleSignInPress = async () => {
    console.log('[Firebase] Signing in user...');

    try {
      setIsErrorVisible(false);

      const { user }: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('[Firebase] Successfully signed in user!', user.uid);

      resetInputFields();
    } catch (error: any) {
      console.log('[Firebase] Error signing in user!');

      // TODO: see https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection
      if (SIGN_IN_ERROR_CODES.includes(error?.code)) setIsErrorVisible(true);
      else console.error('[Firebase] Unhandled error code:', error?.code);
    }
  };

  const handleSignInWithGooglePress = () => {
    console.log('[Firebase] Signing in user with Google...');
    Alert.alert('TODO: Sign in with Google');
  };

  const handleSignUpPress = () => {
    navigation.navigate(AuthRoute.SIGN_UP);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={SignInScreenStyles.container}>
        {/* nightlight Logo */}
        <NightlightLogoSvg style={SignInScreenStyles.logo} />

        {/* Sign-In Inputs Container */}
        <View style={SignInScreenStyles.inputsContainer}>
          <Text style={SignInScreenStyles.inputsTitle}>Sign in with email</Text>
          <TextInput
            placeholder='Email'
            placeholderTextColor={COLORS.DARK_GRAY}
            style={[
              SignInScreenStyles.emailInput,
              isErrorVisible && SignInScreenStyles.errorInput,
            ]}
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
          <View style={SignInScreenStyles.passwordInputContainer}>
            <TextInput
              placeholder='Password'
              placeholderTextColor={COLORS.DARK_GRAY}
              style={[
                SignInScreenStyles.passwordInput,
                isErrorVisible && SignInScreenStyles.errorInput,
              ]}
              autoCapitalize='none'
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={togglePasswordVisibility}
              style={SignInScreenStyles.passwordVisibilityButton}>
              <Ionicons
                name={`ios-eye${isPasswordVisible ? '' : '-off'}-outline`}
                size={24}
                color={COLORS.DARK_GRAY}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={handleForgotPasswordPress}
            activeOpacity={0.75}
            style={SignInScreenStyles.forgotPasswordLink}>
            <Text style={SignInScreenStyles.forgotPasswordText}>
              forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign-In Button */}
        <Button
          onPress={handleSignInPress}
          text='Sign In'
          style={SignInScreenStyles.signInButton}
        />

        {/* Divider */}
        <View style={SignInScreenStyles.signInOptionDividerContainer}>
          <View style={SignInScreenStyles.signInOptionDividerLine} />
          <Text style={SignInScreenStyles.signInOptionText}>
            or continue with
          </Text>
          <View style={SignInScreenStyles.signInOptionDividerLine} />
        </View>

        {/* Sign in with Google */}
        <Button
          onPress={handleSignInWithGooglePress}
          icon={<AntDesign name='google' size={20} color={COLORS.DARK_GRAY} />}
          text='Sign in with Google'
          textColor={COLORS.DARK_GRAY}
          style={SignInScreenStyles.signInWithGoogleButton}
        />

        {/* Sign Up Message */}
        <View style={SignInScreenStyles.signUpMessageContainer}>
          <Text style={SignInScreenStyles.signUpPretext}>New here? </Text>
          <TouchableOpacity
            onPress={handleSignUpPress}
            activeOpacity={0.75}
            style={SignInScreenStyles.signUpLink}>
            <Text style={SignInScreenStyles.signUpText}>Sign up now!</Text>
          </TouchableOpacity>
        </View>

        {/* Error Banner */}
        {isErrorVisible && (
          <Banner
            message='Hmm...the email or password you entered is incorrect.'
            backgroundColor={COLORS.RED}
            textColor={COLORS.WHITE}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
