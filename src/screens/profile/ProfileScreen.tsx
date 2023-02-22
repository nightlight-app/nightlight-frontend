import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import PartySvg from '@nightlight/components/svgs/PartySvg';
import BottleSvg from '@nightlight/components/svgs/BottleSvg';
import PencilSvg from '@nightlight/components/svgs/PencilSvg';
import SettingsSvg from '@nightlight/components/svgs/SettingsSvg';
import PhotoSvg from '@nightlight/components/svgs/PhotoSvg';
import { Route } from '@nightlight/src/types';

const ProfileScreen = () => {
  // the months to iterate through
  const months = [
    'Jan',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    'Dec',
  ];

  return (
    <View testID={Route.PROFILE} style={ProfileScreenStyles.container}>
      {/* Background image */}
      <View style={ProfileScreenStyles.backgroundImageContainer}>
        <ImageBackground
          source={require('@nightlight/assets/images/cover-photo.png')}
          style={ProfileScreenStyles.backgroundImage}
        />
        {/* Interactable SVGs (TODO: make these interactable) */}
        <SettingsSvg style={ProfileScreenStyles.settingsSVG} />
        <PhotoSvg style={ProfileScreenStyles.photoSvg} />
        <PencilSvg style={ProfileScreenStyles.pencilSVG} />
      </View>

      {/* Profile info */}
      <View style={ProfileScreenStyles.profileInfoContainer}>
        <Image
          source={require('@nightlight/assets/images/anon.png')}
          style={ProfileScreenStyles.profileImage}
        />
        <Text style={ProfileScreenStyles.name}>Your Name</Text>
        <Text style={ProfileScreenStyles.number}>(805) 657-0708</Text>
      </View>

      {/* Scrollable view */}
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={ProfileScreenStyles.scrollView}>
        {/* Profile statistics */}
        <View style={ProfileScreenStyles.profileStatisticsContainer}>
          <View style={ProfileScreenStyles.box}>
            <Text style={ProfileScreenStyles.numberText}>12</Text>
            <Text style={ProfileScreenStyles.smallText}>friends</Text>
          </View>
          <View style={ProfileScreenStyles.box}>
            <Text style={ProfileScreenStyles.numberText}>6</Text>
            <Text style={ProfileScreenStyles.smallText}>nights out</Text>
          </View>
          <View style={ProfileScreenStyles.box}>
            <Text style={ProfileScreenStyles.numberText}>02.15.2001</Text>
            <Text style={ProfileScreenStyles.smallText}>your special day</Text>
          </View>
        </View>

        {/* Favorite bar */}
        <View style={ProfileScreenStyles.favoriteBar}>
          <PartySvg style={ProfileScreenStyles.partySvg} />
          <View style={ProfileScreenStyles.barInfo}>
            <Text style={ProfileScreenStyles.barText}>Underground</Text>
            <Text style={ProfileScreenStyles.smallText}>
              is your favorite bar these days
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={ProfileScreenStyles.calendarView}>
          <View style={ProfileScreenStyles.calendarContainer}>
            {months.map(month => (
              <View key={month} style={ProfileScreenStyles.monthView}>
                <BottleSvg />
                <Text style={ProfileScreenStyles.monthText}>{month}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Contacts button */}
        <View style={ProfileScreenStyles.emergencyView}>
          <Pressable style={ProfileScreenStyles.emergencyPressable}>
            <Text style={ProfileScreenStyles.emergencyText}>
              See Emergency Contacts
            </Text>
          </Pressable>
        </View>

        {/* Empty space to enable scrolling */}
        <View style={ProfileScreenStyles.emptyVerical} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
