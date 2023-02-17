import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width: '98%',
      borderColor: '#3D3D3D',
      borderWidth: 2,
      textAlign: 'center',
      borderRadius: 5,
      // height: 120,
      flexDirection: 'column',
      marginBottom: 10,
      display: 'flex'
    },
    venueTitle: {
      fontFamily: 'Comfortaa_600SemiBold',
      fontSize: 20,
      color: 'white',
      paddingLeft: 20,
      paddingTop: 20,
    },
    venueAddress: {
      fontFamily: 'Comfortaa_600SemiBold',
      fontSize: 14,
      color: 'grey',
      paddingLeft: 20,
      paddingTop: 5,
    },
    reactionView: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 5,
      paddingLeft: 20,
    },
    goButton: {
      padding: 10,
      backgroundColor: '#64A338',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#2E491B',
      borderWidth: 2,
      borderRadius: 10,
      height: 60,
      width: 70,
      marginRight: 10,
      marginBottom: 10
    },
    goButtonText: {
      color: 'white',
      fontFamily: 'Comfortaa_700Bold',
      fontSize: 26,
      paddingTop: 2,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    lowerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    reactionContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    reactionGroup: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: 18,
      paddingTop: 8,
    },
    closeButton: {
      marginTop: 16,
      marginRight: 8,
      marginLeft: 8,
      marginBottom: 16,
      height: 16,
      width: 16,
    },
    xLeft: {
      position: 'absolute',
      width: 2,
      height: 16,
      backgroundColor: 'white',
      transform: [{ rotate: '45deg' }],
    },
    xRight: {
      position: 'absolute',
      width: 2,
      height: 16,
      backgroundColor: 'white',
      transform: [{ rotate: '-45deg' }],
    },
    distanceContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingBottom: 5,
    },
    centeredText: {
      textAlign: 'center',
      color: 'grey',
    },
    goButtonSubText: {
      color: 'white',
      fontFamily: 'Comfortaa_700Bold',
      fontSize: 10,
    },
  });

  export default styles;