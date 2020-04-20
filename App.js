import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Home from './src/home'
import News from './src/news'
import Invita from './src/invita'

const baseUrl = "http://192.168.1.31:3000/";

export const apiUrls = {
  getInviti: baseUrl + 'utenti/getInviti',
  aggiungiInvito: baseUrl + 'utenti/caricaInvito',
  getInviti: baseUrl + 'utenti/getInviti'
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
//         <Stack.Screen name="Invita" component={DetailsScreen} options={{headerShown:false}}/>
//         <Stack.Screen name="Cerca" component={DetailsScreen} options={{headerShown:false}}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="News" tabBarOptions={{
          //activeTintColor: 'red',
          //inactiveTintColor: 'gray',
          activeBackgroundColor:'',
          adaptive:true,
          allowFontScaling:true,
          labelStyle:{fontSize:17, textAlign:'center', alignSelf:'center', justifyContent:'center', alignItems:'center' },
          style:{backgroundColor:'#121212',padding:10}
          
          }}>
            
      <Tab.Screen name="News" component={News} options={{ tabBarIcon: () => (
            <Ionicons name="ios-people" color={'gray'} size={30}/>
          ),}} />

      <Tab.Screen name="Invita" component={Invita}  options={{ tabBarIcon: () => (
            <Ionicons name="md-person-add" color={'gray'} size={25}/>
          ),}} />

      <Tab.Screen name="Cerca" component={DetailsScreen}  options={{ tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-search" color={'gray'} size={30}/>
          ),}} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default App;