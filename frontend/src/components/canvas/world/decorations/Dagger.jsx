import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Dagger(props) {
  const { nodes, materials } = useGLTF('/models/world/Dagger.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LP001.geometry}
        material={materials.NewMat01}
        position={[-47.15, 30.05, -107.15]}
        scale={0.08}
        rotation={[-Math.PI / 2, 0, Math.PI / 3]}
      />
    </group>
  )
}

useGLTF.preload('/models/world/Dagger.glb')
