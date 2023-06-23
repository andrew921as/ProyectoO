'use client'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation  } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'


//Images
import cloudImg from '/public/img/nubesita.png'
import registrarseButton from '/public/icons/home/registrarseButton.svg'
import logInButton from '/public/icons/home/iniciarSButton.svg'
import song from '/public/music/intro.mp3'

export default function Page() {

  const controlBackg = useAnimation();
  const controlCloud1 = useAnimation();
  const controlCloud2 = useAnimation();
  const controlText1 = useAnimation();
  const controlText2 = useAnimation();
  const controlTitle = useAnimation();
  const controlButtons = useAnimation();
  const skipButton = useAnimation();

  useEffect(() => {
    controlBackg.start({
      scale: 1.3,
      transition: { duration: 10, ease: 'easeInOut' },
    });
    controlCloud1.start({
      x: '-95vw', 
      y: [0, -300], 
      opacity: [1, 0],
      transition: { duration: 7, ease: 'easeInOut',},
    });
    controlCloud2.start({
      x: '110vw',
      y: [0, -300],
      opacity: [1, 0],
      transition: { duration: 7, ease: 'easeInOut',},
    });
    controlText1.start({
      scale: [0, 1, 1, 1, 0],
      opacity: [0, 1, 1, 1, 0],
      transition: { duration: 5, ease: 'easeInOut',},
    });
    controlText2.start({
      scale: [0, 0, 1, 1, 0],
      opacity: [0, 0, 1, 1, 0],
      transition: { duration: 10, ease: 'easeInOut',},
    });
    controlTitle.start({
      scale: [0, 0, 0, 1, 1],
      opacity: [0, 0, 0, 0.5, 1],
      transition: { duration: 10, ease: 'easeInOut',},
    });
    controlButtons.start({
      scale: [0, 0, 0, 0, 1],
      opacity: [0, 0, 0, 0, 1],
      transition: { duration: 10, ease: 'easeInOut',},
    });
    skipButton.start({
      scale: [1, 1, 1, 1, 0],
      opacity: [1, 1, 1, 1, 0],
      transition: { duration: 10, ease: 'easeInOut',},
    });
    // Iniciar todas las demás animaciones aquí de la misma manera...
  }, []);

  const handleSkipClick = async () => {
    controlBackg.stop()
    controlCloud1.stop()
    controlCloud2.stop()
    controlText1.stop()
    controlText2.stop()
    controlTitle.stop()
    controlButtons.stop()
    skipButton.stop()

    controlBackg.start({
      scale: 1.3,
      transition: { duration: 1, ease: 'easeInOut' },
    })
    controlCloud1.start({
      x: '-95vw', 
      y: -300, 
      opacity:  0,
      transition: { duration: 0, ease: 'easeInOut',},
    });
    controlCloud2.start({
      x: '110vw', 
      y: -300, 
      opacity:  0,
      transition: { duration: 0, ease: 'easeInOut',},
    });
    controlText1.start({
      scale: 0, 
      opacity:  0,
      transition: { duration: 0, ease: 'easeInOut',},
    });
    controlText2.start({
      scale: 0, 
      opacity:  0,
      transition: { duration: 0, ease: 'easeInOut',},
    });
    controlTitle.start({
      scale: 1, 
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut',},
    });
    controlButtons.start({
      scale: 1, 
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut',},
    });
    skipButton.start({
      scale: 0, 
      opacity: 0,
      transition: { duration: 1, ease: 'easeInOut',},
    });
    // ... terminar todas las animaciones
  }

  return (
    <div className='w-full h-full relative grid text-center justify-center overflow-hidden'>
      <ReactAudioPlayer
        src={song}
        autoPlay={true}
        controls
        className='hidden'
      />
      <motion.div
        id={styles.mainHome}
        className='absolute w-full h-full z-0'
        initial={{
          scale: 1,
        }}
        animate={controlBackg}
      />
      
      <motion.div
        className={styles.box}
        initial={{
          x: '-25vw',
          y: 0,
          opacity: 1,
        }}
        animate={controlCloud1}
      >
        <Image alt='Cloud' src={cloudImg} fill />
      </motion.div>
      <motion.h3 className='font-titulo absolute p-2 bottom-5 right-3 text-5xl z-30 bg-amarillito bg-opacity-75 rounded-md hover:cursor-pointer'
        initial={{ opacity: 1 }}
        animate={skipButton}
        onClick={handleSkipClick}
      > 
        Saltar Intro
      </motion.h3>
      <motion.h2
        className='z-10 absolute h-fit top-0 right-0 bottom-0 left-0 m-auto font-texto text-center text-4xl text-white bg-sin_derechos bg-opacity-75 p-2 rounded-lg md:text-6xl md:w-1/3'
        initial={{ opacity: 0 }}
        animate={controlText1}
      >
        {' '}
        Bienvenido a la antigua grecia  

      </motion.h2>
      <motion.h2
        className='z-10 absolute h-fit top-0 right-0 bottom-0 left-0 m-auto font-texto text-center text-4xl text-white bg-sin_derechos bg-opacity-75 p-2 rounded-lg md:text-6xl md:w-1/3'
        initial={{ opacity: 0 }}
        animate={controlText2}
      >
        {' '}
        ¿Listo para una aventura?
      </motion.h2>
      <motion.div
        className={styles.box2}
        initial={{
          y: 0,
          x: '45vw',
          opacity: 1,
        }}
        animate={controlCloud2}
      >
        <Image alt='Cloud' src={cloudImg} fill />
      </motion.div>
      <motion.h1
        id={styles.title}
        className='text-7xl z-10 mt-10 md:text-9xl '
        initial={{ opacity: 0 }}
        animate={controlTitle}
      >
        {' '}
        OLIMPOCRAFT
      </motion.h1>
      
      <motion.div
        className='flex h-1/6 inset-x-0 bottom-0 absolute justify-center z-10'
        initial={{ opacity: 0 }}
        animate={controlButtons}
      >
        <Link href='/register' className='relative md:scale-9 lg:scale-75'>
          <Image src={registrarseButton} alt='registartse Button' />
        </Link>
        <Link href='/login' className='relative md:scale-9 lg:scale-75'>
          <Image src={logInButton} alt='LogIn Button' />
        </Link>
      </motion.div>
    </div>
  )
}
