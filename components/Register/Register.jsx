import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../common/schema'


const Register = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })
  console.log(errors)
  const [data, setData] = useState([])

  const onSubmit = async (value) => {
    const payload = {
      ...value,
    }

    const url = `http://192.168.0.182:2000/auth/singUp`
    try {
      const rep = await axios.post(url, payload)

      if (rep.status === 200) {
        navigation.navigate('login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Register</Text> */}
      <View style={styles.mainContainer}>
        <Text style={styles.label}>Enter Name</Text>
        <TextInput
          {...register('name')}
          style={styles.input}
          onChangeText={(email) => {
            setValue('name', email)
            clearErrors('name')
          }}
          value={watch('name')}
          placeholder="Enter your name"
        />

        {errors.email && <Text style={styles.error}>{errors?.name?.message}</Text>}
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
          <Text style={styles.label}> Already have account please? </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </View>
        <Button title="Register" color="blue" onPress={handleSubmit(onSubmit)} />
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
    
  },
  error: {
    color: 'red',
  },

  header: {
    fontSize: 20,
    color: 'black',
    position: 'relative',
    top: '5%',
    left: '15%',
    fontWeight: 'bold',
  },
  mainContainer: {
    width: '80%',
    position: 'absolute',
    top: '15%',
    left: '20%',
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

export default Register
