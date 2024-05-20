/* eslint-disable react/prop-types */
import { TailSpin } from "react-loader-spinner"

export default function Loader({ size }) {
	return (
		<TailSpin
			visible={true}
			height={size || "80"}
			width="80"
			color="#232323"
			ariaLabel="tail-spin-loading"
			radius="1"
			wrapperStyle={{}}
			wrapperClass=""
			className=""
		/>
	)
}
