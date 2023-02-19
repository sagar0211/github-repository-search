import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: 24,
    marginVertical: 8,
    backgroundColor: '#FCFCFC',
    borderRadius: 18,
  },
  subContainer: {margin: 8},
  imageContainer: {
    alignSelf: 'center',
    backgroundColor: '#E7F4FF',
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  dataContainerView: {width: '65%'},
  textContainerView: {flexDirection: 'row'},
  textTitleKey: {fontSize: 14, fontWeight: 'bold'},
  textTitleValue: {fontSize: 14},
  notFound:{color: 'red'}
});
