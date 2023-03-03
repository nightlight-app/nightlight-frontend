import { TouchableOpacity, View, Alert } from 'react-native';
import { EmergencyContactProps as ContactCardProps } from '@nightlight/src/types';
import ContactCardStyles from '@nightlight/components/profile/ContactCard.styles';
import { Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@nightlight/src/global.styles';
import { formatPhoneNumber } from '@nightlight/src/utils/utils';

const ContactCard = ({
  name,
  phone,
  isFirstItem,
  isLastItem,
}: ContactCardProps) => {
  const handleCall = (phone: string) => {
    Alert.alert('TODO: Calling', phone);
  };

  const handleEdit = () => {
    Alert.alert('TODO: Editing', name);
  };

  return (
    <View
      style={[
        ContactCardStyles.contactContainer,
        isFirstItem && ContactCardStyles.contactTopItem,
        isLastItem && ContactCardStyles.contactBottomItem,
      ]}>
      <View>
        <Text style={ContactCardStyles.name}>{name}</Text>
        <Text style={ContactCardStyles.phone}>{formatPhoneNumber(phone)}</Text>
      </View>
      <View style={ContactCardStyles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => handleCall(phone)}
          activeOpacity={0.75}
          style={ContactCardStyles.button}>
          <FontAwesome name='phone' size={24} color={COLORS.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEdit}
          activeOpacity={0.75}
          style={ContactCardStyles.button}>
          <FontAwesome name='pencil' size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactCard;
