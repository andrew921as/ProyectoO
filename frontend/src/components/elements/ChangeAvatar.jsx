import React, { useContext, useState } from 'react'
import { avatars } from 'public/img/avatars/avatars'
import { apiUrl } from '@/config'
import { UserContext } from '@/context/UserProvider'
import Swal from 'sweetalert2'
import Loading from './Loading'
import axios from 'axios'

const ChangeAvatar = ({ setIsChangeAvatarOpen }) => {
  const [isSelectingAvatar, setIsSelectingAvatar] = useState(false)

  return (
    <>
      <div className='relative flex flex-col justify-between items-center text-center w-full h-full bg-sin_derechos bg-opacity-95 text-amarillito text-xl font-texto rounded-lg p-20'>
        {/* Botón para cerrar la pestaña */}
        <button
          onClick={() => {
            setIsChangeAvatarOpen(false)
          }}
          className='absolute top-10 right-10 font-texto text-5xl text-amarillito'
        >
          X
        </button>

        {/* Imagen y seleccionar imagen */}
        {!isSelectingAvatar ? (
          <Image setIsSelectingAvatar={setIsSelectingAvatar} />
        ) : (
          <SelectImage setIsChangeAvatarOpen={setIsChangeAvatarOpen} setIsSelectingAvatar={setIsSelectingAvatar} />
        )}
      </div>
    </>
  )
}

export default ChangeAvatar

// Imagen y botón de seleccionar imagen
const Image = ({ setIsSelectingAvatar }) => {
  // Contextos
  const { user, setUser } = useContext(UserContext)

  return (
    <>
      {/* Título y botón de cierre */}
      <div>
        <h1 className='font-titulo text-6xl'>Editar avatar</h1>
      </div>

      <div>
        <img
          src={user?.avatar || 'https://i.pinimg.com/280x280_RS/42/03/a5/4203a57a78f6f1b1cc8ce5750f614656.jpg'}
          alt='Foto de perfil'
          width={280}
          height={280}
          className='z-20 object-cover rounded-full'
        />
      </div>

      <button
        onClick={() => setIsSelectingAvatar(true)}
        className='bg-caca_clara border-amarillito border-2 text-amarillito rounded-md p-4'
      >
        Seleccionar una imagen
      </button>
    </>
  )
}

const SelectImage = ({ setIsChangeAvatarOpen, setIsSelectingAvatar }) => {
  const [isLoading, setIsLoading] = useState(false)

  // Contextos
  const { user, setUser } = useContext(UserContext)

  const updateUserAvatar = async (avatar) => {
    axios
      .patch(`${apiUrl}/users/${user._id}`, { avatar: `img/avatars/${avatar}`, points: user.points, keys: user.keys })
      .then((response) => {
        // Actualizar el usuario local haciendo una petición al servidor
        axios.get(`${apiUrl}/users/${user._id}`).then((response) => {
          setUser(response.data)

          // Guarda el usuario actualizado en el localStorage
          localStorage.setItem('user', JSON.stringify(response.data))
          setIsLoading(false)

          // Ciera el modal
          setIsSelectingAvatar(false)
          setIsChangeAvatarOpen(false)
        })
      })
      .catch((error) => {
        setIsLoading(false)

        // Alerta de error
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrió al guardar tu nuevo avatar. Verifica tu conexión a internet.',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          color: '#F4DFB0',
          iconColor: '#F4DFB0',
          background: '#8C6F4D',
          iconHtml: '<img src="/icons/login/advertencia.svg" alt="error" class="w-20 h-20">',
          customClass: {
            popup: 'rounded-3xl',
            container: 'rounded-xl',
            title: 'text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
            htmlContainer: 'text-amarillito text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
            confirmButton: 'bg-moradito_palido text-amarillito font-texto text-xl p-4 rounded',
          },
        })
      })
  }

  return (
    <>
      <div className='flex justify-center items-center flex-wrap gap-4 w-full h-full'>
        {isLoading && <Loading />}
        <h1 className='font-texto text-3xl'>Elige tu héroe favorito</h1>
        <div className='flex justify-center items-center flex-wrap gap-4 w-full h-full'>
          {!isLoading &&
            avatars.map((avatar, index) => (
              <img
                key={`avatar-${index}`}
                src={`img/avatars/${avatar}`}
                alt='Foto de perfil'
                className='z-20 w-32 h-32 object-cover rounded-full cursor-pointer'
                onClick={() => {
                  updateUserAvatar(avatar)
                }}
              />
            ))}
        </div>
      </div>
    </>
  )
}
