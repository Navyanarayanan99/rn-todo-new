import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodo from './src/AddTodo';
import CreateTodo from './src/CreateTodo';
import UpdateScreen from './src/UpdateTodo';
import { Image, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AddTodo" component={AddTodo} />
        <Stack.Screen name="CreateTodo" component={CreateTodo} />
        <Stack.Screen name="UpdateTodo" component={UpdateScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;