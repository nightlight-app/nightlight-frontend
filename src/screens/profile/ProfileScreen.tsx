import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Image,
} from 'react-native';
import Svg, { type SvgProps, Path } from 'react-native-svg';
import PartySvg from '../../../src/components/svgs/PartySvg';
import BottleSvg from '../../../src/components/svgs/BottleSvg';
import PencilSvg from '../../../src/components/svgs/PencilSvg';
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import SettingsSvg from '../../components/svgs/SettingsSvg';
import PhotoSvg from '../../components/svgs/PhotoSvg';

interface ISvgProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    position: 'absolute',
    height: '8%',
    top: '38%',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  secondRow: {
    position: 'absolute',
    height: '8%',
    top: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '45%',
    left: 0,
    top: 0,
  },
  profileImage: {
    position: 'absolute',
    resizeMode: 'contain',
    top: '11%',
    border: '3px solid #FFFFFF',
    // filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: (Dimensions.get('window').width * 0.5) / 1.5,
    height: (Dimensions.get('window').width * 0.5) / 1.5,
  },
  name: {
    position: 'absolute',
    alignItems: 'center',
    top: '30%',
    fontFamily: 'Comfortaa_400Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 27,
    display: 'flex',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  number: {
    position: 'absolute',
    top: '34%',
    fontFamily: 'Comfortaa_400Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    display: 'flex',
    textAlign: 'center',
    color: '#A6A6A6',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  emergencyView: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: 242,
    top: 700,
    backgroundColor: '#141414',
    // box-shadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    top: 250,
    backgroundColor: '#4A86E8',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  buttonText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  numberText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'white',
  },
  bdayText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'white',
    top: '15%',
  },
  smallText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  smallerText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'rgba(255, 255, 255, 0.4)',
    top: '25%',
  },
  alternativeSmallText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'rgba(255, 255, 255, 0.4)',
    top: '5%',
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
  box1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  favoriteBar: {
    position: 'absolute',
    width: '90%',
    height: '10%',
    top: '50%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  barText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'white',
  },
  svg: {
    // flex: 1,
  },
  calendarView: {
    position: 'absolute',
    // backgroundColor: '#141414',
    width: '90%',
    height: '15%',
    top: '60%',
    display: 'flex',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  monthView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'white',
    flex: 2,
  },
  bottleSVG: {
    flex: 1,
  },
  pencilSVG: {
    left: '44%',
    top: '-21%',
  },
  settingsSVG: {
    left: '44%',
    top: '-42%',
  },
  photoSvg: {
    right: '46%',
    top: '-31%',
  },
});

type MonthProps = {
  month: string;
};
const Month = (props: MonthProps) => {
  return (
    <View style={styles.monthView}>
      <BottleSvg style={styles.bottleSVG}></BottleSvg>
      <Text style={styles.monthText}>{props.month}</Text>
    </View>
  );
};

const ProfileScreen = () => {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
  });
  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/image1.png')}
          style={styles.backgroundImage}
        />
        <Image
          source={require('../../assets/images/anon.png')}
          style={styles.profileImage}
        />
        <PencilSvg style={styles.pencilSVG}></PencilSvg>
        <SettingsSvg style={styles.settingsSVG}></SettingsSvg>
        <PhotoSvg style={styles.photoSvg}></PhotoSvg>
        <Text style={styles.name}>Your Name</Text>
        <Text style={styles.number}>(805) 657-0708</Text>
        <View style={styles.profileImage}></View>
        <View style={styles.profileInfo}>
          <View style={styles.box}>
            <Text style={styles.numberText}>12</Text>
            <Text style={styles.smallText}>friends</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.numberText}>6</Text>
            <Text style={styles.smallText}>nights out</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.bdayText}>02.15.2001</Text>
            <Text style={styles.smallerText}>your special day</Text>
          </View>
        </View>
        <View style={styles.favoriteBar}>
          <PartySvg style={styles.svg}></PartySvg>
          <View>
            <Text style={styles.barText}>Underground</Text>
            <Text style={styles.alternativeSmallText}>
              is your favorite bar these days
            </Text>
          </View>
        </View>
        <View style={styles.calendarView}>
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
        <View style={styles.button}>
          <Button color={'white'} title='View Emergency Contacts' />
        </View>
        <View style={styles.emergencyView}></View>
      </View>
    );
  }
};

export default ProfileScreen;
