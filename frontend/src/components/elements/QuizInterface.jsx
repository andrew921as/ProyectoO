'use client'

import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loading from './Loading'

// Context
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'
import { apiUrl } from '@/config'

export const QuizInterface = ({ onClick }) => {
  // Estados
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Contextos
  const { user, setUser } = useContext(UserContext)
  const { bookState, setBookState } = useContext(BookContext)

  const quiz = bookState.quiz

  // Verificar si el quiz lo ganó el usuario, si es así, se suman puntos al usuario y el quiz se guarda como finalizado dentro del estado del libro
  useEffect(() => {
    if (isQuizFinished && correctAnswers === quiz.questions.length) {
      // Se actualiza el estado del libro para indicar que el quiz fue finalizado
      const updatedQuizzes = [...bookState.quizzes]
      updatedQuizzes[quiz.section - 2].isFinished = true
      setBookState({ ...bookState, quizzes: updatedQuizzes })

      setIsLoading(true)

      axios
        .patch(`${apiUrl}/users/${user._id}`, { points: user.points + 100 })
        .then((response) => {
          // Actualizar el usuario local haciendo una petición al servidor
          axios.get(`${apiUrl}/users/${user._id}`).then((response) => {
            setUser(response.data)

            // // Guarda el usuario actualizado en el localStorage
            // localStorage.setItem('user', JSON.stringify(response.data))
            // setIsLoading(false)
          })
        })
        .catch((error) => {
          setIsLoading(false)
          // Resetea el quiz
          setCurrentQuestion(0)
          setCorrectAnswers(0)
          setIsQuizFinished(false)

          console.log('ERROR:', error)

          // Alerta de error
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrió al guardar tu progreso. Verifica tu conexión a internet.',
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
  }, [isQuizFinished])

  return (
    <>
      <div
        onClick={onClick}
        className='relative flex flex-col justify-between items-center text-center w-full h-full bg-sin_derechos bg-opacity-95 text-amarillito text-xl font-texto rounded-lg p-10'
      >
        {/* Título y botón de cierre */}
        <div>
          <h1 className='font-titulo text-6xl'>OLIMPOQUIZ</h1>
          <h2>Quiz de la sección #{quiz.section}</h2>
        </div>
        <button
          onClick={() => {
            setBookState({ ...bookState, isQuizOpen: false, quiz: null })
          }}
          className='absolute top-10 right-10 font-texto text-5xl text-amarillito'
        >
          X
        </button>

        {isQuizFinished && (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {correctAnswers === quiz.questions.length ? (
                  <>
                    <div className='flex flex-col justify-center items-center'>
                      <h1 className='text-4xl'>¡Felicidades! +100 puntos</h1>
                      <h2 className='text-2xl'>Has respondido correctamente todas las preguntas.</h2>
                      <h2 className='text-2xl'>
                        Recuerda que para desbloquear la sección #{quiz.section} debes recolectar {quiz.section} llaves.
                      </h2>
                    </div>

                    {/* Botón cerrar */}
                    <button
                      onClick={() => {
                        setBookState({ ...bookState, isQuizOpen: false, quiz: null })
                      }}
                      className='bg-caca_clara text-2xl font-texto text-center  min-w-[200px] h-auto break-words  p-4 m-2 rounded-lg'
                    >
                      Cerrar
                    </button>
                  </>
                ) : (
                  <>
                    <div className='flex flex-col justify-center items-center'>
                      <h1 className='text-4xl'>¡Lo sentimos!</h1>
                      <h2 className='text-2xl'>
                        Has respondido incorrectamente {quiz.questions.length - correctAnswers} preguntas. Debes
                        responder correctamente todas las preguntas para desbloquear el siguiente capítulo.
                      </h2>
                    </div>

                    <button
                      onClick={() => {
                        setCorrectAnswers(0)
                        setCurrentQuestion(0)
                        setIsQuizFinished(false)
                      }}
                      className='bg-caca_clara text-2xl font-texto text-center  min-w-[200px] h-auto break-words  p-4 m-2 rounded-lg'
                    >
                      Volver a intentar
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* Preguntas si todavía no se ha terminado el quiz */}
        {!isQuizFinished && (
          <div className='w-full'>
            <h3 className='text-3xl'>{quiz.questions[currentQuestion].question}</h3>
            <div className='grid grid-cols-2 grid-rows-2 w-full'>
              {/* Opciones si no se ha terminado el quiz */}
              {quiz?.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Si la respuesta es correcta
                    if (option.correct) {
                      // Se suma un punto al contador de respuestas correctas
                      setCorrectAnswers(correctAnswers + 1)

                      // Si es la última pregunta
                      if (currentQuestion === quiz.questions.length - 1) {
                        // Se finaliza el quiz
                        setIsQuizFinished(true)

                        // setBookState({ ...bookState, isQuizOpen: false, quiz: null })
                      } else {
                        // Si no es la última pregunta, se pasa a la siguiente
                        setCurrentQuestion(currentQuestion + 1)
                      }
                    } else {
                      // Si es la última pregunta
                      if (currentQuestion === quiz.questions.length - 1) {
                        // Se finaliza el quiz
                        setIsQuizFinished(true)

                        // setBookState({ ...bookState, isQuizOpen: false, quiz: null })
                      }
                      // Si la respuesta es incorrecta, sigue a la siguiente pregunta
                      setCurrentQuestion(currentQuestion + 1)
                    }
                  }}
                  className=' bg-caca_clara text-2xl font-texto text-center  min-w-[200px] h-auto break-words  p-2 m-2 rounded-lg'
                >
                  {option.option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Botón de continuar */}
        {/* <button>Continuar {">"}</button> */}
        <div></div>
      </div>
    </>
  )
}
