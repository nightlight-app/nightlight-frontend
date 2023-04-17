import { StyleSheet } from 'react-native';
import {
  USER_CIRCLE_DIAMETER,
  DISPLAYED_GROUP_MEMBERS_LIMIT,
} from '@nightlight/src/constants';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

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
  additionalMembersCountContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    height: USER_CIRCLE_DIAMETER * 0.75,
    width: USER_CIRCLE_DIAMETER * 0.75,
    borderRadius: USER_CIRCLE_DIAMETER / 2,
    borderColor: COLORS.NIGHTLIGHT_BLACK,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
    zIndex: -DISPLAYED_GROUP_MEMBERS_LIMIT,
  },
  additionalMembersCount: {
    color: COLORS.GRAY,
    fontFamily: Fonts.COMFORTAA_BOLD,
    textAlign: 'center',
    fontSize: 14,
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
