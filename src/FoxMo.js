import { useGLTF } from "@react-three/drei";

export default function FoxMo() {
    const { nodes, materials } = useGLTF("/static/Fox.glb");
  return (
    <group name="root" scale={0.08}>
    <primitive object={nodes._rootJoint} />
    <skinnedMesh
      name="fox"
      geometry={nodes.fox.geometry}
      material={materials.fox_material}
      skeleton={nodes.fox.skeleton}
    />
  </group>
  )
}
useGLTF.preload("/static/Fox.glb");