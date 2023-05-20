'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

import { apiUrl } from '@/config'

// Icons
import { GrMailOption } from 'react-icons/Gr'
import { AiFillUnlock } from 'react-icons/Ai'
import { IoMailSharp } from 'react-icons/io5'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formHeight, setFormHeight] = useState(0);

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
      .post(`${apiUrl}/users/login`, data)
      .then((response) => {
        console.log(response.data) // Maneja la respuesta del servidor según tus necesidades
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const calculatedHeight = screenHeight * 0.96;
    setFormHeight(calculatedHeight);
  }, []);

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
        className='w-full sm:w-1/2 max-w-[1000px] flex justify-center flex-col p-8 sm:ml-20 bg-sin_derechos bg-opacity-75 text-amarillito text-left rounded shadow-lg'
        style={{ height: formHeight }}
      >
        <h2 className='text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto'>Iniciar sesión</h2>
        <div className='flex mb-4'>
          <IoMailSharp className=' w-10 h-10 mr-2 mt-2 text-amarillito' />

          <input
            type='email'
            id='email'
            placeholder='Correo electrónico'
            value={email}
            onChange={handleEmailChange}
            className='text-xl lg:text-3xl w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-xl placeholder:lg:text-3xl placeholder:font-light'
            required
          />
        </div>
        <div className='flex mb-4'>
          <AiFillUnlock className='w-10 h-10 mr-2 mt-2  text-amarillito' />

          <input
            type='password'
            id='password'
            placeholder='Contraseña'
            value={password}
            onChange={handlePasswordChange}
            className='text-xl lg:text-3xl w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-xl placeholder:lg:text-3xl placeholder:font-light '
            required
          />
        </div>
        <div className='flex font-texto text-3xl mt-4 md:mt-[100px] xl:mt-[200px] xxl:mt-[300px]'>
          <Link href="/" className='relative'>
            <img src='icons/login/back_button.svg' alt='Volver button' />
          </Link>
          <button type='submit' className='relative'>
            <img src='icons/login/login_button.svg' alt='continuar button' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
