import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from "../helpers/constants";
import OnBoardScreen from "../page/home/OnBoardScreen";
import TabNavigation from "./tab";
import LoginPage from "../page/home/Login";
import RegisterPage from "../page/home/Register";
import DetailsScreen from "../page/detail/DetailScreen";
import SearchPage from "../page/home/SearchPage";
import CartFood from "../page/home/cartFood";

const LoginStack = createNativeStackNavigator()
const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator screenOptions={{headerShown:false}}>
      <LoginStack.Screen name={SCREENS.LOGIN} component={LoginPage} />
      <LoginStack.Screen name={SCREENS.REGISTER} component={RegisterPage} />
    </LoginStack.Navigator>
  )
}

const Stack = createNativeStackNavigator()
//Stack: Login, Register, một stack là component tab navigator
const Navigation = () => {
    return (
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown:false}} >
                <Stack.Screen name={SCREENS.ONBOARD} component={OnBoardScreen}/>
                <Stack.Screen name="Auth" component={LoginStackScreen}/>
                <Stack.Screen name="Home" component={TabNavigation}/>
                <Stack.Screen name={SCREENS.DETAIL} component={DetailsScreen} />   
                <Stack.Screen name="Search" component={SearchPage}/>
                <Stack.Screen name="Cart" component={CartFood}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;