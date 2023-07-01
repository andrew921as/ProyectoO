import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Tiamat(props) {
  const { nodes, materials } = useGLTF("/models/world/Tiamat.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Uncut_body.geometry}
        material={nodes.Uncut_body.material}
        position={[153, 22.2, -177]}
        rotation={[Math.PI/2, 0, -Math.PI/2 ]}
        scale={0.08}
      />
    </group>
  );
}

useGLTF.preload("/models/world/Tiamat.glb");
