import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import {Toaster, toast} from "react-hot-toast"

function Jroom() {

    const [code, setcode] = useState("");
    const [valid, setvalid] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setcode(e.target.value);
    const handleclick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://server-pqo0.onrender.com/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code: code }),
            })
            if (response.ok) {
                localStorage.setItem("code", JSON.stringify(code));
                setvalid(false);
                navigate("/Croom");
            }
            else setvalid(true);
        } catch (error) {
            setvalid(true);
        }
    }

    useEffect(() => { valid && setvalid(false); }, [valid]);

    return (
        <div className="flex flex-col justify-center gap-28 items-center">
            <div><Toaster /></div>
            <h1 className="text-red-500 font-bold text-5xl"> Enter the room code </h1>
            <form onSubmit={handleclick} className = "flex flex-col justify-center gap-28 items-center">
                <input type="number" placeholder="e.g.14321" value={code} name="code" id="code" onChange={handleChange} className="w-40 h-14 outline-none placeholder:text-center placeholder:text-3xl rounded text-5xl p-3" onInput={(e) => e.target.value = e.target.value.slice(0, 5)} />
                {valid && toast.error("Room does not exist!")}
                <button className=" w-[60px] h-[60px] bg-white rounded-full transition-all hover:shadow-lg hover:shadow-green-400 hover:scale-110 " onClick={handleclick} ><i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    )
}

export default Jroom;
