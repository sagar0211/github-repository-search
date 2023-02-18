import {Text, View} from 'react-native';
import {SearchComponent} from './src/Components/Search/Search.Component';

function App(): JSX.Element {
  return (
    <View style={{flex: 1,padding:24,backgroundColor: '#0d1117'}}>
      <Text
        style={{
          fontSize: 28,
          textAlign: 'center',
          color: '#FFFFFF',
          fontWeight: 'bold',
        }}>
        Github Repository Search
      </Text>
      <SearchComponent />
    </View>
  );
}

export default App;
