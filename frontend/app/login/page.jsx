'use client'
import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    axios
      .post('/login', data)
      .then((response) => {
        console.log(response.data) // Maneja la respuesta del servidor según tus necesidades
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-[url("/img/login/login.png")] bg-no-repeat bg-cover bg-center'>
      {/* <img src='/img/login/login.png' alt='Fondo De Inicio de Sesión' /> */}
      <form onSubmit={handleSubmit} className='w-full max-w-sm p-6 bg-sin_derechos text-amarillito rounded shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center font-texto'>Iniciar sesión</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2 font-semibold'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-2 font-semibold'>
            Contraseña
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button type='submit' className='w-full p-2 bg-caca_clara text-amarillito rounded hover:bg-blue-600'>
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
