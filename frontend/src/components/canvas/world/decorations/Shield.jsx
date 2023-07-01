import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Shield(props) {
  const { nodes, materials } = useGLTF("/models/world/Shield.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shield_greek_2_001.geometry}
        material={materials.map_Greek_Shield_2_001}
        position={[-48.1, 30.20, -106.8]}
        rotation={[-Math.PI/5, -Math.PI/5, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/world/Shield.glb");
