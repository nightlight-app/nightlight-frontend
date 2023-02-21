import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import RegisterScreenStyles from './RegisterScreen.styles';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { useState } from 'react';

const RegisterScreen = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={RegisterScreenStyles.container}>
        <View style={RegisterScreenStyles.logoDot}></View>
        <View style={RegisterScreenStyles.logoBody}></View>
        <Text style={RegisterScreenStyles.h1}>
          Welcome<Text style={RegisterScreenStyles.blueText}>.</Text>
        </Text>
        <Text style={RegisterScreenStyles.h2}>Let's get started.</Text>
        <TextInput
          style={RegisterScreenStyles.emailInput}
          onChangeText={() => {}}
          placeholder='Email'
        />

        <View style={RegisterScreenStyles.passwordContainer}>
          <TextInput
            style={RegisterScreenStyles.passwordInput}
            onChangeText={() => {}}
            placeholder='Password'
            secureTextEntry={isPasswordHidden}
          />
          <Pressable
            style={RegisterScreenStyles.viewPasswordButton}
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

        <View style={RegisterScreenStyles.passwordContainer}>
          <TextInput
            style={RegisterScreenStyles.passwordInput}
            onChangeText={() => {}}
            placeholder='Confirm password'
            secureTextEntry={isConfirmPasswordHidden}
          />
          <Pressable
            style={RegisterScreenStyles.viewPasswordButton}
            onPress={() =>
              setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
            }>
            {isConfirmPasswordHidden ? (
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
        <TextInput
          style={RegisterScreenStyles.phoneInput}
          onChangeText={() => {}}
          placeholder='Phone'
          keyboardType='phone-pad'
        />
        <Pressable style={RegisterScreenStyles.signInButton}>
          <Text style={RegisterScreenStyles.signInButtonText}>Sign Up</Text>
        </Pressable>
        <Text style={RegisterScreenStyles.continueWithText}>
          Or continue with
        </Text>
        <Pressable style={RegisterScreenStyles.googleSignInButton}>
          <Image
            source={require('../../../assets/googleIcon.png')}
            style={RegisterScreenStyles.googleIcon}
          />
          <Text style={RegisterScreenStyles.googleSignInButtonText}>
            Sign up with Google
          </Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
