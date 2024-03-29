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
import BackgroundStaticMapSvg from '@nightlight/components/svgs/BackgroundStaticMapSvg';
import {
  SIGN_IN_ERROR_CODES,
  UNEXPECTED_ERROR_MESSAGE,
} from '@nightlight/src/constants';
import { useAuthContext } from '@nightlight/src/contexts/AuthContext';

const SignInScreen = ({ navigation }: NativeStackScreenProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { updateUserDocument } = useAuthContext();

  // Hide error message when inputs change
  useEffect(() => {
    if (errorMessage) setErrorMessage(null);
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
      setErrorMessage(null);

      const { user }: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('[Firebase] Successfully signed in user!', user.uid);

      resetInputFields();

      console.log('[SignInScreen] Updating user document with token...');
      updateUserDocument(user, true);
    } catch (error: any) {
      console.error('[Firebase] Error signing in user!');

      // TODO: see https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection
      if (SIGN_IN_ERROR_CODES.includes(error?.code)) {
        setErrorMessage(
          'Hmm... the email or password you entered is incorrect.'
        );
        console.log('[Firebase] Error code:', error?.code);
      } else {
        setErrorMessage(UNEXPECTED_ERROR_MESSAGE);
        console.error('[Firebase] Unhandled error code:', error?.code);
      }
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
        {/* Background Static Map */}
        <BackgroundStaticMapSvg
          style={SignInScreenStyles.backgroundStaticMap}
        />

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
              errorMessage !== null && SignInScreenStyles.errorInput,
            ]}
            autoCapitalize='none'
            keyboardAppearance='dark'
            value={email}
            onChangeText={setEmail}
          />
          <View style={SignInScreenStyles.passwordInputContainer}>
            <TextInput
              placeholder='Password'
              placeholderTextColor={COLORS.DARK_GRAY}
              style={[
                SignInScreenStyles.passwordInput,
                errorMessage !== null && SignInScreenStyles.errorInput,
              ]}
              autoCapitalize='none'
              secureTextEntry={!isPasswordVisible}
              keyboardAppearance='dark'
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

        {/* TODO: temporarily commenting out google signin for apple deployment */}
        {/* Divider */}
        {/* <View style={SignInScreenStyles.signInOptionDividerContainer}>
          <View style={SignInScreenStyles.signInOptionDividerLine} />
          <Text style={SignInScreenStyles.signInOptionText}>
            or continue with
          </Text>
          <View style={SignInScreenStyles.signInOptionDividerLine} />
        </View> */}

        {/* Sign in with Google */}
        {/* <Button
          onPress={handleSignInWithGooglePress}
          icon={<AntDesign name='google' size={20} color={COLORS.DARK_GRAY} />}
          text='Sign in with Google'
          textColor={COLORS.DARK_GRAY}
          style={SignInScreenStyles.signInWithGoogleButton}
        /> */}

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
        {errorMessage && <Banner message={errorMessage} />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
