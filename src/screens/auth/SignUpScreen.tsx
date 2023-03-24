import { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { Feather, AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SERVER_URL } from '@env';
import { NativeStackScreenProps } from '@nightlight/src/types';
import SignUpScreenStyles from '@nightlight/screens/auth/SignUpScreen.styles';
import { formatPhoneNumber } from '@nightlight/src/utils/utils';
import { COLORS } from '@nightlight/src/global.styles';
import Button from '@nightlight/components/Button';
import { auth } from '@nightlight/src/config/firebaseConfig';
import Banner from '@nightlight/components/Banner';

// TODO: export to types?
enum SignUpInputField {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  CONFIRM_PASSWORD = 'Confirm Password',
  PHONE_NUMBER = 'Phone Number',
}

const SignUpScreen = ({ navigation }: NativeStackScreenProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const [errorBannerMessage, setErrorBannerMessage] = useState<string | null>(
    null
  );
  const [errorFields, setErrorFields] = useState<SignUpInputField[]>([]);

  // Reset error banner message and error fields when any of the input fields change
  useEffect(() => {
    setErrorBannerMessage(null);
    setErrorFields([]);
  }, [firstName, lastName, email, password, confirmPassword, phoneNumber]);

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
      console.error(
        `[Firebase] Error signing up new user! Email: ${email}, password: ${password}`
      );
      console.error(error);
      return;
    }
    console.log(
      '[Firebase] Successfully signed up new user! User ID:',
      firebaseUid
    );

    // Create user in database
    console.log('[MongoDB] Creating new user in database...');
    let userId: string | undefined;
    let response: Response | undefined;
    try {
      const body = {
        firstName,
        lastName,
        email,
        firebaseUid,
        phone: phoneNumber,
      };

      response = await fetch(`${SERVER_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `[MongoDB] Failed to create user in database. Response: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      userId = data.user._id;
      console.log(
        `[MongoDB] Successfully created new user in database! User ID: ${userId}`
      );
    } catch (error: unknown) {
      console.error(
        `[MongoDB] Error creating new user in database! Firebase UID: ${firebaseUid}, first name: ${firstName}, last name: ${lastName}, email: ${email}, phone number: ${phoneNumber}. Response: ${response?.status} ${response?.statusText}`
      );
      console.error(error);
      return;
    }

    // TODO: Attach profile picture
    if (profilePictureUri) {
      console.log('[MongoDB] Attaching profile picture...');
      const filename = profilePictureUri.split('/').pop();

      // Construct the form data to post the image to Cloudinary
      let formData = new FormData();
      formData.append('image', profilePictureUri, filename);

      // Upload profile picture to Cloudinary
      let response: Response | undefined;
      try {
        response = await fetch(
          `${SERVER_URL}/users/${userId}/uploadProfileImg`,
          {
            method: 'PATCH',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `[MongoDB] Failed to attach profile picture. Response: ${response.status} ${response.statusText}`
          );
        }

        // TODO: Update user in database with profile picture URL
      } catch (error: unknown) {
        console.error(
          `[MongoDB] Error attaching profile picture! User ID: ${userId}, profile picture URI: ${profilePictureUri}. Response: ${response?.status} ${response?.statusText}`
        );
      }
    }
  };

  const handleBackPress = () => {
    if (activeIndex < 1) handleSignInPress();
    setActiveIndex(prev => prev - 1);
  };

  const handleNextPress = () => {
    setErrorBannerMessage(null);
    setErrorFields([]);

    // Validate input fields
    switch (activeIndex) {
      case 0:
        // Validate first and last name exist
        if (!firstName && !lastName) {
          setErrorBannerMessage('Please enter your first and last name.');
          setErrorFields([
            SignUpInputField.FIRST_NAME,
            SignUpInputField.LAST_NAME,
          ]);
          return;
        }

        // Validate first name exists
        if (!firstName) {
          setErrorBannerMessage('Please enter your first name.');
          setErrorFields([SignUpInputField.FIRST_NAME]);
          return;
        }

        // Validate last name exists
        if (!lastName) {
          setErrorBannerMessage('Please enter your last name.');
          setErrorFields([SignUpInputField.LAST_NAME]);
          return;
        }

        break;
      case 1:
        // Validate email exists
        if (!email) {
          setErrorBannerMessage('Please enter your email.');
          setErrorFields([SignUpInputField.EMAIL]);
          return;
        }

        // Validate email contains @
        if (!email.includes('@')) {
          setErrorBannerMessage('Please enter a valid email.');
          setErrorFields([SignUpInputField.EMAIL]);
          return;
        }

        break;
      case 2:
        // Validate password exists
        if (!password) {
          setErrorBannerMessage('Please enter your password.');
          setErrorFields([SignUpInputField.PASSWORD]);
          return;
        }

        // Validate password length
        if (password.length < 6) {
          // TODO: export into const?
          setErrorBannerMessage('Password must be at least 6 characters.');
          setErrorFields([SignUpInputField.PASSWORD]);
          if (confirmPassword)
            setErrorFields(prev => [
              ...prev,
              SignUpInputField.CONFIRM_PASSWORD,
            ]);
          return;
        }

        // Validate password confirmation exists
        if (!confirmPassword) {
          setErrorBannerMessage('Please confirm your password.');
          setErrorFields([SignUpInputField.CONFIRM_PASSWORD]);
          return;
        }

        // Validate passwords match
        if (password !== confirmPassword) {
          setErrorBannerMessage('Passwords do not match.');
          setErrorFields([
            SignUpInputField.PASSWORD,
            SignUpInputField.CONFIRM_PASSWORD,
          ]);
          return;
        }
        break;
      case 3:
        // Validate phone number exists
        if (!phoneNumber) {
          setErrorBannerMessage('Please enter your phone number.');
          setErrorFields([SignUpInputField.PHONE_NUMBER]);
          return;
        }

        // Validate phone number length
        if (phoneNumber.length !== 10) {
          setErrorBannerMessage('Please enter a valid phone number.');
          setErrorFields([SignUpInputField.PHONE_NUMBER]);
          return;
        }

        break;
      default:
        throw new Error(
          `[User Registration] Invalid active page index. Expected 0-${pages.length}, got ${activeIndex}.`
        );
        break;
    }

    setActiveIndex(prev => prev + 1);
  };

  const pages: React.ReactNode[] = [
    <View style={[SignUpScreenStyles.pageContentContainer]}>
      {/* Name */}
      <Animated.View entering={FadeIn.delay(300)} exiting={FadeOut}>
        <Text
          style={[
            SignUpScreenStyles.inputLabel,
            SignUpScreenStyles.biggerFontSize,
          ]}>
          Hey there,
        </Text>
        <TextInput
          placeholder='Graham'
          style={[
            SignUpScreenStyles.textInput,
            SignUpScreenStyles.biggerFontSize,
            errorFields.includes(SignUpInputField.FIRST_NAME) &&
              SignUpScreenStyles.textInputError,
          ]}
          value={firstName}
          onChangeText={setFirstName}
        />
        <View style={SignUpScreenStyles.greetingEndContainer}>
          <TextInput
            placeholder='Hemingway'
            style={[
              SignUpScreenStyles.textInput,
              SignUpScreenStyles.biggerFontSize,
              SignUpScreenStyles.greetingEndInput,
              errorFields.includes(SignUpInputField.LAST_NAME) &&
                SignUpScreenStyles.textInputError,
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
      </Animated.View>

      {/* Sign In Message */}
      <Animated.View
        entering={FadeIn.delay(300)}
        exiting={FadeOut}
        style={SignUpScreenStyles.signInMessageContainer}>
        <Text style={SignUpScreenStyles.signInPretext}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={handleSignInPress}
          activeOpacity={0.75}
          style={SignUpScreenStyles.signInLink}>
          <Text style={SignUpScreenStyles.linkText}>Sign in now!</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>,

    // Email Prompt Page
    <Animated.View
      entering={FadeIn.delay(300)}
      exiting={FadeOut}
      style={[SignUpScreenStyles.pageContentContainer]}>
      <Text style={SignUpScreenStyles.inputLabel}>
        I know we just met, but let's keep in touch!
      </Text>
      <TextInput
        placeholder='ghemingway@gmail.com'
        autoCapitalize='none'
        style={[
          SignUpScreenStyles.textInput,
          errorFields.includes(SignUpInputField.EMAIL) &&
            SignUpScreenStyles.textInputError,
        ]}
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
    </Animated.View>,

    // Password Prompt Page
    <View style={[SignUpScreenStyles.pageContentContainer]}>
      <Animated.Text
        entering={FadeIn.delay(300)}
        exiting={FadeOut}
        style={SignUpScreenStyles.inputLabel}>
        Password? <Text style={SignUpScreenStyles.emojiLabel}>🤐</Text>
      </Animated.Text>
      <Animated.View
        entering={FadeIn.delay(300)}
        exiting={FadeOut}
        style={SignUpScreenStyles.passwordInputContainer}>
        <TextInput
          placeholder='********'
          secureTextEntry={!isPasswordVisible}
          autoCapitalize='none'
          style={[
            SignUpScreenStyles.textInput,
            errorFields.includes(SignUpInputField.PASSWORD) &&
              SignUpScreenStyles.textInputError,
          ]}
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
      </Animated.View>
      <Animated.View entering={FadeIn.delay(300)} exiting={FadeOut}>
        <TextInput
          placeholder="Let's confirm that ^"
          secureTextEntry={!isConfirmPasswordVisible}
          autoCapitalize='none'
          style={[
            SignUpScreenStyles.textInput,
            errorFields.includes(SignUpInputField.CONFIRM_PASSWORD) &&
              SignUpScreenStyles.textInputError,
          ]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable
          onPress={toggleConfirmPasswordVisibility}
          style={SignUpScreenStyles.passwordVisibilityButton}>
          <Ionicons
            name={`ios-eye${isConfirmPasswordVisible ? '' : '-off'}-outline`}
            size={24}
            color={COLORS.DARK_GRAY}
          />
        </Pressable>
      </Animated.View>
    </View>,

    // Phone Number Prompt Page
    <Animated.View
      entering={FadeIn.delay(300)}
      exiting={FadeOut}
      style={[SignUpScreenStyles.pageContentContainer]}>
      <Text
        style={[
          SignUpScreenStyles.inputLabel,
          SignUpScreenStyles.phoneInputLabel,
        ]}>
        Emergencies happen.
        {'\n'}
        Let's keep you safe.
      </Text>
      <View style={SignUpScreenStyles.phoneInput}>
        <Text style={SignUpScreenStyles.phoneInputPrefix}>+1</Text>
        <TextInput
          placeholder='(XXX) XXX-XXXX'
          style={[
            SignUpScreenStyles.textInput,
            SignUpScreenStyles.phoneTextInput,
            errorFields.includes(SignUpInputField.PHONE_NUMBER) &&
              SignUpScreenStyles.textInputError,
          ]}
          keyboardType='number-pad'
          maxLength={14}
          value={formatPhoneNumber(phoneNumber) || phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
      </View>
    </Animated.View>,

    // Profile Picture Upload Page
    <View style={[SignUpScreenStyles.pageContentContainer]}>
      <Animated.View
        entering={FadeIn.delay(300)}
        exiting={FadeOut}
        style={SignUpScreenStyles.profilePictureUploadContainer}>
        <Text style={SignUpScreenStyles.inputLabel}>
          Now, show off that smile!
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
        {profilePictureUri ? (
          <Button
            onPress={handleCreateAccountPress}
            text='Create Account'
            style={SignUpScreenStyles.createAccountButton}
          />
        ) : (
          <TouchableOpacity
            onPress={handleCreateAccountPress}
            activeOpacity={0.75}
            style={SignUpScreenStyles.maybeLaterContainer}>
            <Text style={SignUpScreenStyles.linkText}>Maybe later</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>,
  ];

  const renderNavDot = (index: number): React.ReactNode => {
    const isActive = activeIndex === index;

    const animatedDotStyle = useAnimatedStyle(() => ({
      backgroundColor: isActive
        ? withTiming(COLORS.NIGHTLIGHT_BLUE, { duration: 250 / 2 })
        : COLORS.NIGHTLIGHT_GRAY,
      opacity: isActive
        ? withSequence(
            withTiming(0.33, { duration: 250 / 2 }),
            withTiming(1, { duration: 250 / 2 })
          )
        : 1,
      width: withTiming(isActive ? 20 : 8),
    }));

    return (
      <Animated.View
        key={index}
        style={[SignUpScreenStyles.navDot, animatedDotStyle]}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={SignUpScreenStyles.container}>
        {pages[activeIndex]}
        <View style={SignUpScreenStyles.navContainer}>
          <View style={SignUpScreenStyles.navButtonsContainer}>
            {activeIndex >= 0 && (
              <Button
                style={[
                  SignUpScreenStyles.navButton,
                  SignUpScreenStyles.backButton,
                ]}
                onPress={handleBackPress}
                icon={<AntDesign name='left' size={20} color={COLORS.GRAY} />}
              />
            )}
            {activeIndex < pages.length - 1 && (
              <Button
                style={[
                  SignUpScreenStyles.navButton,
                  SignUpScreenStyles.nextButton,
                ]}
                onPress={handleNextPress}
                icon={<AntDesign name='right' size={20} color={COLORS.WHITE} />}
              />
            )}
          </View>
          <View style={SignUpScreenStyles.navDotsContainer}>
            {pages.map((_, index) => renderNavDot(index))}
          </View>
        </View>
        {errorBannerMessage && <Banner message={errorBannerMessage} />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
