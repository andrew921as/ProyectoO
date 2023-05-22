'use client'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";

//Images
import cloudImg from "/public/img/nubesita.png"
import registrarseButton from "/public/icons/home/registrarseButton.svg"
import iniciarSButton from "/public/icons/home/iniciarSButton.svg"

export default function Page() {
  return (
    <div
      id={styles.mainHome}
      className="w-full h-full grid text-center justify-center"
    >
      <motion.div 
        className={styles.box}
        initial={{
          y:0,
          opacity:1
        }}
        animate={{
          x:"-50vw",
          y:[0,-300],
          opacity:[0.5,0]
        }}
        transition={{
          duration:5,
          ease:"easeInOut"
        }}
        >
          <Image
          alt='Cloud'
          src={cloudImg}
          fill
          />
        </motion.div>
        <motion.div 
        className={styles.box2}
        initial={{
          y:0,
          x:"50vw",
          opacity:1
        }}
        animate={{
          x:"100vw",
          y:[0,-300],
          opacity:[0.5,0]
        }}
        transition={{
          duration:5,
          ease:"easeInOut"
        }}
        >
          <Image
          alt='Cloud'
          src={cloudImg}
          fill
          />
        </motion.div>
      <h1 id={styles.title} className="text-7xl mt-10 md:text-9xl "> OLIMPOCRAFT</h1>
      <div className='flex h-1/6 inset-x-0 bottom-0 absolute justify-center'>
        <Link href="/register" className='relative md:scale-9 lg:scale-75'>
          <Image 
            src={registrarseButton} 
            alt='registartse Button' 
          />
        </Link>    
        <Link href="/login" className='relative md:scale-9 lg:scale-75'>
          <Image 
            src={iniciarSButton} 
            alt='Iniciar Sesion Button' 
          />
        </Link>
      </div>
    </div>
  )
}
