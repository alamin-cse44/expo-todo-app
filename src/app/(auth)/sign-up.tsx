import { useSignUp } from "@clerk/expo";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function SignUp() {
  const {signUp, errors, fetchStatus} = useSignUp()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled" 
    > 
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-3xl font-bold text-gray-800 mb-10">
          Create Account
        </Text>

        <View className="flex-row gap-3 mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            placeholder="First Name"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Last Name"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
    </ScrollView>
  );
}
