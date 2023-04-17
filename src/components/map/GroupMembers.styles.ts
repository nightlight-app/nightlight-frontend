import { StyleSheet } from 'react-native';
import { USER_CIRCLE_DIAMETER } from '@nightlight/src/constants';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  groupMembersList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberContainer: {
    marginLeft: -10,
  },
  invitedGroupMemberOverlay: {
    backgroundColor: 'black',
    opacity: 0.7,
    height: '100%',
    width: '100%',
    borderRadius: USER_CIRCLE_DIAMETER / 2,
    position: 'absolute',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 1,
  },
});
