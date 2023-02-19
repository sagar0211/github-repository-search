import {Text, View} from 'react-native';
import {SearchComponent} from './src/Components/Search/Search.Component';
import Styles from './App.Styles';
import LOCALES from './src/Constants/index';


function App(): JSX.Element {
  return (
    <View style={Styles.mainContainer}>
      <Text style={Styles.mainTitle}>{LOCALES.mainTitle}</Text>
      <SearchComponent />
    </View>
  );
}

export default App;
