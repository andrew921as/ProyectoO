'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props} shadows={false} dpr={[1,2]} flat gl={{antialias: true, outputEncoding: sRGBEncoding, toneMapping: ACESFilmicToneMapping}} >
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
