import * as yup from 'yup'

export const registerSchema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required. '),
    email: yup.string().required('Email is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required()

export const LoginSchema = yup
  .object()
  .shape({
    email: yup.string().required('Email is required.'),
    password: yup.string().required('Password is required.'),
  })
  .required()

export const addTaskSchema = yup
  .object()
  .shape({
    title: yup.string().required('Title is required.'),
    description: yup.string().required('Description is required.'),
  })
  .required()
