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
        position={[-7.5, 9, 160.781]}
        rotation={[1.567, 0, Math.PI ]}
        scale={0.06}
      />
    </group>
  );
}

useGLTF.preload("/models/world/Tiamat.glb");
