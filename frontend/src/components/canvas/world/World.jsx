'use client'

import React, { useRef, Suspense, useEffect, useState } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, Html, Loader, Sky } from '@react-three/drei'
import Water from './Water'
import * as THREE from 'three'

export function ModelWorld(props) {
  const gltf = useLoader(GLTFLoader, '/models/world/world.glb')
  const { scene } = gltf
  // Cámara
  const { camera, gl } = useThree()

  // Estados
  const [selectedLabel, setSelectedLabel] = useState(null)

  // Referencias
  const labelModalRef = useRef()
  const labelRefs = useRef([])

  // Configurar sRGBEncoding
  gl.outputEncoding = THREE.sRGBEncoding

  useFrame(() => {
    // Actualiza la posición y la rotación del componente Html para que siga la cámara
    const [cameraX, cameraY, cameraZ] = camera.position.toArray()
    const [cameraRotX, cameraRotY, cameraRotZ] = camera.rotation.toArray()

    // Iterar sobre las etiquetas y actualizar sus transformaciones
    props.labels.forEach((label, index) => {
      const htmlElement = labelRefs.current[index]
      if (htmlElement) {
        htmlElement.style.transform = `rotateZ(${cameraRotZ}rad) rotateX(${cameraRotX}rad)`
      }
    })

    // Hacer que el modal de las etiquetas siga la cámara
    const labelModalElement = labelModalRef.current
    if (labelModalElement) {
      labelModalElement.style.transform = `rotateZ(${cameraRotZ}rad) rotateX(${cameraRotX}rad)`
    }
  })

  // Función para agregar al estado la etiqueta seleccionada
  const handleLabelClick = (index) => {
    setSelectedLabel(props.labels[index])
  }

  // Imprimir etiquetas
  // console.log(labelRefs.current)

  return (
    <>
      {/* Etiquetas del mundo */}
      {!props.isBookOpen && (
        <>
          {props.labels.map((label, index) => {
            if (selectedLabel?.id != label.id) {
              return (
                <Html key={index} rotation={[0, 0, 0]} position={label.position} transform>
                  <div
                    ref={(ref) => (labelRefs.current[index] = ref)}
                    className='cursor-pointer bg-sin_derechos bg-opacity-75 rounded-lg p-2 text-md text-con_derechos font-texto'
                    onClick={() => handleLabelClick(index)}
                  >
                    {label.text} <span style={{ fontSize: '1.5em' }}>🏛️</span>
                  </div>
                </Html>
              )
            }
          })}

          {/* Modal */}
          {selectedLabel && (
            <Html rotation={[0, 0, 0]} position={selectedLabel.position} transform>
              <div
                ref={labelModalRef}
                className='bg-caca_clara  rounded-lg p-2 border-2 border-amarillito text-amarillito font-texto max-w-sm'
                // onClick={() => setSelectedLabel(null)}
              >
                <div className='relative p-2'>
                  <h2 className='font-bold text-xl'>{selectedLabel.text}</h2>
                  <p>{selectedLabel.description}</p>
                  <button className='absolute top-2 right-2 cursor-pointer' onClick={() => setSelectedLabel(null)}>
                    X
                  </button>
                </div>
              </div>
            </Html>
          )}

          {/* Anfiteatro */}
          {/* <Html rotation={[0, 0, 0]} position={[-52.0, 10, -38]} transform>
            <div
              ref={labelRef}
              id='3d_label'
              className='bg-sin_derechos bg-opacity-75 rounded-lg p-2 text-md text-con_derechos font-texto'
            >
              Teatro de Epidauro <span style={{ fontSize: '1.5em' }}>🏛️</span>
            </div>
          </Html> */}

          {/* Partenon */}
          {/* <Html rotation={[0, 0, 0]} position={[-52.0, 10, -42]} transform>
            <div
              ref={labelRef}
              id='3d_label'
              className='bg-sin_derechos bg-opacity-75 rounded-lg p-2 text-md text-con_derechos font-texto'
            >
              Partenon <span style={{ fontSize: '1.5em' }}>🏛️</span>
            </div>
          </Html> */}
        </>
      )}

      {/* Mundo 3D */}
      <primitive object={scene} {...props} />

      {/* Agua 3D */}
      <Water />
    </>
  )
}
