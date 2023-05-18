import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Poseidon(props) {
  const { nodes, materials } = useGLTF("/3dModels/PoseidonOptimized.glb");
  return (
    <group {...props} dispose={null} scale={0.1} position={[-3,-1,3]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh0.geometry}
        material={materials.mat0}
      />
    </group>
  );
}

useGLTF.preload("/3dModels/Poseidon.glb");