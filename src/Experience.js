import { OrbitControls } from '@react-three/drei'
import {Perf} from 'r3f-perf'
import FoxMo from './FoxMo'
import Monel from './Monel'

export default function Experience()
{
    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />
        <FoxMo/>
        <Monel posicion={[0,3.4,5.5]} rotation={[Math.PI/4,0,0]}/>
        <Monel posicion={[1,0,7]} rotation={[0,0,- Math.PI/8]}/>
        <Monel posicion={[-0.5,0,7]}/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}