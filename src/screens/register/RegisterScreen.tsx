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
import RegisterScreenStyles from '@nightlight/screens/register/RegisterScreen.styles';
import { Controller, useForm } from 'react-hook-form';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { useState } from 'react';
import { RegisterCardProps, RegisterFormData } from '@nightlight/src/types';
import { handleSignUp } from '@nightlight/src/config/firebaseConfig';

const GoogleIcon = require('@nightlight/assets/googleIcon.png');

const RegisterScreen = ({ setIsLogin }: RegisterCardProps) => {
  // state for password hiding (passwords are hidden by default)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const toggleIsPasswordHidden = () => setIsPasswordHidden(prev => !prev);
  const toggleIsConfirmPasswordHidden = () =>
    setIsPasswordHidden(prev => !prev);
  const handleLoginLinkPress = () => setIsLogin(true);

  // react hook form creation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  /**
   * Registers a user from the data in the fields after it passes the validation from react hook forms.
   * After successful or unsuccessful registration, resets the text fields to be empty and persists the login.
   *
   * @param data object containing fields from each input wrapped by a controller
   */
  const onSubmit = (data: any) => {
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
      <SafeAreaView style={RegisterScreenStyles.container}>
        <View style={RegisterScreenStyles.logoDot}></View>
        <View style={RegisterScreenStyles.logoBody}></View>
        <Text style={RegisterScreenStyles.h1}>
          Welcome<Text style={RegisterScreenStyles.blueText}>.</Text>
        </Text>
        <Text style={RegisterScreenStyles.h2}>Let's get started.</Text>
        {/* Start form */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={RegisterScreenStyles.emailInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder='Email'
            />
          )}
          name='email'
          rules={{ required: true }}
        />
        <View style={RegisterScreenStyles.passwordContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={RegisterScreenStyles.passwordInput}
                placeholder='Password'
                secureTextEntry={isPasswordHidden}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name='password'
            rules={{ required: true }}
          />
          <Pressable
            style={RegisterScreenStyles.viewPasswordButton}
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

        <View style={RegisterScreenStyles.passwordContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={RegisterScreenStyles.passwordInput}
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
            style={RegisterScreenStyles.viewPasswordButton}
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={RegisterScreenStyles.phoneInput}
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
        <Pressable style={RegisterScreenStyles.signInButton}>
          <Text
            style={RegisterScreenStyles.signInButtonText}
            onPress={() => handleSubmit(onSubmit)}>
            Sign Up
          </Text>
        </Pressable>
        {/* End form */}
        <Text style={RegisterScreenStyles.continueWithText}>
          Or continue with
        </Text>
        <Pressable style={RegisterScreenStyles.googleSignInButton}>
          <Image source={GoogleIcon} style={RegisterScreenStyles.googleIcon} />
          <Text style={RegisterScreenStyles.googleSignInButtonText}>
            Sign up with Google
          </Text>
        </Pressable>
        <Text style={RegisterScreenStyles.hasAccountText}>
          Have an account?&nbsp;&nbsp;
          <Text
            onPress={handleLoginLinkPress}
            style={RegisterScreenStyles.hasAccountLink}>
            Login now
          </Text>
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
