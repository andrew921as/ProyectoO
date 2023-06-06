'use client'

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useGLTF, useAnimations, Html, Loader } from "@react-three/drei";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { Vector3, TextureLoader, DoubleSide } from "three";
import ImageWall from "../stickers/ImageWall";
import { GLTFLoader } from "three-stdlib";

export function Book(props) {
  const group = useRef();
  const sticker = useRef();
  const { nodes, materials, animations } = useGLTF("/models/book/book.glb");
  const { actions } = useAnimations(animations, group);
  const zeus_img = '/img/world/zeus.jpeg';
  const texture_zeus = useLoader(TextureLoader, zeus_img);
  const lore = "Zeus, ruler of all Gods"

  const [currentTexture, setCurrentTexture] = useState(texture_zeus);
  const [isWallVisible, setWallVisibility] = useState(false);
  const [isImgVisible, setImgVisibility] = useState(true);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const { camera } = useThree()

  const handleImage = (event) => {
    event.stopPropagation();
    if (isWallVisible == false) {
      // setCurrentTexture(texture_flash);
      setWallVisibility(true);
      setImgVisibility(false);
      setText(lore);

    }
  };

  useEffect(() => {
    setIsLoading(true)
    const loader = new GLTFLoader();
    loader.load("/models/book/book.glb", (gltf) => {
      // Aquí puedes realizar cualquier operación adicional en el modelo cargado
  
      // Desactiva el estado de carga cuando el modelo esté completamente cargado
      setIsLoading(false);
    });
    actions["ArmatureAction"].repetitions = 1; // Repetir animación una vez
    actions["ArmatureAction"].clampWhenFinished = true; // Detener la animación en el último frame
    actions["ArmatureAction"].play(); // Reproducir animación si hay una definida en el modelo
    group.current.rotation.z += Math.PI / 2; // Rotación de 90 grados alrededor del eje Y
    sticker.current.rotation.x -= Math.PI / 2;
  }, []);

  useFrame(() => {
    const distanceFromCamera = 3.5; // Distancia deseada del libro a la cámara

    const cameraDirection = camera.getWorldDirection(new Vector3());
    const targetPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera));
    // const targetImgPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera-0.5));
    group.current.position.copy(targetPosition);
    group.current.lookAt(camera.position);
    // const stickerOffsetX = 1; // Offset horizontal hacia la derecha
    // const stickerOffsetY = 0.5; // Offset vertical hacia arriba
    // const stickerOffsetZ = 3; // Offset vertical hacia arriba
    // sticker.current.position.copy(targetImgPosition);
    // sticker.current.position.x = camera.position.x;
    // sticker.current.position.y = camera.position.y;
    // sticker.current.position.z = camera.position.z;
    // sticker.current.lookAt(camera.position);
  }, [])

  return (<>
      <group ref={group} {...props} dispose={null}>
      <mesh {...props} visible={isImgVisible} ref={sticker} receiveShadow dispose={null} onClick={handleImage}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={currentTexture} color="whitered" side={DoubleSide} />
      </mesh>
      <ImageWall visible={isWallVisible} onClick={() => { setWallVisibility(false); setText(""); setImgVisibility(true) }} texture={currentTexture} text={text} />
      <group rotation-x={Math.PI / 2} name="Scene">
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
    
  </>);
}

useGLTF.preload("/book.glb");