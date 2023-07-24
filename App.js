import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './src/Navigation/Routes';
import {Provider as PaperProvider} from 'react-native-paper';
import {StripeProvider} from '@stripe/stripe-react-native';
import {ThemeContext} from './src/Constants/context';

const Stack = createNativeStackNavigator();

function App() {
  const [isDark, setIsDark] = useState(true);
  return (
    <StripeProvider
      publishableKey="pk_test_51LtqaHHGaW7JdcX6i8dovZ884aYW9wHVjPgw214lNBN19ndCHovhZa2A62UzACaTfavZYOzW1nf3uw2FHyf3U6C600GXAjc3Wh"
      merchantIdentifier="merchant.com.hellosuperstars">
      <ThemeContext.Provider value={{isDark, setIsDark}}>
        <Routes />
      </ThemeContext.Provider>
    </StripeProvider>
  );
}

export default App;
