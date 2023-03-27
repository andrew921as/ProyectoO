
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model() {
  const { nodes, materials } = useGLTF("/3dModels/Medusa.glb");
  return (
    <group scale={0.01} > 
      <mesh
        position-y={-1500}
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh0.geometry}
        material={materials.mat0}
      />
    </group>
  );
}

useGLTF.preload("/3dModels/Medusa.glb");
