import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [updatingLocation, setUpdatingLocation] = useState(false); // Estado para controlar a atualização da localização

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão de acesso à localização negada');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Erro ao obter a localização');
      }
    })();
  }, []);

  const updateLocation = async () => {
    setUpdatingLocation(true); // Define o estado de atualização como verdadeiro

    try {
      let newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Erro ao atualizar a localização');
    } finally {
      setUpdatingLocation(false); // Define o estado de atualização como falso após a tentativa de atualização
    }
  };

  let text = 'Aguardando...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Button
        title={updatingLocation ? 'Atualizando...' : 'Atualizar Localização'}
        onPress={updateLocation}
        disabled={updatingLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
