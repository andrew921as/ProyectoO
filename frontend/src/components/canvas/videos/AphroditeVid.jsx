'use client'
import React, { useRef, useState, useEffect } from 'react';
import { DoubleSide, Vector3, TextureLoader } from "three";
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import VideoWall from './VideoWall';

export function AphroditeWall(props){
      const videoUrl = "https://www.youtube.com/watch?v=3hKapv64tGs";
      const {camera} = useThree()
      const videoRef = useRef()
      const aphrodite_img = '/img/world/Aphrodite.jpg';
      const texture_aphrodite = useLoader(TextureLoader, aphrodite_img);
     
      const [currentTexture, setCurrentTexture] = useState(texture_aphrodite);
      const [isWallVisible, setWallVisibility] = useState(false);
      const [isImgVisible, setImgVisibility] = useState(true);

      const handleImage = (event) => {
        event.stopPropagation();
        if(isWallVisible == false){
            setWallVisibility(true);
            setImgVisibility(false);

        }
      };

      useEffect(() => {
        videoRef.current.rotation.x -= Math.PI/2;
      }, [])

      useFrame(()=>{
        const distanceFromCamera = 3.1; // Distancia deseada del libro a la cámara

        const cameraDirection = camera.getWorldDirection(new Vector3());
        const offSet = cameraDirection.multiplyScalar(distanceFromCamera)
        const targetPosition = camera.position.clone().add(offSet);
        videoRef.current.position.copy(targetPosition);
        videoRef.current.lookAt(camera.position);
      }, [])

    
      return (
        <>
            <mesh  ref={videoRef} visible={isImgVisible} onClick={handleImage} receiveShadow dispose={null} >
                <planeBufferGeometry args={[1, 1]} />
                <meshBasicMaterial map={currentTexture} side={DoubleSide}  />
            </mesh>
            <VideoWall visible={isWallVisible} onDoubleClick={() => {setWallVisibility(false); setImgVisibility(true)}} url={videoUrl}/>    
        </>

      );
}