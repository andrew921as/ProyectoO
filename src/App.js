import { React, useRef, useState } from 'react'
import { useFrame, useLoader} from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'
import ImagePasto from './images/Pasto.jfif'
import ImageIron from './images/Metal.jfif'
import ImageAgua from './images/Agua.jfif'
import ImageLava from './images/Lava.jfif'

export default function App() {
	const boxRef = useRef()
	const coneRef = useRef()
	const sphereRef = useRef()
	const Left = 1
	const Right = 0
	let sphereD = 0

	const texture = useLoader(TextureLoader, ImagePasto);
	const textureM = useLoader(TextureLoader, ImageIron);
	const textureA = useLoader(TextureLoader, ImageAgua);
	const textureL = useLoader(TextureLoader, ImageLava);


	useFrame((state, delta) => {	
		boxRef.current.rotation.x += 1 * delta;
		coneRef.current.rotation.z += 1 * delta;

		switch(sphereD){
			case Right:
				sphereRef.current.position.x -= 1 *delta;
				if(sphereRef.current.position.x < -2){
					sphereD = Left
				}
				break;
			case Left:
				sphereRef.current.position.x += 1 *delta;
				if(sphereRef.current.position.x > 2){
					sphereD = Right
				}
				break;
		}


	})

	return (
		<>
			<OrbitControls
				makedefault
				enablePan={false}
				enableRotate={true}
			/>

			<ambientLight/>      
      <directionalLight position={[10, 3, 3]} intensity={1.5} />

			<Center>
				<mesh position={-1} rotation-x={-Math.PI *0.5} scale={12}>
					<planeGeometry/>
					<meshStandardMaterial map={textureA} color={"skyblue"}/>
				</mesh>
				<mesh ref={boxRef} position={[-3, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshStandardMaterial map={texture} color={"blue"} />
				</mesh>
				<mesh ref={coneRef} position={[3, 0, 0]} >
					<coneGeometry args={[0.5, 1, 100]} />
					<meshStandardMaterial  map={textureM} color={"purple"} />
				</mesh>
				<mesh ref={sphereRef} position={[0, 0, 0]} >
					<sphereGeometry args={[0.5, 35, 64]} />
					<meshStandardMaterial map={textureL} color={"red"} />
				</mesh>

			</Center>
		</>
	)
}
