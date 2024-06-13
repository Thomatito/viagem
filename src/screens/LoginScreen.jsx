import React, { useState } from 'react';
import { View} from 'react-native';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Image } from "expo-image";
import { styles } from "../config/styles";
import { Surface, TextInput, Button, Text  } from 'react-native-paper'
 
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
     <Surface style={styles.container} >

    <Image
      style={styles.image}
      source={require("../img/viagem.png")}
       />

        <Text style={styles.titulo}>Bem vindo ao Viagens!</Text>
        <TextInput style={styles.input} placeholder="Email" value={email}
        onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" value={password}
        onChangeText={setPassword} secureTextEntry />
 
        <Button style={styles.button} onPress={handleLogin} >Login</Button>
        {error ? <Text>{error}</Text> : null}
 
        <Button  style={styles.button} onPress={() => navigation.navigate("RegisterScreen")}>Cadastro</Button>
       
 
       
        </Surface>
        );
    }