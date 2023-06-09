'use client'

import React, { useRef, Suspense, useEffect, useState, useContext } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, Html, Loader, Sky } from '@react-three/drei'
import Water from './Water'
import * as THREE from 'three'

// Contextos
import { BookContext } from '@/context/BookProvider'

export function ModelWorld(props) {
  const { nodes, materials } = useGLTF('/models/world/world.glb')

  // const gltf = useLoader(GLTFLoader, '/models/world/world.glb')
  // const { scene } = gltf
  // Cámara
  const { camera, gl } = useThree()

  // Estados
  const [selectedLabel, setSelectedLabel] = useState(null)

  // Contextos
  const { bookState, setBookState } = useContext(BookContext)

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
    <Suspense fallback={<Loader />}>
      {/* Etiquetas del mundo */}
      {!props.isBookOpen && !props.isChangeAvatarOpen && !bookState.isHelpOpen && (
        <>
          {props.labels.map((label, index) => {
            if (selectedLabel?.id != label.id) {
              return (
                <Html key={index} rotation={label.rotation} position={label.position} transform>
                  <div
                    ref={(ref) => (labelRefs.current[index] = ref)}
                    className='cursor-pointer bg-sin_derechos bg-opacity-75 rounded-lg p-6 text-3xl text-con_derechos font-texto'
                    onClick={() => handleLabelClick(index)}
                  >
                    {label.text} <span style={{ fontSize: '1.5em' }}></span>
                  </div>
                </Html>
              )
            }
          })}

          {/* Modal */}
          {selectedLabel && (
            <Html rotation={selectedLabel.rotation} position={selectedLabel.position} transform>
              <div
                ref={labelModalRef}
                className='bg-caca_clara  rounded-lg p-4 border-2 border-amarillito text-amarillito font-texto max-w-sm'
                // onClick={() => setSelectedLabel(null)}
              >
                <div className='relative p-2'>
                  <h2 className='font-bold text-3xl'>{selectedLabel.text}</h2>
                  <p className='text-lg'>{selectedLabel.description}</p>
                  <button
                    className='absolute top-2 right-2 cursor-pointer text-lg'
                    onClick={() => setSelectedLabel(null)}
                  >
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
      {/* <primitive object={scene} {...props} /> */}
      <group {...props} dispose={null}>
        <group position={[-239.122, 0, -186.137]} scale={0.029}>
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_1.geometry} material={materials.stone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_2.geometry} material={materials.grass_block_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_3.geometry} material={materials.dirt} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_4.geometry} material={materials.grass_block_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_5.geometry} material={materials.cobblestone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_6.geometry} material={materials.oak_planks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_7.geometry} material={materials.spruce_planks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_8.geometry} material={materials.jungle_planks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_9.geometry} material={materials.birch_sapling} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_10.geometry} material={materials.water_still} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_11.geometry} material={materials.water_flow} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_12.geometry} material={materials.lava_still} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_13.geometry} material={materials.sand} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_14.geometry} material={materials.gravel} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_15.geometry} material={materials.iron_ore} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_16.geometry} material={materials.coal_ore} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_17.geometry} material={materials.oak_log} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_18.geometry} material={materials.oak_log_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_19.geometry} material={materials.spruce_log} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_20.geometry} material={materials.spruce_log_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_21.geometry} material={materials.birch_log} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_22.geometry} material={materials.birch_log_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_23.geometry} material={materials.oak_leaves} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_24.geometry} material={materials.spruce_leaves} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_25.geometry} material={materials.birch_leaves} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_26.geometry} material={materials.sandstone_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_27.geometry} material={materials.sandstone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_28.geometry} material={materials.sandstone_bottom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_29.geometry} material={materials.chiseled_sandstone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_30.geometry} material={materials.cut_sandstone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_31.geometry} material={materials.MW_bed_feet_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_32.geometry} material={materials.MW_bed_head_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_33.geometry} material={materials.MW_bed_feet_end} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_34.geometry} material={materials.MW_bed_feet_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_35.geometry} material={materials.MW_bed_head_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_36.geometry} material={materials.MW_bed_head_end} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_37.geometry} material={materials.piston_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_38.geometry} material={materials.piston_bottom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_39.geometry} material={materials.piston_inner} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_40.geometry} material={materials.grass} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_41.geometry} material={materials.fern} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_42.geometry} material={materials.dead_bush} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_43.geometry} material={materials.piston_top_sticky} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_44.geometry} material={materials.piston_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_45.geometry} material={materials.white_wool} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_46.geometry} material={materials.lime_wool} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_47.geometry} material={materials.gray_wool} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_48.geometry} material={materials.purple_wool} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_49.geometry} material={materials.dandelion} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_50.geometry} material={materials.poppy} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_51.geometry} material={materials.brown_mushroom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_52.geometry} material={materials.red_mushroom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_53.geometry} material={materials.gold_block} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_54.geometry} material={materials.smooth_stone} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_55.geometry}
            material={materials.smooth_stone_slab_side}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_56.geometry} material={materials.bricks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_57.geometry} material={materials.stone_bricks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_58.geometry} material={materials.quartz_block_bottom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_59.geometry} material={materials.quartz_block_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_60.geometry} material={materials.quartz_block_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_61.geometry} material={materials.tnt_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_62.geometry} material={materials.tnt_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_63.geometry} material={materials.tnt_bottom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_64.geometry} material={materials.bookshelf} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_65.geometry} material={materials.mossy_cobblestone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_66.geometry} material={materials.obsidian} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_67.geometry} material={materials.torch} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_68.geometry} material={materials.fire_0} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_69.geometry} material={materials.MWO_chest_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_70.geometry} material={materials.MWO_chest_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_71.geometry} material={materials.MWO_chest_front} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_72.geometry}
            material={materials.MWO_double_chest_front_left}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_73.geometry}
            material={materials.MWO_double_chest_front_right}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_74.geometry}
            material={materials.MWO_double_chest_back_left}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_75.geometry}
            material={materials.MWO_double_chest_back_right}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_76.geometry}
            material={materials.MWO_double_chest_top_left}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_77.geometry}
            material={materials.MWO_double_chest_top_right}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_78.geometry} material={materials.MWO_chest_latch} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_79.geometry} material={materials.redstone_dust_line1} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_80.geometry}
            material={materials.MWO_redstone_dust_angled}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_81.geometry} material={materials.redstone_dust_line0} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_82.geometry}
            material={materials.MWO_redstone_dust_three_way}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_83.geometry} material={materials.crafting_table_top} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_84.geometry}
            material={materials.crafting_table_front}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_85.geometry} material={materials.wheat_stage7} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_86.geometry} material={materials.farmland_moist} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_87.geometry} material={materials.furnace_front} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_88.geometry} material={materials.furnace_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_89.geometry} material={materials.furnace_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_90.geometry} material={materials.oak_door_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_91.geometry} material={materials.oak_door_bottom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_92.geometry} material={materials.ladder} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_93.geometry} material={materials.lever} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_94.geometry} material={materials.iron_door_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_95.geometry} material={materials.iron_door_bottom} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_96.geometry} material={materials.redstone_torch_off} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_97.geometry} material={materials.snow} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_98.geometry} material={materials.cactus_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_99.geometry} material={materials.cactus_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_100.geometry} material={materials.clay} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_101.geometry} material={materials.sugar_cane} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_102.geometry} material={materials.pumpkin_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_103.geometry} material={materials.pumpkin_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_104.geometry} material={materials.carved_pumpkin} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_105.geometry} material={materials.netherrack} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_106.geometry} material={materials.glowstone} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_107.geometry} material={materials.jack_o_lantern} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_108.geometry} material={materials.oak_trapdoor} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_109.geometry} material={materials.mossy_stone_bricks} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_110.geometry}
            material={materials.cracked_stone_bricks}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_111.geometry}
            material={materials.chiseled_stone_bricks}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_112.geometry} material={materials.iron_bars} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_113.geometry} material={materials.glass} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_114.geometry} material={materials.glass_pane_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_115.geometry} material={materials.vine} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_116.geometry} material={materials.lily_pad} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_117.geometry} material={materials.nether_bricks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_118.geometry} material={materials.cauldron_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_119.geometry} material={materials.cauldron_inner} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_120.geometry} material={materials.cauldron_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_121.geometry} material={materials.birch_planks} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_122.geometry} material={materials.flower_pot} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_123.geometry} material={materials.potatoes_stage3} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_124.geometry} material={materials.anvil} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_125.geometry} material={materials.anvil_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_126.geometry} material={materials.hopper_inside} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_127.geometry} material={materials.hopper_outside} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_128.geometry} material={materials.hopper_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_129.geometry} material={materials.quartz_pillar_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_130.geometry} material={materials.quartz_pillar} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_131.geometry}
            material={materials.chiseled_quartz_block_top}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_132.geometry}
            material={materials.chiseled_quartz_block}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_133.geometry} material={materials.magenta_terracotta} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_134.geometry}
            material={materials.light_blue_terracotta}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_135.geometry} material={materials.pink_terracotta} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_136.geometry} material={materials.gray_terracotta} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0_137.geometry}
            material={materials.light_gray_terracotta}
          />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_138.geometry} material={materials.cyan_terracotta} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_139.geometry} material={materials.purple_terracotta} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_140.geometry} material={materials.brown_terracotta} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_141.geometry} material={materials.black_terracotta} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_142.geometry} material={materials.hay_block_side} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_143.geometry} material={materials.hay_block_top} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_144.geometry} material={materials.blue_wool} />
          <mesh castShadow receiveShadow geometry={nodes.Mesh_0_145.geometry} material={materials.red_wool} />
        </group>
      </group>
      {/* Agua 3D */}
      <Water />
    </Suspense>
  )
}

useGLTF.preload('/models/world/world.glb')
