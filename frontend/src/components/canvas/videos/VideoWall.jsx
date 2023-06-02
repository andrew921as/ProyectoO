'use client'
import React, {useRef, useEffect, useState} from 'react';
import { DoubleSide, Vector3} from 'three';
import {useFrame, useThree} from '@react-three/fiber';
import { VideoTexture } from 'three/src/textures/VideoTexture';

export default function VideoWall({visible, onDoubleClick, url}){
    const expressUrl = "http://localhost:3001/";
    const videoUrl = url
    const videoRef = useRef()
    const {camera} = useThree()

    const [video] = useState(() => {
        const vid = document.createElement('video');
        vid.src = `${expressUrl}video?url=${videoUrl}`;;
        vid.loop = true;
        vid.muted = true;
        vid.crossOrigin = 'anonymous';
        vid.load();
        return vid;
    });
    const videoTexture = useRef(new VideoTexture(video));
    const [playingVideo, setPlayingVideo] = useState(false);
    const handleClick = () => {
        if(playingVideo) {
            setPlayingVideo(!playingVideo);
            video.pause();
        }else{
            setPlayingVideo(!playingVideo);
            video.play();
        }
    };


    const handleUnmuted= (event) => {
        video.muted = false;
        video.play();
    };

    const stopvid = (event) => {
        event.stopPropagation();
        if(playingVideo) {
            setPlayingVideo(!playingVideo);
            video.pause();
        }
    };

    useEffect(() => {
      videoRef.current.rotation.x -= Math.PI/2;
    }, [])

    useFrame(()=>{
        const distanceFromCamera = 3; // Distancia deseada del libro a la cámara

        const cameraDirection = camera.getWorldDirection(new Vector3());
        const offSet = cameraDirection.multiplyScalar(distanceFromCamera)
        const targetPosition = camera.position.clone().add(offSet);
        videoRef.current.position.copy(targetPosition);
        videoRef.current.lookAt(camera.position);
      }, [])

    return (
        <mesh ref={videoRef} receiveShadow dispose={null} visible={visible} onClick={handleClick} onPointerDown={handleUnmuted} onDoubleClick={() => {onDoubleClick; stopvid}}>
            <planeGeometry args={[2.75, 2.75]} />
            <meshBasicMaterial map={videoTexture.current} />
        </mesh>
      );
}