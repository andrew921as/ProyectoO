'use client'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
//Images
import greekPlay from '/public/img/greekPlay.png'

export default function Page() {

  return (
    <div className='w-full h-full bg-black relative grid text-center justify-center overflow-hidden'>
      <motion.div
        className='grid w-full h-full m-auto'
        initial={{
          y: '-25vw',
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <p className='text-neutral-50 text-5xl m-auto font-texto md:text-8xl'>
          CONOCE UN NUEVO MUNDO
        </p>
        <motion.div
          initial={{
            scale: 1,
          }}
          whileHover={{ scale: 1.5 }} 
          className='w-fit h-fit m-auto    '     
        >
        <Link href="/initialS" className=' text-neutral-50'> 
          <div className='relative w-28 h-28 m-auto md:w-60 md:h-60'>
          <Image
            src={greekPlay}
            fill
          />
          </div>
          <p className='font-titulo text-5xl md:text-8xl'> INICIAR</p>
        </Link>
        </motion.div>
      </motion.div>


    </div>
  )
}
