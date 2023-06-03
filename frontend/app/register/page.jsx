'use client'
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/context/UserProvider'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { apiUrl } from '@/config'
import Swal from 'sweetalert2'

// COMPONENTS
import Loading from '@/components/elements/Loading'

// Icons
import { FaUserAlt } from 'react-icons/fa'
import { AiFillUnlock } from 'react-icons/ai'
import { IoMailSharp } from 'react-icons/io5'

const Resgiter = () => {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formHeight, setFormHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const data = {
      name,
      last_name,
      email,
      password,
    }
    axios
      .post(`${apiUrl}/users/register`, data)
      .then((response) => {
        // Detiene el loading
        setIsLoading(false)

        // // Guarda el usuario en el contexto
        // setUser(response.data.user)

        // Guarda el usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user))

        // Envía al usuario a la página de inicio
        router.push('/world')
      })
      .catch((error) => {
        // console.error(error)

        // Detiene el loading
        setIsLoading(false)

        // Alerta de error
        Swal.fire({
          title: 'Error!',
          text: `Ocurrió un error al registrarse. Verifica tus credenciales. ${error}`,
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          color: '#F4DFB0',
          iconColor: '#F4DFB0',
          background: '#8C6F4D',
          iconHtml: '<img src="/icons/login/advertencia.svg" alt="error" class="w-20 h-20">',
          customClass: {
            popup: 'rounded-xl',
            title: 'text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
            htmlContainer: 'text-amarillito text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
            confirmButton: 'bg-moradito_palido text-amarillito font-texto text-xl p-4 rounded',
          },
        })
      })
  }

  useEffect(() => {
    const screenHeight = window.innerHeight
    const calculatedHeight = screenHeight * 0.96
    setFormHeight(calculatedHeight)
  }, [])

  return (
    <div
      className='flex items-center w-full h-screen'
      style={{
        backgroundImage: `url("/img/login/login.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='w-full sm:w-1/2 max-w-[1000px] flex justify-between flex-col p-8 sm:ml-20 bg-sin_derechos bg-opacity-75 text-amarillito text-left rounded shadow-lg'
        style={{ height: formHeight }}
      >
        {/* Título */}
        <h2 className='text-3xl md:text-4xl xl:text-7xl font-bold text-left font-texto'>Registro</h2>

        {/* Inputs */}
        <section>
          <div className='flex items-center space-x-4 mb-4'>
            <FaUserAlt className=' w-10 h-10 text-amarillito' />
            <input
              type='text'
              id='name'
              placeholder='Nombre'
              value={name}
              onChange={handleNameChange}
              className='text-xl lg:text-3xl w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-xl placeholder:lg:text-3xl placeholder:font-light'
              required
            />
          </div>
          <div className='flex items-center space-x-4 mb-4'>
            <FaUserAlt className=' w-10 h-10 text-amarillito' />
            <input
              type='text'
              id='last_name'
              placeholder='Apellido'
              value={last_name}
              onChange={handleLastNameChange}
              className='text-xl lg:text-3xl w-full bg-transparent border-b-4 p-4 border-amarillito placeholder:text-caca_clara rounded placeholder:text-xl placeholder:lg:text-3xl placeholder:font-light'
              required
            />
          </div>
          <div className='flex items-center space-x-4 mb-4'>
            <IoMailSharp className=' w-10 h-10 text-amarillito' />

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
          <div className='flex items-center space-x-4 mb-4'>
            <AiFillUnlock className='w-10 h-10 text-amarillito' />

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
        </section>

        {isLoading ? (
          <div className='flex w-full justify-center mt-4'>
            <Loading />
          </div>
        ) : null}

        {/* Botones volver e ingresar */}
        <div className='flex font-texto text-3xl mt-4'>
          <Link href='/initialS' className='relative'>
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

export default Resgiter
