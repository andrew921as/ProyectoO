'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { GrMailOption } from 'react-icons/Gr'
import { AiFillUnlock } from 'react-icons/Ai'

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
    <div className='flex  items-center w-full h-screen bg-[url("/img/login/login.png")] bg-no-repeat bg-cover bg-center'>
      {/* <img src='/img/login/login.png' alt='Fondo De Inicio de Sesión' /> */}
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-xl flex justify-center flex-col h-[800px] p-8 ml-20 bg-sin_derechos bg-opacity-75 text-amarillito text-left rounded shadow-lg'
      >
        <h2 className='text-7xl font-bold mb-6 text-center font-texto'>Iniciar sesión</h2>
        <div className='flex mb-4'>
          {/* <label htmlFor='email' className='block mb-2 font-semibold'>
            Email
          </label> */}
          <GrMailOption className='w-10 h-10 mr-2 mt-2 text-amarillito' />
          <input
            type='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            className='w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-3xl placeholder:font-light'
            required
          />
        </div>
        <div className='flex mb-4'>
          {/* <label htmlFor='password' className='block mb-2 font-semibold'>
            Contraseña
          </label> */}
          <AiFillUnlock className='w-10 h-10 mr-2 mt-2 text-amarillito' />
          <input
            type='password'
            id='password'
            placeholder='Contraseña'
            value={password}
            onChange={handlePasswordChange}
            className='w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-3xl placeholder:font-light'
            required
          />
        </div>
        <div className='flex'>
          <button
            type='submit'
            className='w-1/2 p-2 bg-caca_clara text-amarillito border-2 border-amarillito rounded hover:opacity-50'
          >
            Volver
          </button>
          <button
            type='submit'
            className='w-1/2 p-2 bg-moradito_palido text-amarillito border-2 border-amarillito rounded hover:opacity-50'
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
