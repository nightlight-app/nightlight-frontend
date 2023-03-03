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
  // whether the user is on the login page or the register page
  const [isLoginPage, setIsLoginPage] = useState(true);
  // state for password hiding (passwords are hidden by default)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  // TODO: what is this for?
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

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
        {/* nightlight logo */}
        <View style={AuthScreenStyles.logoDot} />
        <View style={AuthScreenStyles.logoBody} />

        {/* welcome message */}
        <Text style={AuthScreenStyles.h1}>
          {isLoginPage ? 'Hey there' : 'Welcome'}
          <Text style={AuthScreenStyles.blueText}>.</Text>
        </Text>
        <Text style={AuthScreenStyles.h2}>
          {isLoginPage ? "We're glad you're back" : "Let's get started"}
        </Text>

        <View style={AuthScreenStyles.subContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={AuthScreenStyles.textInput}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder='Email'
              />
            )}
            name='email'
            rules={{ required: true }}
          />
          {!isLoginPage && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={AuthScreenStyles.textInput}
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
              onPress={() => setIsPasswordHidden(prev => !prev)}>
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
          {!isLoginPage && (
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
                onPress={() => setIsPasswordHidden(prev => !prev)}>
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

          {isLoginPage && (
            <View style={AuthScreenStyles.forgotPasswordContainer}>
              <Text style={AuthScreenStyles.forgotPassword}>
                Forgot password?
              </Text>
            </View>
          )}

          {/* Button to Register/Login */}
          <Pressable
            style={AuthScreenStyles.signInButton}
            onPress={() => handleSubmit(isLoginPage ? onLogin : onRegister)}>
            <Text style={AuthScreenStyles.signInButtonText}>
              {isLoginPage ? 'Sign in' : 'Register'}
            </Text>
          </Pressable>

          <Text style={AuthScreenStyles.continueWithText}>
            Or continue with
          </Text>

          <Pressable style={AuthScreenStyles.googleSignInButton}>
            <Image source={GoogleIcon} style={AuthScreenStyles.googleIcon} />
            <Text style={AuthScreenStyles.googleSignInButtonText}>
              {isLoginPage ? 'Sign in with Google  ' : 'Sign up with Google'}
            </Text>
          </Pressable>

          {/* Instruction to switch between Register/Login page */}
          <View>
            <Text style={AuthScreenStyles.notMemberText}>
              {isLoginPage ? 'Not a member?  ' : 'Have an account?  '}
              <Text
                onPress={() => setIsLoginPage(prev => !prev)}
                style={AuthScreenStyles.notMemberLink}>
                {isLoginPage ? 'Register now' : 'Login here'}
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
