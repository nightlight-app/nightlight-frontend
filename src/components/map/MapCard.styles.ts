import { StyleSheet } from 'react-native';
import { COLORS, Fonts } from '@nightlight/src/global.styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    // FIXME: this causes problems on phones with home button
    bottom: 80 + 34 + 15, // TODO: navbar height + safe area bottom margin + gap
    alignSelf: 'center',
    width: 370, // TODO: do we need this?
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },
  contentContainer: {
    backgroundColor: COLORS.NIGHTLIGHT_GRAY,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '105%',
    alignSelf: 'center',
    bottom: -30,
  },
  button: {
    width: 120,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  buttonIconContainer: {
    marginRight: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: Fonts.COMFORTAA_BOLD,
    fontSize: 16,
  },
});
