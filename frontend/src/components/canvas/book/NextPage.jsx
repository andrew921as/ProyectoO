'use client'
import React, { useEffect, useRef, useState } from 'react';
import { DoubleSide, TextureLoader } from 'three';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import ImageWall from '../stickers/ImageWall';
import { Vector3 } from "three";


export function NextPage({ animationUseEffect } ) {
  const imgWallRef = useRef();
  const { camera } = useThree()
  const zeus_img = '/img/world/arrow.png';
  const texture_zeus = useLoader(TextureLoader, zeus_img);
  const lore = "Zeus, dios supremo del cielo, el trueno y el rayo,  padre de los dioses y los hombres.  Posee gran poder y es representado como un hombre barbudo con una poderosa figura."

  const [currentTexture, setCurrentTexture] = useState(texture_zeus);
  const [isWallVisible, setWallVisibility] = useState(false);
  const [isImgVisible, setImgVisibility] = useState(true);
  const [text, setText] = useState("");

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
    imgWallRef.current.rotation.x -= Math.PI / 2;
  }, [])

 

  //useFrame(() => {
  //  const distanceFromCamera = 3.1; // Distancia deseada del libro a la camara

  //  const cameraDirection = camera.getWorldDirection(new Vector3());
  //  const targetPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera));
  //  imgWallRef.current.position.copy(targetPosition);
  //  //const stickerOffsetX = 1; // Offset horizontal hacia la derecha
  //  //const stickerOffsetY = 0.5; // Offset vertical hacia arriba
  //  //const stickerOffsetZ = 3; // Offset vertical hacia arriba
  //  //imgWallRef.current.position.x += stickerOffsetX;
  //  //imgWallRef.current.position.y += stickerOffsetY;
  //  //imgWallRef.current.position.z += stickerOffsetZ;
  //  imgWallRef.current.lookAt(camera.position);
  //}, [])

  useFrame(() => {
    const distanceFromCamera = 3.1; // Distancia deseada del libro a la camara
    const offsetX = -1.4; // Desplazamiento hacia la izquierda en el eje X
    const offsetY = 0.9; // Desplazamiento hacia abajo
    const offsetZ = -0.25; // Desplazamiento hacia adelante

    const cameraDirection = camera.getWorldDirection(new Vector3());
    const offset = cameraDirection.clone().multiplyScalar(distanceFromCamera);

    // Aplicar desplazamiento hacia adelante
    const offsetForward = cameraDirection.clone().multiplyScalar(offsetZ);
    offset.add(offsetForward);

    // Aplicar desplazamiento hacia la derecha solo en X y Z
    const cameraRight = new Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize();
    offset.add(cameraRight.clone().multiplyScalar(offsetX));

    // Calcular la direccion hacia arriba relativa
    const cameraUp = new Vector3().crossVectors(cameraRight, cameraDirection).normalize();
    offset.add(cameraUp.clone().multiplyScalar(offsetY));

    const targetPosition = camera.position.clone().add(offset);
    imgWallRef.current.position.copy(targetPosition);

    // Ajustar la rotacion para mantener la imagen recta
    const targetRotation = cameraDirection.clone().multiplyScalar(-1);
    imgWallRef.current.lookAt(targetRotation.add(imgWallRef.current.position));
  }, []);

  return (
    <>
      <mesh visible={isImgVisible} ref={imgWallRef} receiveShadow dispose={null} onClick={() => {
        animationUseEffect(true)
      }}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial map={currentTexture} color="whitered" side={DoubleSide} />
      </mesh>
      <ImageWall visible={isWallVisible} onClick={() => { setWallVisibility(false); setText(""); setImgVisibility(true) }} texture={currentTexture} text={text} />
    </>
  );
}
