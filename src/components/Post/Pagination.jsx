import React from 'react'

const Pagination = ({data, setPageUrl}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
				<button
					onClick={() => setPageUrl(data.previous)}
					disabled={!data.previous}
					className={`border px-4 py-2 rounded-full ${
						data.previous
							? "bg-gray-300  cursor-pointer"
							: "bg-white cursor-not-allowed"
					}`}
				>
					Previous
				</button>
				<button
					onClick={() => setPageUrl(data.next)}
					disabled={!data.next}
					className={`border px-4 py-2 rounded-full ${
						data.next
							? "bg-gray-300  cursor-pointer"
							: "bg-white cursor-not-allowed"
					}`}
				>
					Next
				</button>
			</div>
  )
}

export default Pagination
