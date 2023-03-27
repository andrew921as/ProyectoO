import { useGLTF } from "@react-three/drei";

export default function Monel({posicion, rotation}) {
  const {nodes, materials} = useGLTF("/static/Hamburger.glb")
  console.log(materials)
  console.log(nodes)
    return (
        <group
            scale={0.2}
            position={posicion}
            rotation={rotation}
        >
            <mesh
              geometry={nodes.cheese.geometry}
              material={materials.CheeseMaterial}
              position={[0, 6.5, 0]}
          />
             <mesh
          geometry={nodes.topBun.geometry}
          material={materials.BunMaterial}
          position={[0, 2.8, 0]}
        />
        <mesh
              geometry={nodes.cheese.geometry}
              material={materials.CheeseMaterial}
              position={[0, 3.82, 0]}
          />
            <mesh
              geometry={nodes.meat.geometry}
              material={materials.SteakMaterial}
              position={[0, 3.82, 0]}
          />
            <mesh
              geometry={nodes.cheese.geometry}
              material={materials.CheeseMaterial}
              position={[0, 2.82, 0]}
          />
            <mesh
              geometry={nodes.meat.geometry}
              material={materials.SteakMaterial}
              position={[0, 2.82, 0]}
          />
            <mesh
              geometry={nodes.bottomBun.geometry}
              material={materials.BunMaterial}
          />
              
        </group>
    );
}
useGLTF.preload("/static/Hamburger.glb");
