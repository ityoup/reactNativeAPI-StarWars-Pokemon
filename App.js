import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const StarWarsScreen = ({ username }) => {
  const [starWarsData, setStarWarsData] = useState(null);

  const fetchStarWarsData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/1/');
      const data = await response.json();
      setStarWarsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alumno: {username}</Text>
      <Text style={styles.text}>Maestro: Miguel Lemus</Text>
      <Text style={styles.title}>Star Wars API</Text>

      <TouchableOpacity style={styles.button} onPress={fetchStarWarsData}>
        <Text style={styles.buttonText}>Consulta un personaje de Star Wars</Text>
      </TouchableOpacity>

      {starWarsData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Nombre:</Text>
          <Text style={styles.data}>{starWarsData.name}</Text>
          <Text style={styles.dataTitle}>Altura:</Text>
          <Text style={styles.data}>{starWarsData.height}</Text>
          <Text style={styles.dataTitle}>Masa:</Text>
          <Text style={styles.data}>{starWarsData.mass}</Text>
        </View>
      )}
    </View>
  );
};

const PokemonScreen = ({ username }) => {
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon API</Text>

      <TouchableOpacity style={styles.button} onPress={fetchPokemonData}>
        <Text style={styles.buttonText}>Fetch Pokemon API</Text>
      </TouchableOpacity>
      {pokemonData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Nombre:</Text>
          <Text style={styles.data}>{pokemonData.name}</Text>
          <Text style={styles.dataTitle}>Altura:</Text>
          <Text style={styles.data}>{pokemonData.height}</Text>
          <Text style={styles.dataTitle}>Peso:</Text>
          <Text style={styles.data}>{pokemonData.weight}</Text>
        </View>
      )}
    </View>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('StarWars');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleLogin = () => {
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  const handleRegister = () => {
    if (username !== '' && password !== '') {
      const userExists = registeredUsers.some(user => user.username === username);
      if (userExists) {
        setErrorMessage('El usuario ya existe');
      } else {
        const newUser = { username, password };
        setRegisteredUsers([...registeredUsers, newUser]);
        setErrorMessage('');
      }
    } else {
      setErrorMessage('Por favor, complete todos los campos');
    }
  };

  const renderPage = () => {
    if (currentPage === 'StarWars') {
      return <StarWarsScreen username={username} />;
    } else if (currentPage === 'Pokemon') {
      return <PokemonScreen username={username} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View>
          <Text style={styles.title}>Ingrese sus credenciales:</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Iniciar sesión" onPress={handleLogin} />
          <Button title="Registrarse" onPress={handleRegister} />
          {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
      )}
      {isLoggedIn && (
        <View>
          <Text style={styles.welcomeMessage}>Bienvenido, {username}!</Text>
          {renderPage()}
          <View style={styles.buttonContainer}>
            <Button title="Star Wars" onPress={() => setCurrentPage('StarWars')} />
            <Button title="Pokemon" onPress={() => setCurrentPage('Pokemon')} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  dataContainer: {
    marginTop: 10,
  },
  dataTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
