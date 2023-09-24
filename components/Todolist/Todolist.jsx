import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Modal,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addTaskSchema } from '../common/schema'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

const Todolist = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [taskData, setData] = useState([])
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTaskSchema),
  })

  const onSubmit = async (value) => {
    let token = await AsyncStorage.getItem('token')
    let email = await AsyncStorage.getItem('email')
    try {
      const payload = {
        email: JSON.parse(email),
        ...value,
      }
      let config = {
        headers: {
          Authorization: JSON.parse(token),
        },
      }
      const url = `http://192.168.0.182:2000/task/create`
      const rep = await axios.post(url, payload, config)
      if (rep) {
        setModalVisible(!modalVisible)
        task()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdate = async (value) => {
    let token = await AsyncStorage.getItem('token')
    try {
      const payload = {
        status: 1,
      }
      let config = {
        headers: {
          Authorization: JSON.parse(token),
        },
      }
     
      const url = `http://192.168.0.182:2000/task/update/${value?._id}`
      const rep = await axios.put(url, payload, config)
      if (rep) {
        task()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = async (value) => {
    let token = await AsyncStorage.getItem('token')
    try {
      const payload = {}
      let config = {
        headers: {
          Authorization: JSON.parse(token),
        },
      }

      const url = `http://192.168.0.182:2000/task/delete/${value?._id}`
      const rep = await axios.delete(url, payload, config)
      if (rep) {
        task()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const task = async () => {
    const token = await AsyncStorage.getItem('token')
    setLoading(true)
    try {
      let config = {
        headers: {
          Authorization: JSON.parse(token),
        },
      }

      const payload = {}
      const url = `http://192.168.0.182:2000/task/list`
      const resp = await axios.post(url, payload, config)
      if (resp.status === 200) {
        setLoading(false)
        setData(resp?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    task()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.scetionTitle}>Today</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!modalVisible)
          }}
        >
          <View style={addTask.centeredView}>
            <View style={addTask.modalView}>
              <Icon
                name="close"
                size={20}
                color="red"
                style={{ marginRight: 10 }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  clearErrors()
                }}
              />
              
              <Text style={addTask.modalText}>Add Task!</Text>

              <View style={addTask.container}>
                <Text style={addTask.label}>Enter Title</Text>
                <TextInput
                  {...register('title')}
                  style={addTask.input}
                  onChangeText={(title) => {
                    setValue('title', title)
                    clearErrors('title')
                  }}
                  value={watch('title')}
                  placeholder="Enter Title"
                />
                {errors.title && <Text style={addTask.error}>{errors?.title?.message}</Text>}

                <Text style={addTask.label}>Enter Description</Text>
                <TextInput
                  {...register('description')}
                  style={{ borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 1 }}
                  onChangeText={(description) => {
                    setValue('description', description)
                    clearErrors('description')
                  }}
                  value={watch('description')}
                  placeholder="Enter Description"
                />
                {errors.description && (
                  <Text style={addTask.error}>{errors?.description?.message}</Text>
                )}
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Add Task"
                    color="blue"
                    style={{ width: '50px', marginTop: 20 }}
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[addTask.button, addTask.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={addTask.textStyle}>Add Task</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
        {!loading &&
          taskData.map((list) => {
            return (
              <>
                <View style={styles.items}>
                  <Text style={styles.itemText}>{list?.title}</Text>
                  <View style={styles.subItems}>
                    <Icon
                      name="trash"
                      size={20}
                      color="red"
                      style={{ marginRight: 5, marginTop: 4 }}
                      onPress={() => onDelete(list)}
                    />
                    {list.status === 0 ? (
                      <Button
                        title="pending"
                        style={{ marginLeft: 5 }}
                        onPress={() => onUpdate(list)}
                      />
                    ) : (
                      <Text style={{ color: 'green' }}>Complete</Text>
                    )}
                  </View>
                </View>
              </>
            )
          })}
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  scetionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    
  },
  subItems: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'wrap',
  },
})
const addTask = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    border: 1,
    borderColor: 'black',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    border: 1,
    borderColor: 'black',
  },
  centeredView: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  error: {
    color: 'red',
  },
  input: {
    height: 40,
    marginTop: 5,
    borderWidth: 1,
    padding: 8,
    borderRadius: 1,
  },
  label: {
    marginTop: 10,
    marginBottom: 2,
  },
  textAreaContainer: {
    marginTop: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 1,
    borderColor: 'black',
 
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: '30%',
    padding: 10,
    elevation: 3,
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginRight: '5%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default Todolist
