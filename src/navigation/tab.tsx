import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import FoodHome from "../page/home/FoodHome";
import CartFood from "../page/home/cartFood";
import SetScreen from "../page/home/Setting";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "defaultIconName";
          if (route.name === "HomeFood") {
            iconName = "home";
          } else if (route.name === "CartFood") {
            iconName = "shopping-cart";
          } else if (route.name === "Setting") {
            iconName = "gear";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="HomeFood"
        component={FoodHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartFood"
        component={CartFood}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SetScreen}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
