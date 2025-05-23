import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/login";
import MenuDrawer from "./src/pages/MenuDrawer";
import { StatusBar } from "expo-status-bar";
import CadContas from "./src/pages/CadContas";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar>
                  ScreenOptions={{
                headerStyle:{
                    backgroundColor: '#00bce1',
                    elevation: 0,
                },
                headerTintColor: '#fff',
                }}
      </StatusBar>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} 
        options={{ headerShown: false }}/>
      </Stack.Navigator>
      <Stack.Screen name="CadContas" component={CadContas}
      options={{ title: 'Cadastro de Contas' }}/>      
    </NavigationContainer>
  );
}
