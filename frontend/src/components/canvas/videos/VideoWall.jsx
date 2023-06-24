'use client'
import React, { useRef, useEffect, useState } from 'react';
import { DoubleSide, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { VideoTexture } from 'three/src/textures/VideoTexture';
import { apiUrl } from '@/config';

export default function VideoWall({ visible, onContextMenu, url }) {
    const expressUrl = apiUrl;
    const videoUrl = url
    const videoRef = useRef()
    const { camera } = useThree()

    const [video] = useState(() => {
        const vid = document.createElement('video');
        vid.src = `${expressUrl}/video?url=${videoUrl}`;;
        vid.loop = true;
        vid.muted = true;
        vid.crossOrigin = 'anonymous';
        vid.load();
        return vid;
    });
    const videoTexture = useRef(new VideoTexture(video));
    const [playingVideo, setPlayingVideo] = useState(false);
    const handleClick = (event) => {
        if (visible == false) return;
        if (playingVideo == true) {
            event.stopPropagation()
            setPlayingVideo(!playingVideo);
            video.pause();
        } else {
            event.stopPropagation()
            setPlayingVideo(!playingVideo);
            video.play();
        }
    };


    const handleUnmuted = (event) => {
        if (visible == false) return;
        video.muted = false;
        video.play();
    };

    const stopvid = (event) => {
        if (playingVideo == true) {
            setPlayingVideo(!playingVideo);
            video.pause();
        } else {
            setPlayingVideo(false);
            video.pause();
        }
    };

    const handleContextMenu = (event) => {
        if (visible == true) {
            event.stopPropagation()
            onContextMenu(event);
            stopvid(event);
        }

    }

    useEffect(() => {
        videoRef.current.rotation.x -= Math.PI / 2;
    }, [])

    useFrame(() => {
        const distanceFromCamera = 2.5; // Distancia deseada del libro a la cámara

        const cameraDirection = camera.getWorldDirection(new Vector3());
        const offSet = cameraDirection.multiplyScalar(distanceFromCamera)
        const targetPosition = camera.position.clone().add(offSet);
        videoRef.current.position.copy(targetPosition);
        videoRef.current.lookAt(camera.position);
    }, [])

    return (
        <mesh ref={videoRef} receiveShadow dispose={null} visible={visible} onClick={handleClick} onPointerDown={handleUnmuted} onContextMenu={handleContextMenu}>
            <planeGeometry args={[5.5, 3.5]} />
            <meshBasicMaterial map={videoTexture.current} />
        </mesh>
    );
}
