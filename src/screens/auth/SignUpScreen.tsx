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
  Pressable,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { SERVER_URL } from '@env';
import { NativeStackScreenProps } from '@nightlight/src/types';
import SignUpScreenStyles from '@nightlight/screens/auth/SignUpScreen.styles';
import { formatPhoneNumber } from '@nightlight/src/utils/utils';
import { COLORS } from '@nightlight/src/global.styles';
import Button from '@nightlight/components/Button';
import { auth } from '@nightlight/src/config/firebaseConfig';

const renderPaginationDot = (isActive: boolean) => (
  <View
    style={{
      backgroundColor: isActive
        ? COLORS.NIGHTLIGHT_BLUE
        : COLORS.NIGHTLIGHT_GRAY,
      width: isActive ? 20 : 8,
      height: 8,
      borderRadius: 4,
      margin: 3,
    }}
  />
);

const SignUpScreen = ({ navigation }: NativeStackScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [profilePictureUri, setProfilePictureUri] = useState<string | null>(
    null
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prev => !prev);
  };

  const handleSignInPress = () => {
    navigation.goBack();
  };

  const handlePhoneNumberChange = (input: string) => {
    setPhoneNumber(input.replace(/\D/g, ''));
  };

  const handleChooseImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePictureUri(result.assets[0].uri);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRemoveImage = () => {
    setProfilePictureUri(null);
  };

  const handleCreateAccountPress = async () => {
    console.log('[User Registration] Validating user registration fields...');

    // Determine which fields are missing
    const requiredFields = {
      'First Name': firstName,
      'Last Name': lastName,
      Email: email,
      Password: password,
      'Phone Number': phoneNumber,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    // Validate required fields
    if (missingFields.length > 0) {
      Alert.alert('Missing Required Fields', missingFields.join('\n'));
      console.log(
        '[User Registration] Missing required fields:',
        missingFields
      );
      return;
    }

    // Validate email
    if (!email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      console.log('[User Registration] Invalid email:', email);
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters.'
      );
      return;
    }

    // Validate phone number
    if (phoneNumber.length !== 10) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      console.log('[User Registration] Invalid phone number:', phoneNumber);
      return;
    }

    // Sign up user with Firebase
    console.log('[Firebase] Signing up new user...');
    let firebaseUid: string;
    try {
      const { user }: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      firebaseUid = user.uid;
    } catch (error: unknown) {
      console.log('[Firebase] Error signing up new user!');
      console.error(error);
      return;
    }
    console.log(
      '[Firebase] Successfully signed up new user! User ID:',
      firebaseUid
    );

    // Create user in database
    console.log('[MongoDB] Creating new user in database...');
    try {
      const body = {
        firstName,
        lastName,
        firebaseUid,
        phoneNumber,
      };

      const response = await fetch(`${SERVER_URL}user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('[MongoDB] Failed to create user in database.');
      }
    } catch (error: unknown) {
      console.log('[MongoDB] Error creating new user in database!');
      console.error(error);
      return;
    }

    // TODO: Attach profile picture
    if (profilePictureUri) {
      const filename = profilePictureUri.split('/').pop();

      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      // Upload the image to Cloudinary
      let formData = new FormData();
      formData.append('image', {
        uri: profilePictureUri,
        name: filename || 'undefined.' + type.split('/')[1],
        type,
      });
      formData.append('image', profilePictureUri, filename);

      try {
        const response = await fetch(SERVER_URL, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!response.ok) {
          throw new Error('[MongoDB] Failed to attach profile picture.');
        }

        // TODO: Update user in database with profile picture URL
      } catch (error: unknown) {
        console.log('[MongoDB] Error attaching profile picture!');
        console.error(error);
        return;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Swiper
        loop={false}
        dot={renderPaginationDot(false)}
        activeDot={renderPaginationDot(true)}>
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
            <View style={SignUpScreenStyles.passwordInputContainer}>
              <TextInput
                placeholder='********'
                secureTextEntry={!isPasswordVisible}
                autoCapitalize='none'
                style={SignUpScreenStyles.textInput}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={togglePasswordVisibility}
                style={SignUpScreenStyles.passwordVisibilityButton}>
                <Ionicons
                  name={`ios-eye${isPasswordVisible ? '' : '-off'}-outline`}
                  size={24}
                  color={COLORS.DARK_GRAY}
                />
              </Pressable>
            </View>
            <View>
              <TextInput
                placeholder="Let's confirm that ^"
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize='none'
                style={SignUpScreenStyles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable
                onPress={toggleConfirmPasswordVisibility}
                style={SignUpScreenStyles.passwordVisibilityButton}>
                <Ionicons
                  name={`ios-eye${
                    isConfirmPasswordVisible ? '' : '-off'
                  }-outline`}
                  size={24}
                  color={COLORS.DARK_GRAY}
                />
              </Pressable>
            </View>
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
                style={[
                  SignUpScreenStyles.textInput,
                  SignUpScreenStyles.phoneTextInput,
                ]}
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
          <TouchableOpacity onPress={handleChooseImage} activeOpacity={0.75}>
            {profilePictureUri ? (
              <Image
                source={{ uri: profilePictureUri }}
                style={SignUpScreenStyles.profilePicture}
              />
            ) : (
              <Image
                source={require('@nightlight/assets/images/smiley-face.png')}
                style={SignUpScreenStyles.smileyFace}
              />
            )}
          </TouchableOpacity>
          <View style={SignUpScreenStyles.imageButtonsContianer}>
            <Button
              onPress={handleChooseImage}
              text={`${profilePictureUri ? 'Change' : 'Choose'} Image...`}
              style={SignUpScreenStyles.chooseImageButton}
              textColor={COLORS.GRAY}
            />
            {profilePictureUri && (
              <Button
                onPress={handleRemoveImage}
                icon={<Feather name='trash-2' size={20} color={COLORS.WHITE} />}
                style={SignUpScreenStyles.removeImageButton}
                textColor={COLORS.WHITE}
              />
            )}
          </View>
          <Button
            onPress={handleCreateAccountPress}
            text={profilePictureUri ? 'Create Account' : 'Maybe Later'}
            style={SignUpScreenStyles.createAccountButton}
          />
        </SafeAreaView>
      </Swiper>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
