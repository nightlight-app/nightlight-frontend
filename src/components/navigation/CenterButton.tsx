import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';

const CenterButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // TODO: Handle center button press
    navigation.navigate('Placeholder' as never);
  };

  return (
    <Pressable style={styles.base} onPress={handlePress}>
      <View style={styles.whiteRing} />
      <View style={styles.blueDot} />
      <MaskedView
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}
        maskElement={
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#000000',
            }}
          />
        }>
        <View style={styles.whiteNotch} />
      </MaskedView>
      <View style={styles.outline} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteRing: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  blueDot: {
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#4A86E8',
    shadowColor: '#4A86E8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  whiteNotch: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    width: 15,
    height: 35,
    borderRadius: 7.5,
    top: -10,
  },
  outline: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#141414',
  },
});

export default CenterButton;
