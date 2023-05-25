'use client'
import React, {useRef} from 'react';
import { DoubleSide} from 'three';
import {Text} from '@react-three/drei';

export default function ImageWall({visible, onClick, texture, text}){
    const imgWallRef = useRef(null);

    return (
        <>
          <mesh ref={imgWallRef} receiveShadow position-x={300} position-z={-5} dispose={null} visible={visible}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial map={texture} color="whitered" side={DoubleSide} />
          </mesh>
          <mesh position-y={18} position-x={318} position-z={-4.9} visible={visible} onClick={onClick}>
            <Text font="/fonts/jeju.ttf" fontSize={3} color="White" maxWidth={25} textAlign="center">
              X
            </Text>
          </mesh>
          <mesh position-y={2.5} position-x={300} position-z={-4.9}>
            <Text font="/fonts/jeju.ttf" fontSize={3} color="White" maxWidth={25} textAlign="center">
              {text}
            </Text>
          </mesh>
        </>
      );
}