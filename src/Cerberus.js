
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'




export default function Cerberus() {
    const { nodes, materials } = useGLTF("/3dModels/CerberusTextured.glb");
    const [diffuseMap, normalMap] = useLoader(TextureLoader, [
        '/3dModels/Diffuse_Cerberus.png',
        '/3dModels/Normal_Cerberus.png'
    ]);

  return (
    <group scale={1.5} > 
      <mesh
              position-y={-0.7}
              rotation-x={4.71239}
              rotation-z={3.14159}
              castShadow
              receiveShadow
              geometry={nodes["16792_Cerberus_v2"].geometry}
              material={materials["CrackedConcrete.001"]}
        
          >
          
          </mesh>
    </group>
  );
}

useGLTF.preload("/3dModels/CerberusTextured.glb");

