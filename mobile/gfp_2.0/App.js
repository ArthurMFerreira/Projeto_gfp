import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import MenuDrawer from './src/pages/MenuDrawer';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar barStyle="light-content" />
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#3498db',
						elevation: 0, // Remove a sombra no Android                    
					},
					headerTintColor: '#fff',
				}}>
				<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
				<Stack.Screen name="MenuDrawer" component={MenuDrawer}	options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}