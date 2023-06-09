'use client'

import { forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  CameraControls,
  Environment,
  FirstPersonControls,
  KeyboardControls,
  Loader,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  useCubeTexture,
  useHelper,
  useKeyboardControls,
  View as ViewImpl,
} from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.2} />
    <pointLight position={[7, 60, 1]} intensity={0.8} />
    {/* <Perf /> */}
    {/*<PerspectiveCamera makeDefault fov={50} position={[-250, 70, -120]} />
    <OrbitControls fov={40} position={[20, 20, 60]} />*/}
  </Suspense>
)

const View = forwardRef(({ children, orbit, isBookOpen, ...props }, ref) => {
  // Estados
  const [isExitCamera, setIsExitCamera] = useState(false)

  // Refs
  // const pointerLockRef = useRef(null)
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  // Verifica si el usuario presiona la tecla escape
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        // Código de tecla para Escape es 27
        setIsExitCamera(false)
      }
    }

    // Agregar el evento de escucha al montar el componente
    document.addEventListener('keydown', handleKeyPress)

    // Limpiar el evento de escucha al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, []) // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente

  // useEffect(() => {
  //   console.log('isExitCamera', isExitCamera)
  // }, [isExitCamera])

  return (
    <>
      <div ref={localRef} {...props} />

      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && (
            <>
              {/* <OrbitControls enablePan={false} /> */}
              {!isBookOpen && !isExitCamera && (
                <PointerLockControls
                  isLocked={true}
                  onUnlock={(e) => {
                    if (e.type == 'unlock') {
                      setIsExitCamera(true)
                    }
                  }}
                />
              )}
            </>
          )}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }

export function Player({ walkVelocity = 5 }) {
  // Temporary data
  let walkDirection = new THREE.Vector3()
  let rotateAngle = new THREE.Vector3(0, 1, 0)

  // Constants
  let moveX,
    moveY,
    moveZ = 0
  const moveCamera = 0.5

  // Diagonal movement angle offset
  const directionOffset = (forward, backward, left, right) => {
    if (forward) {
      return 0
    } else if (backward) {
      return Math.PI
    } else if (left) {
      return Math.PI / 2
    } else if (right) {
      return -Math.PI / 2
    }
  }

  const [sub, get] = useKeyboardControls()

  useFrame((state, delta) => {
    const { forward, backward, left, right } = get()
    const initialPosition = new THREE.Vector3(-54, 10, -40)
    const cameraPosition = state.camera.position
    if (cameraPosition.x == 0 && cameraPosition.y == 0 && cameraPosition.z == 5) {
      state.camera.position.copy(initialPosition)
    }
    if (forward || backward || left || right) {
      state.camera.getWorldDirection(walkDirection)
      walkDirection.normalize()
      walkDirection.applyAxisAngle(rotateAngle, directionOffset(forward, backward, left, right))

      const velocity = walkVelocity

      moveX = walkDirection.x * velocity * delta
      moveY = walkDirection.y * velocity * delta
      moveZ = walkDirection.z * velocity * delta

      state.camera.position.x += moveX
      state.camera.position.y += moveY
      state.camera.position.z += moveZ
    }
  })
}
