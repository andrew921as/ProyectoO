'use client'
import styles from './page.module.css'
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div
      className="w-full h-full bg-[url('/img/home.jpg')] bg-cover bg-center grid text-center justify-center"
    >
      <motion.div 
        className="absolute bg-[#50d71e] z-30 w-32 h-20"
        initial={{
          y:0,
          opacity:1
        }}
        // animate={{
        //   x:500,
        //   y:[0,-300],
        //   opacity:[0.5,0]
        // }}
        // transition={{
        //   duration:5,
        //   ease:"easeInOut"
        // }}
        />
        <motion.div 
        className="absolute bg-[#f02a2a] z-30 w-32 h-20"
        initial={{
          y:0,
          x:-1,
          opacity:1
        }}
        // animate={{
        //   x:-500,
        //   y:[0,-300],
        //   opacity:[0.5,0]
        // }}
        // transition={{
        //   duration:5,
        //   ease:"easeInOut"
        // }}
        />
      <h1 id={styles.title} className="text-7xl mt-10 md:text-9xl"> OLIMPOCRAFT</h1>
      <div className='flex h-1/6 inset-x-0 bottom-0 absolute justify-center'>
        <a className='relative'>
          <img src='icons/home/registrarseButton.svg' alt='Volver button' />
        </a>    
        <a className='relative'>
          <img src='icons/home/iniciarSButton.svg' alt='Volver button' />
        </a>
      </div>
    </div>
  )
}
