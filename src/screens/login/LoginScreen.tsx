import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LoginScreenStyles from './LoginScreen.styles';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { useState } from 'react';

const LoginScreen = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={LoginScreenStyles.container}>
        <View style={LoginScreenStyles.logoDot}></View>
        <View style={LoginScreenStyles.logoBody}></View>
        <View style={LoginScreenStyles.emailContainer}>
          <TextInput
            style={LoginScreenStyles.emailInput}
            onChangeText={() => {}}
            placeholder='Email'
          />
          <View style={LoginScreenStyles.passwordContainer}>
            <TextInput
              style={LoginScreenStyles.passwordInput}
              onChangeText={() => {}}
              placeholder='Password'
              secureTextEntry={isPasswordHidden}
            />
            <Pressable
              style={LoginScreenStyles.viewPasswordButton}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
              {isPasswordHidden ? (
                <Entypo
                  name='eye-with-line'
                  size={24}
                  color={COLORS.NIGHTLIGHT_GRAY}
                />
              ) : (
                <Entypo name='eye' size={24} color={COLORS.NIGHTLIGHT_GRAY} />
              )}
            </Pressable>
          </View>

          <View style={LoginScreenStyles.forgotPasswordContainer}>
            <Text style={LoginScreenStyles.forgotPassword}>
              Forgot password?
            </Text>
          </View>
          <Pressable style={LoginScreenStyles.signInButton}>
            <Text style={LoginScreenStyles.signInButtonText}>Sign In</Text>
          </Pressable>
          <Text style={LoginScreenStyles.continueWithText}>
            Or continue with
          </Text>
          <Pressable style={LoginScreenStyles.googleSignInButton}>
            <Image
              source={require('../../../assets/googleIcon.png')}
              style={LoginScreenStyles.googleIcon}
            />
            <Text style={LoginScreenStyles.googleSignInButtonText}>
              Sign in with Google
            </Text>
          </Pressable>
          <View>
            <Text style={LoginScreenStyles.notMemberText}>
              Not a member?&nbsp;&nbsp;
              <Text
                onPress={() => Linking.openURL('www.google.com')}
                style={LoginScreenStyles.notMemberLink}>
                Register now
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
