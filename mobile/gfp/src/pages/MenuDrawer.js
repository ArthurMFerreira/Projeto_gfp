import { createDrawerNavigator } from '@react-navigation/drawer';
import Principal from './Pricipal';
import Contas from './Contas';

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
        <Drawer.Navigator>
            ScreenOptions={{
                headerStyle:{
                    backgroundColor: '#00bce1',
                    elevation: 0,
                },
                headerTintColor: '#fff',
                }}
            <Drawer.Screen name="Principal" component={Principal} />
            <Drawer.Screen name="Contas" component={Contas} />
        </Drawer.Navigator>
    );
}