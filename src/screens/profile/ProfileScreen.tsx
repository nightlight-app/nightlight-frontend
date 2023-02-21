import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';
import ProfileScreenStyles from '@nightlight/screens/profile/ProfileScreen.styles';
import PartySvg from '@nightlight/components/svgs/PartySvg';
import BottleSvg from '@nightlight/components/svgs/BottleSvg';
import PencilSvg from '@nightlight/components/svgs/PencilSvg';
import SettingsSvg from '@nightlight/components/svgs/SettingsSvg';
import PhotoSvg from '@nightlight/components/svgs/PhotoSvg';
import { Route } from '@nightlight/src/types';

type MonthProps = {
  month: string;
};

const Month = (props: MonthProps) => {
  return (
    <View style={ProfileScreenStyles.monthView}>
      <BottleSvg style={ProfileScreenStyles.bottleSVG}></BottleSvg>
      <Text style={ProfileScreenStyles.monthText}>{props.month}</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView testID={Route.PROFILE} style={ProfileScreenStyles.container}>
      <ImageBackground
        source={require('@nightlight/assets/images/image1.png')}
        style={ProfileScreenStyles.backgroundImage}
      />
      <Image
        source={require('@nightlight/assets/images/anon.png')}
        style={ProfileScreenStyles.profileImage}
      />
      <PencilSvg style={ProfileScreenStyles.pencilSVG}></PencilSvg>
      <SettingsSvg style={ProfileScreenStyles.settingsSVG}></SettingsSvg>
      <PhotoSvg style={ProfileScreenStyles.photoSvg}></PhotoSvg>
      <Text style={ProfileScreenStyles.name}>Your Name</Text>
      <Text style={ProfileScreenStyles.number}>(805) 657-0708</Text>
      <View style={ProfileScreenStyles.profileImage}></View>
      <View style={ProfileScreenStyles.profileInfo}>
        <View style={ProfileScreenStyles.box}>
          <Text style={ProfileScreenStyles.numberText}>12</Text>
          <Text style={ProfileScreenStyles.smallText}>friends</Text>
        </View>
        <View style={ProfileScreenStyles.box}>
          <Text style={ProfileScreenStyles.numberText}>6</Text>
          <Text style={ProfileScreenStyles.smallText}>nights out</Text>
        </View>
        <View style={ProfileScreenStyles.box}>
          <Text style={ProfileScreenStyles.bdayText}>02.15.2001</Text>
          <Text style={ProfileScreenStyles.smallerText}>your special day</Text>
        </View>
      </View>
      <View style={ProfileScreenStyles.favoriteBar}>
        <PartySvg style={ProfileScreenStyles.svg}></PartySvg>
        <View>
          <Text style={ProfileScreenStyles.barText}>Underground</Text>
          <Text style={ProfileScreenStyles.alternativeSmallText}>
            is your favorite bar these days
          </Text>
        </View>
      </View>
      <View style={ProfileScreenStyles.calendarView}>
        <Month month='Jan'></Month>
        <Month month='2'></Month>
        <Month month='3'></Month>
        <Month month='4'></Month>
        <Month month='5'></Month>
        <Month month='6'></Month>
        <Month month='7'></Month>
        <Month month='8'></Month>
        <Month month='9'></Month>
        <Month month='10'></Month>
        <Month month='11'></Month>
        <Month month='Dec'></Month>
      </View>
      <View style={ProfileScreenStyles.button}>
        <Button color={'white'} title='View Emergency Contacts' />
      </View>
      <View style={ProfileScreenStyles.emergencyView}></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
