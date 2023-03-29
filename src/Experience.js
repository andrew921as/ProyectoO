import {OrbitControls} from '@react-three/drei';
import {Text} from '@react-three/drei';
import {Float} from '@react-three/drei';
import {Perf} from 'r3f-perf';
import FoxMo from './FoxMo';
import Model from './Model';
import Poseidon from './Poseidon';
import Temple from './Temple';

export default function Experience() {
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			{/* <Poseidon/> */}
			<Temple />
			<Float>
				<Text font="/Fuentes/gelio/GelioFi.ttf" fontSize={2} color="LightYellow" position-y={8} maxWidth={15} textAlign="center">
					QUE ESTAS HACIENDO VE!
				</Text>
			</Float>

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={20}>
				<planeGeometry />
				<meshStandardMaterial color="Sienna" />
			</mesh>
		</>
	);
}
