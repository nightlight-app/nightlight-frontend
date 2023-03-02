import { View } from 'react-native';
import { EmergencyContactProps } from '@nightlight/src/types';
import ContactCardStyles from '@nightlight/components/profile/ContactCard.styles';
import { Text } from 'react-native';
import EllipseSvg from '@nightlight/components/svgs/EllipseSvg';
import PhoneSvg from '@nightlight/components/svgs/PhoneSvg';

const ContactCard = ({ index, name, phone }: EmergencyContactProps) => {
  let isEvenIndex = index % 2 === 0;

  return (
    <View
      style={[
        ContactCardStyles.container,
        isEvenIndex && ContactCardStyles.containerAlt,
      ]}>
      <View>
        <Text style={ContactCardStyles.name}>{name}</Text>
        <Text style={ContactCardStyles.phone}>{phone}</Text>
      </View>
      <View style={ContactCardStyles.rightView}>
        <PhoneSvg />
        <EllipseSvg />
      </View>
    </View>
  );
};

export default ContactCard;
