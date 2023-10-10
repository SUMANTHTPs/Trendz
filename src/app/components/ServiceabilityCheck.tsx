import axios from 'axios'
import React from 'react'

function ServiceabilityCheck() {
    // Initial states
    const [pinCode, setPinCode] = React.useState("")
    const [serviceable, setServiceable] = React.useState(null)

    const checkServiceability = async () => {
        try {
            const response = await axios.post("/api/service-pin-code", pinCode, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const { isServiceable } = response.data;
            setServiceable(isServiceable);
        } catch (error) {
            throw new Error("Unable to check service availability")
        }
    }
    return (
        <div>
            <div className="flex mt-5">
                <input className="border border-grey-100 px-3 rounded-md w-full" type="text" placeholder="Enter an Indian pincode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                <button className="flex ml-3 text-white bg-blue-900 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded" disabled={!pinCode} onClick={checkServiceability}>Check</button>
            </div>
            <div className='p-1'>
                {serviceable && (
                    <p className="text-green-600">Woah!, Free shipping available for your location</p>
                )}
                {serviceable !== null && serviceable === false && (
                    <p className="text-red-400">Sorry, we don't deliver to this location</p>
                )}
            </div>
        </div>
    )
}

export default ServiceabilityCheck