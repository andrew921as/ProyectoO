'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import {
  CameraControls,
  FirstPersonControls,
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  View as ViewImpl,
} from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.2} />
    <pointLight position={[7, 60, 1]} intensity={0.8} />
    <OrbitControls fov={40} position={[20, 20, 60]} />
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />

      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && (
            <>
              {/* <OrbitControls enablePan={false} /> */}
              {/* <PointerLockControls /> */}
              {/* <FirstPersonControls
                heightSpeed={5}
                movementSpeed={8}
                lookSpeed={0.1}
                makeDefault
                fov={40}
                position={[20, 20, 60]}
              /> */}
            </>
          )}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }