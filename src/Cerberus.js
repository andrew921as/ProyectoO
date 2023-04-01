
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshStandardMaterial } from "three";




export default function Cerberus() {
    const { nodes, materials } = useGLTF("/3dModels/CerberusOptimized.glb");

  return (
    <group scale={1.5} > 
      <mesh
              castShadow
              receiveShadow
              geometry={nodes["16792_Cerberus_v2"].geometry}
              material={materials.CrackedConcrete}
              position={[-0.01, 1.5, 1]}
              rotation={[-Math.PI / 2, 0, Math.PI]}
        
          >
          </mesh>
    </group>
  );
}

useGLTF.preload("/3dModels/CerberusOptimized.glb");

