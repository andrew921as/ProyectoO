import './style.css'
import ReactDOM  from "react-dom/client";
import App from "./App";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
	<Canvas>
		<App/>
	</Canvas>
)