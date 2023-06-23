import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Crane(props) {
  const { nodes, materials } = useGLTF("/models/world/Crane.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={nodes.Mesh_0.material}
        position={[59, 6.3, 3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_1.geometry}
        material={nodes.Mesh_1.material}
        position={[59, 6.3, 3]}
      />
    </group>
  );
}

useGLTF.preload("/models/world/Crane.glb");
