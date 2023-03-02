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
import LoginScreenStyles from '@nightlight/screens/login/LoginScreen.styles';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { useState } from 'react';
import { LoginCardProps, LoginFormData } from '@nightlight/src/types';
import { handleLogin } from '@nightlight/src/config/firebaseConfig';
import { Controller, useForm } from 'react-hook-form';

const GoogleIcon = require('@nightlight/assets/googleIcon.png');

const LoginScreen = ({ setIsLogin }: LoginCardProps) => {
  // state for password hiding (passwords are hidden by default)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const toggleIsPasswordHidden = () => setIsPasswordHidden(prev => !prev);
  const handleRegisterLinkPress = () => setIsLogin(false);

  // react hook form creation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  /**
   * Logs in a user from the data in the fields after it passes the validation from react hook forms.
   * After successful or unsuccessful login, resets the text fields to be empty and persists the login.
   *
   * @param data object containing fields from each input wrapped by a controller
   */
  const onSubmit = (data: any) => {
    console.log('handling login', data);
    handleLogin(data.email, data.password).then(() => {
      reset({
        email: '',
        password: '',
      });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={LoginScreenStyles.container}>
        <View style={LoginScreenStyles.logoDot} />
        <View style={LoginScreenStyles.logoBody} />
        <Text style={LoginScreenStyles.h1}>
          Hey there<Text style={LoginScreenStyles.blueText}>.</Text>
        </Text>
        <Text style={LoginScreenStyles.h2}>We're glad you're back.</Text>
        <View style={LoginScreenStyles.emailContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={LoginScreenStyles.emailInput}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder='Email'
              />
            )}
            name='email'
            rules={{ required: true }}
          />
          <View style={LoginScreenStyles.passwordContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={LoginScreenStyles.passwordInput}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  placeholder='Password'
                  secureTextEntry={isPasswordHidden}
                />
              )}
              name='password'
              rules={{ required: true }}
            />
            <Pressable
              style={LoginScreenStyles.viewPasswordButton}
              onPress={toggleIsPasswordHidden}>
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
          <Pressable
            style={LoginScreenStyles.signInButton}
            onPress={() => handleSubmit(onSubmit)}>
            <Text style={LoginScreenStyles.signInButtonText}>Sign In</Text>
          </Pressable>
          <Text style={LoginScreenStyles.continueWithText}>
            Or continue with
          </Text>
          <Pressable style={LoginScreenStyles.googleSignInButton}>
            <Image source={GoogleIcon} style={LoginScreenStyles.googleIcon} />
            <Text style={LoginScreenStyles.googleSignInButtonText}>
              Sign in with Google
            </Text>
          </Pressable>
          <View>
            <Text style={LoginScreenStyles.notMemberText}>
              Not a member?{'  '}
              <Text
                onPress={handleRegisterLinkPress}
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
