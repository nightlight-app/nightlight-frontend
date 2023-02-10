import React from "react";
import { View, Pressable, StyleSheet, SafeAreaView } from "react-native";
import NavIcon from "./NavIcon";
import CenterButton from "./CenterButton";
import NavbarSvg from "../../../assets/icons/NavbarSvg";

const TabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <SafeAreaView style={styles.navbarContainer}>
            <View style={styles.navbar}>
                <View style={styles.routesContainer}>
                    {state.routes.map((route: any, index: number) => {
                        // Uniquely handles the center button space
                        if (route.name == "Placeholder") {
                            return (
                                <View key={index} style={styles.centerButtonContainer}>
                                    {/* TODO: E-Button! */}
                                    <CenterButton />
                                </View>
                            );
                        }

                        // Get the label from the route
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.name;

                        // Determine if the route is focused
                        const isFocused = state.index === index;

                        // Only navigate if the route is not focused
                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <Pressable
                                key={index}
                                onPress={onPress}
                                style={{
                                    ...styles.routeButton,
                                }}
                            >
                                <NavIcon route={label} isFocused={isFocused} />
                            </Pressable>
                        );
                    })}
                </View>
                <View style={styles.backgroundSvgContainer}>
                    <NavbarSvg />
                    <View style={styles.dangerZoneFill} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navbarContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    navbar: {
        height: 80,
        width: 390,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundSvgContainer: {
        position: "absolute",
        bottom: 0,
    },
    routesContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: 1,
    },
    routeButton: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    centerButtonContainer: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        bottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    dangerZoneFill: {
        position: "absolute",
        bottom: -34,
        height: 34,
        width: "100%",
        backgroundColor: "#212121",
        borderColor: "#141414",
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
});

export default TabBar;
