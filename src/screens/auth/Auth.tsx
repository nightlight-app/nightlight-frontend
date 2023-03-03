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
import AuthScreenStyles from '@nightlight/screens/auth/Auth.styles';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { useState } from 'react';
import { AuthFormData } from '@nightlight/src/types';
import {
  handleLogin,
  handleSignUp,
} from '@nightlight/src/config/firebaseConfig';
import { Controller, useForm } from 'react-hook-form';

const GoogleIcon = require('@nightlight/assets/googleIcon.png');

const AuthScreen = () => {
  // state for password hiding (passwords are hidden by default)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsPasswordHidden = () => setIsPasswordHidden(prev => !prev);
  const toggleIsConfirmPasswordHidden = () =>
    setIsPasswordHidden(prev => !prev);
  const toggleLoginRegisterLinkPress = () => setIsLogin(prev => !prev);

  // react hook form creation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>();

  /**
   * Logs in a user from the data in the fields after it passes the validation from react hook forms.
   * After successful or unsuccessful login, resets the text fields to be empty and persists the login.
   *
   * @param data object containing fields from each input wrapped by a controller
   */
  const onLogin = (data: any) => {
    console.log('handling login', data);
    handleLogin(data.email, data.password).then(() => {
      reset({
        email: '',
        password: '',
      });
    });
  };

  /**
   * Registers a user from the data in the fields after it passes the validation from react hook forms.
   * After successful or unsuccessful registration, resets the text fields to be empty and persists the login.
   *
   * @param data object containing fields from each input wrapped by a controller
   */
  const onRegister = (data: any) => {
    console.log('handling sign up', data);
    handleSignUp(data.email, data.password).then(() => {
      reset({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={AuthScreenStyles.container}>
        <View style={AuthScreenStyles.logoDot} />
        <View style={AuthScreenStyles.logoBody} />
        <Text style={AuthScreenStyles.h1}>
          {isLogin ? 'Hey there' : 'Welcome'}
          <Text style={AuthScreenStyles.blueText}>.</Text>
        </Text>
        <Text style={AuthScreenStyles.h2}>
          {isLogin ? "We're glad you're back" : "Let's get started"}
        </Text>
        <View style={AuthScreenStyles.emailContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={AuthScreenStyles.emailInput}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder='Email'
              />
            )}
            name='email'
            rules={{ required: true }}
          />
          {!isLogin && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={AuthScreenStyles.phoneInput}
                  placeholder='Phone'
                  keyboardType='phone-pad'
                  secureTextEntry={isConfirmPasswordHidden}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name='phone'
              rules={{ required: true }}
            />
          )}
          <View style={AuthScreenStyles.passwordContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={AuthScreenStyles.passwordInput}
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
              style={AuthScreenStyles.viewPasswordButton}
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
          {!isLogin && (
            <View style={AuthScreenStyles.passwordContainer}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={AuthScreenStyles.passwordInput}
                    placeholder='Confirm password'
                    secureTextEntry={isConfirmPasswordHidden}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='confirmPassword'
                rules={{ required: true }}
              />
              <Pressable
                style={AuthScreenStyles.viewPasswordButton}
                onPress={toggleIsConfirmPasswordHidden}>
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
          )}

          <View style={AuthScreenStyles.forgotPasswordContainer}>
            <Text style={AuthScreenStyles.forgotPassword}>
              Forgot password?
            </Text>
          </View>
          <Pressable
            style={AuthScreenStyles.signInButton}
            onPress={() => handleSubmit(isLogin ? onLogin : onRegister)}>
            <Text style={AuthScreenStyles.signInButtonText}>
              {isLogin ? 'Sign in' : 'Register'}
            </Text>
          </Pressable>
          <Text style={AuthScreenStyles.continueWithText}>
            Or continue with
          </Text>
          <Pressable style={AuthScreenStyles.googleSignInButton}>
            <Image source={GoogleIcon} style={AuthScreenStyles.googleIcon} />
            <Text style={AuthScreenStyles.googleSignInButtonText}>
              {isLogin ? 'Sign in with Google  ' : 'Sign up with Google'}
            </Text>
          </Pressable>
          <View>
            <Text style={AuthScreenStyles.notMemberText}>
              {isLogin ? 'Have an account?  ' : 'Not a member?  '}
              <Text
                onPress={toggleLoginRegisterLinkPress}
                style={AuthScreenStyles.notMemberLink}>
                {isLogin ? 'Register now' : 'Login here'}
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
