import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from './screens';

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {screens.map((props, index) => (
          <Stack.Screen key={`index-${index}`} {...props} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
