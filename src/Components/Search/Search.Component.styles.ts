import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#222222',
    margin: 24,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  textInputContainer: {color: '#222222', fontSize: 16, fontWeight: '500'},
  buttonContainerView: {flexDirection: 'row', justifyContent: 'space-evenly'},
  buttonCommonStyle: {
    alignSelf: 'center',
    width: 120,
    height: 40,
    borderRadius: 8,
    borderColor: '#222222',
    borderWidth: 1,
    marginBottom: 12,
  },
  buttonTextStyle: {
    padding: 8,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  paginationMainContainerView: {
    alignSelf: 'flex-end',
    borderRadius: 14,
    borderColor: '#222222',
    margin: 12,
  },
  paginationSubContainerView: {flexDirection: 'row'},
  paginationTextStyle: {
    padding: 4,
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sortUiMainContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  sortUiSubContainerView: {
    width: '50%',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sortTitleText: {color: 'white', padding: 5},
  sortDropdownStyle: {backgroundColor: 'white', marginBottom: 12},
});
