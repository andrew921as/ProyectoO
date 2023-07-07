'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Html } from '@react-three/drei'
import { UserContext } from '@/context/UserProvider'

export function IndexButton({ setBookPage, nextPage }) {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
	const [myDisplay, setMyDisplay] = useState(true)
	const { user, setUser } = useContext(UserContext)
	//Obtener el tamaño de la ventana
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		// Agregar un listener para actualizar el tamaño de la ventana
		if (typeof window !== 'undefined') {
			handleResize() // Obtener el tamaño de la ventana inicial
			window.addEventListener('resize', handleResize) // Actualizar el tamaño de la ventana al cambiar su tamaño
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize) // Eliminar el evento de cambio de tamaño al desmontar el componente
			}
		}
	}, [])

	const handleClick = async() => {
			nextPage()
			setTimeout(() => {
      setBookPage(-1)
    }, 1000)
      
	
	}
	return (
		<>
			<Html position={[0, 0, 1.1]}
				style={{
					width: windowSize.width * 0.15 + 'px',
					height: '100px',
					overflow: 'auto',
				}}
			>
				<h1 className={` text-2xl md:text-4xl xl:text-3xl font-bold mb-4 text-center font-texto text-caca_clara hover:cursor-pointer`} onClick={handleClick}>INDICE</h1>

			</Html>
		</>
	)
}
//${myDisplay ? 'grid' : 'hidden'}