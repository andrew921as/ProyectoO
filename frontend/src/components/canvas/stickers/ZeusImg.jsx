'use client'
import React, {useRef, useState} from 'react';
import { DoubleSide, TextureLoader } from 'three';
import {useLoader} from '@react-three/fiber';
import ImageWall from './ImageWall';

export function ZeusWall(props){
    const imgWallRef = useRef(null);
    const zeus_img = '/img/world/zeus.jpeg';
    const texture_zeus = useLoader(TextureLoader, zeus_img);
    const lore = "Zeus, ruler of all Gods"

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

    return (
        <>
        <mesh {...props} visible={isImgVisible} ref={imgWallRef} receiveShadow position-x={300} position-y={-3} rotation-x={ - Math.PI * 0.5 } dispose={null} onClick={handleImage}>
                <planeGeometry args={[7,7]} />
                <meshStandardMaterial map={currentTexture} color="whitered" side={DoubleSide}/>
        </mesh>
        <ImageWall visible={isWallVisible} onClick={() => {setWallVisibility(false); setText(""); setImgVisibility(true)}} texture={currentTexture} text={text} />
        </>
    );
}