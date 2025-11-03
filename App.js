import "./global.css";
import React, { useEffect } from 'react';
import {  Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { requestAllPermissions } from './src/utils/permissions';
import CalendarScreen from './src/CalendarScreen';

function App() {
  //  const handlePermissions = async () => {
  //   const results = await requestAllPermissions();  
  //   console.log('All permission results:', results);
    
  //   // Alert.alert('Permissions', JSON.stringify(results, null, 2));
  // };
  // useEffect(() => {
  //   handlePermissions();
  // },[])
  const handleAppleLogin = async () => {
    try {
      const user = await signInWithApple();
      Alert.alert('Apple Sign-In', `Welcome ${user?.email || 'User'}`);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log(error);
      
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-blue-100 ">
      <View className="flex-1 items-center justify-center">
        <View className="bg-white p-6 rounded-xl shadow-lg">
          <Text className="text-3xl font-bold text-blue-600 mb-2">
            NativeWind v4 🎉
          </Text>
          <Text className="text-gray-600 text-center">
            Tailwind CSS is working!
          </Text>
        </View>
        <View>
          <Pressable className="bg-red-300 w-screen p-5 mt-10 items-center "
            onPress={handleAppleLogin}
          >
            <Text>Apple ID</Text>
          </Pressable>
          <Pressable className="bg-red-300 w-screen p-5 mt-10 items-center "
            onPress={handleAppleLogin}
          >
            <Text>chart implement</Text>
          </Pressable>
        </View>
        <View>
          {/* <CalendarScreen/> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;