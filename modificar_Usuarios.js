import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewScreen = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modifiedData, setModifiedData] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/react/user/show')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
    setModifiedData(users.find(user => user.id === userId)?.nombre || '');
  };
  
  

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };
  
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModifiedData('');
    setSelectedUserId('');
  };

  const handleSaveData = () => {
    if (selectedUserId && modifiedData) {
      fetch(`http://localhost:3000/react/user/update/${selectedUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedUserId,
          nombre: modifiedData
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Usuario modificado:', data);
          handleModalClose();
        })
        .catch(error => {
          console.error('Error al modificar el usuario:', error);
          handleModalClose();
        });
    }
  };
  
  
  
  const deleteUser = (userId) => {
    fetch(`http://localhost:3000/react/user/delete/${userId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuario eliminado:', data);
        // Realizar otra solicitud para obtener la lista actualizada de usuarios
        fetch('http://localhost:3000/react/user/show')
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data)) {
              setUsers(data);
            }
          })
          .catch(error => {
            console.error('Error al obtener los usuarios:', error);
          });
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };
  
  
  
  
  
  

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.nombre}</Text>
      <Text style={styles.userId}>ID: {item.id}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEditUser(item.id)}>
          <Ionicons
            name="pencil-outline"
            size={24}
            color="blue"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
  <Ionicons
    name="trash-outline"
    size={24}
    color="red"
  />
</TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios:</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Modificar usuario</Text>
          <TextInput
  style={styles.input}
  placeholder="Modificar nombre"
  value={modifiedData}
  onChangeText={setModifiedData}
  name="nombre" // Agrega esta línea
/>
          <Button title="Guardar" onPress={handleSaveData} />
          <Button title="Cancelar" onPress={handleModalClose} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    marginBottom: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    flex: 1,
    fontSize: 16,
  },
  userId: {
    fontSize: 12,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default NewScreen;
