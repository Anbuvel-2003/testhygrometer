import "./global.css";
import React, { useEffect } from 'react';
import {  Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { requestAllPermissions } from './src/utils/permissions';

function App() {
   const handlePermissions = async () => {
    const results = await requestAllPermissions();  
    // Alert.alert('Permissions', JSON.stringify(results, null, 2));
  };
  useEffect(() => {
    handlePermissions();
  },[])
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
      </View>
    </SafeAreaView>
  );
}

export default App;