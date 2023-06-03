'use client'

import React, { useRef, Suspense, useEffect } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, Loader, Sky } from '@react-three/drei'
import Water from './Water'
import * as THREE from 'three'

export function ModelWorld(props) {
  const gltf = useLoader(GLTFLoader, '/models/world/world.glb')
  const { scene } = gltf
  const { gl } = useThree()

  const meshRef = useRef()

  // Función para rotar la geometría 90 grados
  const rotateGeometry = () => {
    if (meshRef.current) {
      meshRef.current.rotateZ(THREE.MathUtils.degToRad(90))
    }
  }

  useEffect(() => {
    // rotateGeometry()
  }, [])

  // Configurar sRGBEncoding
  gl.outputEncoding = THREE.sRGBEncoding

  return (
    <>
      {/* <Sky sunPosition={[7, 60, 1]} rayleigh={0.4} /> */}
      <primitive object={scene} {...props} />
      <Water />
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
        {/* <planeGeometry args={[1000000, 1000000]} /> */}
        {/* <meshBasicMaterial side={THREE.DoubleSide} color='#2654bf' /> */}
      </mesh>
    </>
  )
}
