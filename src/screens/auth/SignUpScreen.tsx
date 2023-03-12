import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { NativeStackScreenProps } from '@nightlight/src/types';
import SignUpScreenStyles from '@nightlight/screens/auth/SignUpScreen.styles';

const SignUpScreen = ({ navigation }: NativeStackScreenProps) => {
  const handleSignInPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Swiper loop={false} dotStyle={SignUpScreenStyles.dotStyle} activeDotStyle={SignUpScreenStyles.activeDotStyle}>
        {/* Name */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <View style={SignUpScreenStyles.inputsContainer}>
            <Text style={SignUpScreenStyles.greetingLabel}>Hey there,</Text>
            <TextInput
              placeholder='John'
              style={SignUpScreenStyles.greetingTextInput}
            />
            <View style={SignUpScreenStyles.greetingEndContainer}>
              <TextInput
                placeholder='Doe'
                style={[
                  SignUpScreenStyles.greetingTextInput,
                  SignUpScreenStyles.greetingEndInput,
                ]}
              />
              <Text
                style={[
                  SignUpScreenStyles.greetingLabel,
                  SignUpScreenStyles.greetingEnd,
                ]}>
                !
              </Text>
            </View>
          </View>
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
            />
            <TextInput
              placeholder="Let's confirm that ^"
              secureTextEntry={true}
              autoCapitalize='none'
              style={SignUpScreenStyles.textInput}
            />
          </View>
        </SafeAreaView>

        {/* Phone Number */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <View style={SignUpScreenStyles.inputsContainer}>
            <Text style={SignUpScreenStyles.inputLabel}>
              What's the best number to hit you up?
            </Text>
            <View style={SignUpScreenStyles.phoneInput}>
              <Text style={SignUpScreenStyles.phoneInputPrefix}>+1</Text>
              <TextInput
                placeholder='(XXX) XXX-XXXX'
                style={SignUpScreenStyles.textInput}
              />
            </View>
          </View>
        </SafeAreaView>

        {/* Profile Picture Upload */}
        <SafeAreaView style={SignUpScreenStyles.container}>
          <Text style={SignUpScreenStyles.inputLabel}>
            Now, show off that smile! 😁
          </Text>
        </SafeAreaView>

        {/* Sign In Message */}
      </Swiper>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
