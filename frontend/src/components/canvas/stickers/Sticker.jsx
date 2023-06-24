'use client'
import React, { useEffect, useRef, useState } from 'react'
import { DoubleSide, TextureLoader } from 'three'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
import ImageWall from './ImageWall'
import { Vector3 } from 'three'

export function ZeusWall(props) {
  const imgWallRef = useRef()
  const { camera } = useThree()
  const zeus_img = props.texture || '/img/world/zeus.jpeg'
  const texture_zeus = useLoader(TextureLoader, zeus_img)
  const lore =
    props.text ||
    'Zeus, dios supremo del cielo, el trueno y el rayo,  padre de los dioses y los hombres.  Posee gran poder y es representado como un hombre barbudo con una poderosa figura.'

  const [currentTexture, setCurrentTexture] = useState(texture_zeus)
  const [isWallVisible, setWallVisibility] = useState(false)
  const [isImgVisible, setImgVisibility] = useState(true)
  const [text, setText] = useState('')

  const handleImage = (event) => {
    event.stopPropagation()
    if (isWallVisible == false) {
      // setCurrentTexture(texture_flash);
      setWallVisibility(true)
      setImgVisibility(false)
      setText(lore)
    }
  }

  useEffect(() => {
    imgWallRef.current.rotation.x -= Math.PI / 2
  }, [])

  // console.log("POSITION:", props)

  useFrame(() => {
    const distanceFromCamera = 3.1 // Distancia deseada del libro a la cámara
    const offsetX = props.position[0] || 0.8 // Desplazamiento hacia la derecha en el eje X
    const offsetY = props.position[1] || 0.5 // Desplazamiento hacia arriba
    const offsetZ = props.position[2] || -0.25 // Desplazamiento hacia adelante

    const cameraDirection = camera.getWorldDirection(new Vector3())
    const offset = cameraDirection.clone().multiplyScalar(distanceFromCamera)

    // Aplicar desplazamiento hacia adelante
    const offsetForward = cameraDirection.clone().multiplyScalar(offsetZ)
    offset.add(offsetForward)

    // Aplicar desplazamiento hacia la derecha solo en X y Z
    const cameraRight = new Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize()
    offset.add(cameraRight.clone().multiplyScalar(offsetX))

    // Calcular la dirección hacia arriba relativa
    const cameraUp = new Vector3().crossVectors(cameraRight, cameraDirection).normalize()
    offset.add(cameraUp.clone().multiplyScalar(offsetY))

    const targetPosition = camera.position.clone().add(offset)
    imgWallRef.current.position.copy(targetPosition)

    // Ajustar la rotación para mantener la imagen recta
    const targetRotation = cameraDirection.clone().multiplyScalar(-1)
    imgWallRef.current.lookAt(targetRotation.add(imgWallRef.current.position))
  }, [])
  return (
    <>
      <mesh {...props} visible={isImgVisible} ref={imgWallRef} receiveShadow dispose={null} onClick={handleImage}>
        <planeGeometry args={[1.4, 0.8]} />
        <meshStandardMaterial map={currentTexture} color='white' side={DoubleSide} />
      </mesh>
      <ImageWall
        visible={isWallVisible}
        onClick={(event) => {
          if (isWallVisible == true) {
            event.stopPropagation()
          }
          setWallVisibility(false)
          setText('')
          setImgVisibility(true)
        }}
        texture={currentTexture}
        text={text}
        textColor={props.textColor || 'Black'}
      />
    </>
  )
}
