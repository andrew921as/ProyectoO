'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'


export const Common = ({ color }) => (
  <Suspense fallback={null}>

    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={0.2} /> 
    <pointLight position={[7, 60, 1]} intensity={0.8} />
    <PerspectiveCamera makeDefault fov={50} position={[-250, 70, -120]} />
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
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
