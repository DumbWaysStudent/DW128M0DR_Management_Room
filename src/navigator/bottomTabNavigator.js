import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator }  from 'react-navigation-tabs';
import {Icon} from 'native-base';

import Checkin from '../screens/mainScreens/checkin'
import Room from '../screens/mainScreens/room'
import Customer from '../screens/mainScreens/customer'
import Setting from '../screens/mainScreens/setting'

const BottomTabNavigator = createBottomTabNavigator({
    Checkin: {
      screen: Checkin,
      navigationOptions:{
        tabBarLabel: "Checkin",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="Ionicons" name="checkmark-circle" style={{color:tintColor}}/>
        )
      }
    },
    Room: {
        screen: Room,
        navigationOptions:{
          tabBarLabel: 'Rooms',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="Ionicons" name="bed" style={{color:tintColor}}/>
          )
        }
    },
    Customer: {
        screen: Customer,
        navigationOptions:{
          tabBarLabel: 'Customers',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="Ionicons" name="people" style={{color:tintColor}}/>
          )
        }
    },
    Setting: {
      screen: Setting,
      navigationOptions:{
        tabBarLabel: 'Setting',
        tabBarIcon: ({ tintColor }) => {
          return <Icon type="Ionicons" name="settings" style={{color:tintColor}}/>
      }
      }
  }
}, {
    tabBarOptions: {
      activeTintColor: '#FFF',
      inactiveTintColor:'#FDE',
      style: {
        backgroundColor: '#ffafb0',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.5,
        elevation: 5
      }
    },
  },
)
export default createAppContainer(BottomTabNavigator);