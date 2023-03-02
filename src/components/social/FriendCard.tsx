import ProfileScreenStyles from "@nightlight/screens/profile/ProfileScreen.styles";
import React from "react";
import { View, Image, Text } from "react-native";
import FriendCardStyles from "./FriendCard.styles";
import { FriendCardProps } from "@nightlight/src/types";
import { Ellipse } from "react-native-svg";

const FriendCard = ({name, index, inGroup}: FriendCardProps) => {
    let isEvenIndex = index % 2 !== 0;

    return(
        <View style={[FriendCardStyles.container, isEvenIndex && FriendCardStyles.containerAlt]}>
            <View style={FriendCardStyles.leftSide}>
                <Image
                source={require('@nightlight/assets/images/anon.png')}
                style={FriendCardStyles.profileImage}
                />
                <View>
                    <Text style={FriendCardStyles.name}>{name}</Text>
                    {inGroup && <Text style={FriendCardStyles.activeText}>Active 10m ago</Text>}
                </View>
            </View>
        </View>
    )
}

export default FriendCard;