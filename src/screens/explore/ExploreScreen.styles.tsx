import { StyleSheet } from "react-native";

import {
    useFonts,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  } from "@expo-google-fonts/comfortaa";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
      },
    title: {
        position: 'absolute',
        fontFamily: "Comfortaa_400Regular",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 24,
        color: '#FFFFFF',
        top: '8%'
    },
    trending: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '97%',
        height: '35%',
        top: '17%',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#E07324',
        borderWidth: 1,
        justifyContent:'space-evenly'
    },
    seeMore: {
        width: '95%',
        height: '8%',
        backgroundColor: '#3D3D3D',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    seeMoreText: {
        fontFamily: "Comfortaa_400Regular",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 12,
        color: 'rgba(144, 144, 144, 1)',
    },
    barContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '97%',
        alignItems: 'center',
        top: '53%'
    },
    search: {
        position: 'absolute',
        width: '93%',
        height: '4%',
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        top: '12%'
    },
    searchText: {
    fontFamily: "Comfortaa_400Regular",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    color: '#A0A0A0',
    marginLeft: 10
    }
  });

export default styles;