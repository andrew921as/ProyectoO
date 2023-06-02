'use client'
import React, {useEffect, useRef, useState} from 'react';
import { DoubleSide, TextureLoader } from 'three';
import {useLoader, useThree, useFrame} from '@react-three/fiber';
import ImageWall from './ImageWall';
import { Vector3 } from "three";


export function ZeusWall(props){
    const imgWallRef = useRef();
    const {camera} = useThree()
    const zeus_img = '/img/world/zeus.jpeg';
    const texture_zeus = useLoader(TextureLoader, zeus_img);
    const lore = "Zeus, dios supremo del cielo, el trueno y el rayo,  padre de los dioses y los hombres.  Posee gran poder y es representado como un hombre barbudo con una poderosa figura."

    const [currentTexture, setCurrentTexture] = useState(texture_zeus);
    const [isWallVisible, setWallVisibility] = useState(false);
    const [isImgVisible, setImgVisibility] = useState(true);
    const [text, setText] = useState("");

    const handleImage = (event) => {
        event.stopPropagation();
        if(isWallVisible == false){
            // setCurrentTexture(texture_flash);
            setWallVisibility(true);
            setImgVisibility(false);
            setText(lore);

        }
    };

    useEffect(() => {
        imgWallRef.current.rotation.x -= Math.PI/2;
    }, [])

    useFrame(()=>{
        const distanceFromCamera = 3.1; // Distancia deseada del libro a la cámara

        const cameraDirection = camera.getWorldDirection(new Vector3());
        const offSet = cameraDirection.multiplyScalar(distanceFromCamera)
        const targetPosition = camera.position.clone().add(offSet);
        imgWallRef.current.position.copy(targetPosition);
        imgWallRef.current.lookAt(camera.position);
      }, [])

    return (
        <>
        <mesh {...props} visible={isImgVisible} ref={imgWallRef} receiveShadow dispose={null} onClick={handleImage}>
                <planeGeometry args={[1,1]} />
                <meshStandardMaterial map={currentTexture} color="whitered" side={DoubleSide}/>
        </mesh>
        <ImageWall visible={isWallVisible} onClick={() => {setWallVisibility(false); setText(""); setImgVisibility(true)}} texture={currentTexture} text={text} />
        </>
    );
}