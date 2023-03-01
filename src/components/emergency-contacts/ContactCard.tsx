import { Pressable, View } from 'react-native';
import { EmergencyContactProps } from '@nightlight/src/types';
import ContactCardStyles from './ContactCard.styles';
import { Text } from 'react-native';
import EllipseSvg from '../svgs/EllipseSvg';
import PhoneSvg from '../svgs/PhoneSvg';

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
