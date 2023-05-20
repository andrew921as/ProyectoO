'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { GrMailOption } from 'react-icons/Gr'
import { AiFillUnlock } from 'react-icons/Ai'
import { IoMailSharp } from 'react-icons/io5'

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
    <div
      className='flex items-center w-full h-screen'
      style={{
        backgroundImage: `url("/img/login/login.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* <img src='/img/login/login.png' alt='Fondo De Inicio de Sesión' /> */}
      <form
        onSubmit={handleSubmit}
        className='w-full sm:w-1/2 max-w-[1000px] flex justify-center flex-col h-[800px] p-8 sm:ml-20 bg-sin_derechos bg-opacity-75 text-amarillito text-left rounded shadow-lg'
      >
        <h2 className='text-7xl font-bold mb-11 text-left font-texto'>Iniciar sesión</h2>
        <div className='flex mb-4'>
          {/* <label htmlFor='email' className='block mb-2 font-semibold'>
            Email
          </label> */}
          <IoMailSharp className=' w-20 h-20 mr-2 mt-2 text-amarillito' />

          <input
            type='email'
            id='email'
            placeholder='Correo electrónico'
            value={email}
            onChange={handleEmailChange}
            className='text-3xl w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-3xl placeholder:font-light'
            required
          />
        </div>
        <div className='flex mb-4'>
          {/* <label htmlFor='password' className='block mb-2 font-semibold'>
            Contraseña
          </label> */}
          <AiFillUnlock className='w-20 h-20 mr-2 mt-2  text-amarillito' />

          <input
            type='password'
            id='password'
            placeholder='Contraseña'
            value={password}
            onChange={handlePasswordChange}
            className='text-3xl w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-3xl placeholder:font-light '
            required
          />
        </div>
        <div className='flex font-texto text-3xl mt-[300px]'>
          <button type='submit' className='relative'>
            <img src='icons/login/volver_button.svg' alt='Volver button' />
            <p className='absolute inset-0 flex items-center justify-center'>Volver</p>
          </button>
          <button type='submit' className='relative'>
            <img src='icons/login/continuar_button.svg' alt='continuar button' />
            <p className='absolute inset-0 flex items-center justify-center '>Ingresa</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
