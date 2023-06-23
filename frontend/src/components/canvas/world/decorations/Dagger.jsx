import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Dagger(props) {
  const { nodes, materials } = useGLTF("/models/world/Dagger.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LP001.geometry}
        material={materials.NewMat01}
        position={[10,10,0]}
        scale={0.08}
      />
    </group>
  );
}

useGLTF.preload("/models/world/Dagger.glb");
