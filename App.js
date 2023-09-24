import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Todolist from './components/Todolist/Todolist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  // const [auth,setAuth]= React.useState(false)
  const Stack = createNativeStackNavigator()
  
  // React.useEffect(async()=>{
  //   let token = JSON.parse(AsyncStorage.getItem('token'))
  //   if(token){
  //     setAuth(true)
  //   }else{
  //     setAuth(false)
  //   }
  // },[])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="login" component={Login} /> */}
        <Stack.Screen name="Todolist" component={Todolist} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
