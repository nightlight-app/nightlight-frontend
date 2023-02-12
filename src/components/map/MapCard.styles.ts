import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 127,
    alignSelf: 'center',
    width: 369,
  },
  contentContainer: {
    backgroundColor: '#212121',
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
  cardBottom: {
    bottom: 0,
  },
});
