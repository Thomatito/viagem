import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc  } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [nome, setNome] = useState("");
  // const [logradouro, setLogradouro] = useState("");
  // const [cep, setCep] = useState("");
  // const [cidade, setCidade] = useState("");
  // const [estado, setEstado] = useState("");
  const [erro, setErro] = useState({
    email: false,
    senha: false,
    repetirSenha: false,
    nome: false,
    // cep: false,
    // cidade: false,
    // estado: false,
  });
 

  function realizaRegistro() {
    console.log("Fazer Registro");

    if (nome === "") {
      setErro({ ...erro, nome: true });
      return;
    }
    setErro({ ...erro, nome: false });
    if (email === "") {
      setErro({ ...erro, email: true });
      return;
    }
    setErro({ ...erro, email: false });
    if (senha === "") {
      setErro({ ...erro, senha: true });
      return;
    }
    setErro({ ...erro, senha: false });
    if (repetirSenha === "") {
      setErro({ ...erro, repetirSenha: true });
      return;
    }
    // setErro({ ...erro, repetirSenha: false });
    // if (cep === "") {
    //   setErro({ ...erro, cep: true });
    //   return;
    // }
    // setErro({ ...erro, cep: false });
    // if (cidade === "") {
    //   setErro({ ...erro, cidade: true });
    //   return;
    // }
    // setErro({ ...erro, cidade: false });
    // if (estado === "") {
    //   setErro({ ...erro, estado: true });
    //   return;
    // }
    setErro({ ...erro, estado: false });

    if (senha !== repetirSenha) {
      setErro({ ...erro, senha: true, repetirSenha: true });
      return;
    }
    setErro({ ...erro, senha: false, repetirSenha: false });

    cadastrarNoFirebase();

    
  }

  async function cadastrarNoFirebase() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;
      console.log("Usuário cadastrado", user);

      const collectionRef = collection(db, "usuarios");
      
      const docRef = await setDoc(doc(collectionRef,user.uid),
      {
        nome: nome,
        email: email,
        senha: senha,
        // logradouro: logradouro,
        // cep: cep,
        // cidade: cidade,
        // estado: estado,
      }
      );

      navigation.navigate("LoginScreen");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email já está cadastrado.");
      } else {
        setErrorMessage("Erro ao cadastrar usuário: " + error.message);
      }
      showModal();
    }
  }

  // function buscaCEP() {
  //   console.log("Busca CEP");
  //   let cepLimpo = cep.replace("-", "").trim();
  //   if (cepLimpo.length < 8) return;
  //   fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
  //     .then((res) => res.json()) 
  //     .then((dados) => {
     
  //       console.log(dados);
  //       setLogradouro(dados.logradouro);
  //       setCidade(dados.localidade);
  //       setEstado(dados.uf);
  //     })
  //     .catch((erro) => {
  
  //       console.error(erro);
  //       setErro("CEP não encontrado");
  //     });
  // }

  return (
    <Surface>
      <View>
        <Text variant="headlineSmall">Faça seu Registro</Text>
        <TextInput
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        
          error={erro.nome}
        />
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
         
          error={erro.email}
        />
        <TextInput
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
       
          error={erro.senha}
        />
        <TextInput
          placeholder="Repita sua senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          secureTextEntry
       
          error={erro.repetirSenha}
        />
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          
         
          </View>
        </View>
        <Button onPress={realizaRegistro} mode="outlined">
          Registrar
        </Button>
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          Voltar ao login
        </Button>
 
    </Surface>
  );
}
