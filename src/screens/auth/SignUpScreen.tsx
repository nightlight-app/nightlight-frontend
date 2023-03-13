import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@nightlight/src/types';
import SignUpScreenStyles from '@nightlight/screens/auth/SignUpScreen.styles';
import { formatPhoneNumber } from '@nightlight/src/utils/utils';

const SignUpScreen = ({ navigation }: NativeStackScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignInPress = () => {
    navigation.goBack();
  };

  const handlePhoneNumberChange = (input: string) => {
    setPhoneNumber(input.replace(/\D/g, ''));
  };

  const handleCreateAccountPress = () => {
    Alert.alert(
      'TODO: Create Account',
      `first: ${firstName} last: ${lastName} email: ${email} password: ${password} confirm: ${confirmPassword} phone: ${phoneNumber}`
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Swiper
        loop={false}
        dotStyle={SignUpScreenStyles.dotStyle}
        activeDotStyle={SignUpScreenStyles.activeDotStyle}>
        {/* Name */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <View style={SignUpScreenStyles.inputsContainer}>
            <Text
              style={[
                SignUpScreenStyles.inputLabel,
                SignUpScreenStyles.biggerFontSize,
              ]}>
              Hey there,
            </Text>
            <TextInput
              placeholder='John'
              style={[
                SignUpScreenStyles.textInput,
                SignUpScreenStyles.biggerFontSize,
              ]}
              value={firstName}
              onChangeText={setFirstName}
            />
            <View style={SignUpScreenStyles.greetingEndContainer}>
              <TextInput
                placeholder='Doe'
                style={[
                  SignUpScreenStyles.textInput,
                  SignUpScreenStyles.biggerFontSize,
                  SignUpScreenStyles.greetingEndInput,
                ]}
                value={lastName}
                onChangeText={setLastName}
              />
              <Text
                style={[
                  SignUpScreenStyles.inputLabel,
                  SignUpScreenStyles.biggerFontSize,
                  SignUpScreenStyles.greetingEnd,
                ]}>
                !
              </Text>
            </View>
          </View>

          {/* Sign In Message */}
          <View style={SignUpScreenStyles.signInMessageContainer}>
            <Text style={SignUpScreenStyles.signInPretext}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={handleSignInPress}
              activeOpacity={0.75}
              style={SignUpScreenStyles.signInLink}>
              <Text style={SignUpScreenStyles.signInText}>Sign in now!</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Email */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <View style={SignUpScreenStyles.inputsContainer}>
            <Text style={SignUpScreenStyles.inputLabel}>
              I know we just met, but let's keep in touch!
            </Text>
            <TextInput
              placeholder='john.doe@gmail.com'
              autoCapitalize='none'
              style={SignUpScreenStyles.textInput}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </SafeAreaView>

        {/* Password */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <View style={SignUpScreenStyles.inputsContainer}>
            <Text style={SignUpScreenStyles.emojiLabel}>🤐</Text>
            <TextInput
              placeholder='********'
              secureTextEntry={true}
              autoCapitalize='none'
              style={SignUpScreenStyles.textInput}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Let's confirm that ^"
              secureTextEntry={true}
              autoCapitalize='none'
              style={SignUpScreenStyles.textInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </SafeAreaView>

        {/* Phone Number */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <View style={SignUpScreenStyles.inputsContainer}>
            <Text
              style={[
                SignUpScreenStyles.inputLabel,
                SignUpScreenStyles.phoneInputLabel,
              ]}>
              What's the best number to hit you up?
            </Text>
            <View style={SignUpScreenStyles.phoneInput}>
              <Text style={SignUpScreenStyles.phoneInputPrefix}>+1</Text>
              <TextInput
                placeholder='(XXX) XXX-XXXX'
                style={SignUpScreenStyles.textInput}
                keyboardType='number-pad'
                maxLength={14}
                value={formatPhoneNumber(phoneNumber) || phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
            </View>
          </View>
        </SafeAreaView>

        {/* Profile Picture Upload */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <Text style={SignUpScreenStyles.inputLabel}>
            Now, show off that smile! 😁
          </Text>
          {/* TODO: image upload or skip */}
          <TouchableOpacity
            onPress={handleCreateAccountPress}
            activeOpacity={0.75}
            style={SignUpScreenStyles.createAccountButton}>
            <Text style={SignUpScreenStyles.createAccountButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Swiper>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
