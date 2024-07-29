import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import ToastifyContainer from 'toastify-react-native';

import Home from './src/screens/Home';
import CellFood from './src/screens/sensors/CellFoodData';
import CellWeight from './src/screens/sensors/CellWeightData';
import PHsensor from './src/screens/sensors/PHsensorData';
import RFID from './src/screens/sensors/RfidData';
import FoodLevel from './src/screens/sensors/UltrasonicData';
import WaterLevel from './src/screens/sensors/WaterSensorData';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'CellFood') {
              iconName = 'restaurant';
            } else if (route.name === 'CellWeight') {
              iconName = 'barbell';
            } else if (route.name === 'PHsensor') {
              iconName = 'water';
            } else if (route.name === 'RFID') {
              iconName = 'key';
            } else if (route.name === 'FoodLevel') {
              iconName = 'nutrition';
            } else if (route.name === 'WaterLevel') {
              iconName = 'water';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="CellFood" component={CellFood} />
        <Tab.Screen name="CellWeight" component={CellWeight} />
        <Tab.Screen name="PHsensor" component={PHsensor} />
        <Tab.Screen name="RFID" component={RFID} />
        <Tab.Screen name="FoodLevel" component={FoodLevel} />
        <Tab.Screen name="WaterLevel" component={WaterLevel} />
      </Tab.Navigator>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
