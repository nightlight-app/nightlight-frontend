import { StyleSheet } from 'react-native';

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
