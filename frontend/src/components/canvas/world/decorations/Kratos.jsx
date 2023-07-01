import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Kratos(props) {
  const { nodes, materials } = useGLTF("/models/world/Kratos.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["uploads_files_2889383_Kratos+Bust+-+Base"].geometry}
        material={nodes["uploads_files_2889383_Kratos+Bust+-+Base"].material}
        position={[-94.75, 35.7, -116.6]}
        rotation={[Math.PI / 2, 0, -Math.PI/2]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["uploads_files_2889383_Kratos+Bust+-+Kratos"].geometry
          }
          material={
            nodes["uploads_files_2889383_Kratos+Bust+-+Kratos"].material
          }
          position={[-7.291, -2.715, -69.488]}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/world/Kratos.glb");
