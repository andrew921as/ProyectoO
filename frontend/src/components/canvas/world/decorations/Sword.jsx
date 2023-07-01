import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Sword(props) {
  const { nodes, materials } = useGLTF("/models/world/Sword.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.OldSword.geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 1.9, -Math.PI/15, Math.PI/2]}
        position={[-48.25, 30.1, -107.25]}
        scale={0.02}
      />
    </group>
  );
}

useGLTF.preload("/models/world/Sword.glb");
