import { USER_CIRCLE_DIAMETER } from '@nightlight/src/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    top: 10,
    left: 10,
    flexDirection: 'row',
  },
  userList: {
    maxWidth: 150,
    flexDirection: 'row',
  },
  userCircleTouchable: {
    borderRadius: USER_CIRCLE_DIAMETER / 2,
  },
  addMember: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 1,
  },
});
