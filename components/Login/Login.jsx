import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Linking } from 'react-native'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from '../common/schema'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const onSubmit = async (value) => {
    const payload = {
      ...value,
    }

    const url = `http://192.168.0.182:2000/auth/logIn`
    try {
      const rep = await axios.post(url, payload)
      const { email, token } = rep.data
      if (rep.status === 200) {
       await AsyncStorage.setItem('token', JSON.stringify(token))
       await AsyncStorage.setItem('email', JSON.stringify(email))
       navigation.replace('Todolist')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Form</Text>
      <View style={styles.mainContainer}>
        <Text style={styles.label}>Enter Email</Text>
        <TextInput
          {...register('email')}
          style={styles.input}
          onChangeText={(email) => {
            setValue('email', email)
            clearErrors('email')
          }}
          value={watch('email')}
          placeholder="Enter your email"
        />

        {errors.email && <Text style={styles.error}>{errors?.email?.message}</Text>}
        <Text style={styles.label}>Enter Password</Text>
        <TextInput
          {...register('password')}
          style={styles.input}
          onChangeText={(data) => {
            setValue('password', data)
            clearErrors('password')
          }}
          value={watch('password')}
          placeholder="Enter your password"
          autoCorrect={false}
          secureTextEntry={true}
        />
        {errors.password && <Text style={styles.error}>{errors?.password?.message}</Text>}

        <View style={styles.checkboxContainer}>
          <Text style={styles.label}> Don't have an account? </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </View>
        <Button title="Login" color="blue" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: '#fff',
    position: 'relative',
  },
  error: {
    color: 'red',
  },

  header: {
    fontSize: 20,
    color: 'black',
    position: 'relative',
    top: '20%',
    left: '30%',
    fontWeight: 'bold',
  },
  mainContainer: {
    width: '80%',
    position: 'absolute',
    top: '30%',
    left: '25%',
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
  link: {
    marginTop: 10,
    marginBottom: 2,
    color: 'blue',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
})

export default Login
