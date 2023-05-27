'use client'
import React, {useRef, useEffect} from 'react';
import { DoubleSide, Vector3} from 'three';
import {useFrame, useThree} from '@react-three/fiber';
import {Text} from '@react-three/drei';

export default function ImageWall({visible, onClick, texture, text}){
    const imgWallRef = useRef();
    const words  =useRef();
    const {camera} = useThree()

    useEffect(() => {
      imgWallRef.current.rotation.x -= Math.PI/2;
    }, [])

    useFrame(()=>{
      const distanceFromCamera = 3; // Distancia deseada del libro a la cámara
      const distanceFromCamera2 = 1;
      const cameraDirection = camera.getWorldDirection(new Vector3());
      const targetPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera));
      const targetWordsPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera2));
      imgWallRef.current.position.copy(targetPosition);
      imgWallRef.current.lookAt(camera.position);
      words.current.position.copy(targetWordsPosition);
      words.current.lookAt(camera.position);
    }, [])

    return (
        <>
          <mesh ref={imgWallRef} receiveShadow dispose={null} visible={visible} onClick={onClick}>
            <planeGeometry args={[2.75, 2.75]} />
            <meshStandardMaterial map={texture} color="whitered" side={DoubleSide} />
          </mesh>
          {/* <mesh position-y={18} position-x={318} position-z={-4.9} visible={visible} onClick={onClick}>
            <Text font="/fonts/jeju.ttf" fontSize={3} color="White" maxWidth={25} textAlign="center">
              X
            </Text>
          </mesh> */}
          <mesh ref={words}>
            <Text font="/fonts/jeju.ttf" fontSize={0.1} color="White" maxWidth={1} textAlign="center">
              {text}
            </Text>
          </mesh>
        </>
      );
}