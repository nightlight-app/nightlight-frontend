import { Pressable, View } from 'react-native';
import { EmergencyContactProps } from '@nightlight/src/types';
import ContactCardStyles from '@nightlight/components/emergency-contacts/ContactCard.styles';
import { Text } from 'react-native';
import EllipseSvg from '@nightlight/components/svgs/EllipseSvg';
import PhoneSvg from '@nightlight/components/svgs/PhoneSvg';

const ContactCard = (Props: EmergencyContactProps) => {
  let index = Props.index;

  if (index % 2 == 0) {
    return (
      <View style={ContactCardStyles.container1}>
        <View>
          <Text style={ContactCardStyles.name}>{Props.name}</Text>
          <Text style={ContactCardStyles.phone}>{Props.phone}</Text>
        </View>
        <View style={ContactCardStyles.rightView}>
          <PhoneSvg />
          <EllipseSvg />
        </View>
      </View>
    );
  } else {
    return (
      <View style={ContactCardStyles.container2}>
        <View>
          <Text style={ContactCardStyles.name}>{Props.name}</Text>
          <Text style={ContactCardStyles.phone}>{Props.phone}</Text>
        </View>
        <View style={ContactCardStyles.rightView}>
          <PhoneSvg />
          <EllipseSvg />
        </View>
      </View>
    );
  }
};

export default ContactCard;
