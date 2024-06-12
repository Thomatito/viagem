import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Image } from "expo-image";
 
export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const handleLogin = () => { signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) =>
     { navigation.navigate('News');
     }) .catch((error) => {
         setError(error.message);
         });
     };
return (
     <View>

<Image
      
      source={require("../img/viagem.png")}
      style={{ width: 550, height: 200 }}
    />


        <TextInput placeholder="Email" value={email}
        onChangeText={setEmail} />
        <TextInput placeholder="Password" value={password}
        onChangeText={setPassword} secureTextEntry />
 
        <Button title="Login" onPress={handleLogin} />
        {error ? <Text>{error}</Text> : null}
 
        <Button title="Cadastro" onPress={() => navigation.navigate("RegisterScreen")} />
       
 
       
        </View>
        );
    }