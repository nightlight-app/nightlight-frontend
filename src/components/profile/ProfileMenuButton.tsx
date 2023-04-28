import { TouchableOpacity, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ProfileMenuButtonStyles from '@nightlight/components/profile/ProfileMenuButton.styles';
import { ProfileMenuButtonProps } from '@nightlight/src/types';
import { COLORS } from '@nightlight/src/global.styles';

const ProfileMenuButton = ({
  icon,
  text,
  onPress,
  isFirstItem,
  isLastItem,
}: ProfileMenuButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        ProfileMenuButtonStyles.container,
        isFirstItem && ProfileMenuButtonStyles.topItem,
        isLastItem && ProfileMenuButtonStyles.bottomItem,
      ]}>
      {icon && (
        <View style={ProfileMenuButtonStyles.iconContainer}>{icon}</View>
      )}
      <Text style={ProfileMenuButtonStyles.text}>{text}</Text>
      <AntDesign name='right' size={24} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

export default ProfileMenuButton;
