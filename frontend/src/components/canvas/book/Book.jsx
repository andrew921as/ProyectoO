'use client'

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export function Book(props) {
  const group = useRef();
  const cromoRef = useRef();
  const { nodes, materials, animations } = useGLTF("/models/book/book.glb");
  const { actions } = useAnimations(animations, group);


  const {camera} = useThree()

  useEffect(() => {
    actions["ArmatureAction"].repetitions = 1; // Repetir animación una vez
    actions["ArmatureAction"].clampWhenFinished = true; // Detener la animación en el último frame
    actions["ArmatureAction"].play(); // Reproducir animación si hay una definida en el modelo
    group.current.rotation.z += Math.PI / 2; // Rotación de 90 grados alrededor del eje Y

  }, []);

  useFrame(()=>{
    const distanceFromCamera = 2.5; // Distancia deseada del libro a la cámara

    const cameraDirection = camera.getWorldDirection(new Vector3());
    const targetPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera));
    group.current.position.copy(targetPosition);
    group.current.lookAt(camera.position);
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
    <group rotation-x={Math.PI/2} name="Scene">
      <group name="Armature">
        <primitive object={nodes.Base} />
        <primitive object={nodes.RFlap} />
        <skinnedMesh
          name="Plano"
          geometry={nodes.Plano.geometry}
          material={materials["Material.001"]}
          skeleton={nodes.Plano.skeleton}
        />
        <skinnedMesh
          name="Plano001"
          geometry={nodes.Plano001.geometry}
          material={materials["Material.001"]}
          skeleton={nodes.Plano001.skeleton}
        />
        <group name="Magic_Book">
          <skinnedMesh
            name="Cube002"
            geometry={nodes.Cube002.geometry}
            material={materials.book}
            skeleton={nodes.Cube002.skeleton}
          />
          <skinnedMesh
            name="Cube002_1"
            geometry={nodes.Cube002_1.geometry}
            material={materials.lock}
            skeleton={nodes.Cube002_1.skeleton}
          />
          <skinnedMesh
            name="Cube002_2"
            geometry={nodes.Cube002_2.geometry}
            material={materials["center eye"]}
            skeleton={nodes.Cube002_2.skeleton}
          />
          <skinnedMesh
            name="Cube002_3"
            geometry={nodes.Cube002_3.geometry}
            material={materials.crystals}
            skeleton={nodes.Cube002_3.skeleton}
          />
          <skinnedMesh
            name="Cube002_4"
            geometry={nodes.Cube002_4.geometry}
            material={materials.venzels}
            skeleton={nodes.Cube002_4.skeleton}
          />
          <skinnedMesh
            name="Cube002_5"
            geometry={nodes.Cube002_5.geometry}
            material={materials.corners}
            skeleton={nodes.Cube002_5.skeleton}
          />
          <skinnedMesh
            name="Cube002_6"
            geometry={nodes.Cube002_6.geometry}
            material={materials.pages}
            skeleton={nodes.Cube002_6.skeleton}
          />
        </group>
      </group>
    </group>
  </group>
  );
}

useGLTF.preload("/book.glb");