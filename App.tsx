/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './src/locales/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation';

function App() {
  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  );
}

export default App;
