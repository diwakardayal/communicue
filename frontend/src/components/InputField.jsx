/* eslint-disable react/prop-types */
export default function InputField({ placeholder, setterFn, type }) {
	return (
		<>
			<input
				placeholder={placeholder}
				className="border-2 border-gray-300 hover:outline-blue-700 focus:outline-2 focus:outline-blue-700 rounded-md transition-all px-3 py-2 font-semibold "
				onChange={e => setterFn(e.target.value)}
				type={type}
			/>
		</>
	)
}
