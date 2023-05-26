'use client'

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Book(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/book.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Base} />
          <primitive object={nodes.RFlap} />
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