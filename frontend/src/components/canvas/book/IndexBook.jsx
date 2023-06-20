'use client'
import React, { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'

export function IndexBook({setBookPage, nextPage}) {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

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
	const handleClick = (number)=>{
		// Si porcentaje cumple con la pagina
		nextPage()
		setBookPage(number)
		// Si no alerta
	}
	return (
		<>
			<Html position={[0.2, 0, -1.2]}
				style={{
					width: windowSize.width * 0.18 + 'px',
					height: '400px',
					overflow: 'auto',
				}}
			>
				<h1 className='text-3xl md:text-5xl xl:text-6xl font-bold mb-11 text-center font-texto'>INDICE</h1>

				<h3 className='text-1xl md:text-2xl xl:text-3xl font-bold mb-5 text-left font-texto' onClick={()=> handleClick(1)}>1. Mitologia</h3>
				<h3 className='text-1xl md:text-2xl xl:text-3xl font-bold mb-5 text-left font-texto' onClick={()=> handleClick(2)}>2. Estructuras</h3>
				<h3 className='text-1xl md:text-2xl xl:text-3xl font-bold mb-5 text-left font-texto' onClick={()=> handleClick(3)}>3. Herramientas</h3>
				<h3 className='text-1xl md:text-2xl xl:text-3xl font-bold mb-5 text-left font-texto' onClick={()=> handleClick(4)}>4. Figuras</h3>
				<h3 className='text-1xl md:text-2xl xl:text-3xl font-bold mb-5 text-left font-texto' onClick={()=> handleClick(5)}>5. Recomendaciones</h3>
			</Html>
		</>
	)
}
