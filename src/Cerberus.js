
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Cerberus() {
  const { nodes, materials } = useGLTF("/3dModels/Cerberus.glb");
  return (
    <group scale={1.5} > 
      <mesh
        position-y={-0.7}
        rotation-x={4.71239}
        rotation-z={3.14159}
        castShadow
        receiveShadow
        geometry={nodes["16792_Cerberus_v2"].geometry}
        material={nodes["16792_Cerberus_v2"].material}
      />
    </group>
  );
}

useGLTF.preload("/3dModels/Cerberus.glb");

