import React from "react";
import { useState , useCallback , useEffect, useRef } from "react";

export default function App(props){
  //we will need some states to achive the funcytiolaity
  const [length , setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }
  
  const generatePassword = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += '!@#$%^&*()_+'

    for (let i = 1; i < length; i++) {
     const char = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed])
useEffect(() => {
  generatePassword()
}, [length,numberAllowed,charAllowed])

    return(
      <div className="w-full max-w-md mx-auto my-4 shadow-md  rounded-lg px-4 py-3 bg-gray-500 text-white">
      <h1 className="text-center">
        {props.title}
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className="outline-none text-black w-full py-1 px-3"
          placeholder="password"
          readOnly
          //referenceHoook
        ref={passwordRef}

          />
          <button 
          onClick={copyPasswordToClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
            </button>
        </div>
        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
             <input 
             type="range"
             min={6}
             max={20}
             value={length}
             className="cursor-pointer"
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            defaultValue={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            type="checkbox" 
            name="" 
            id="" />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            defaultValue={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            type="checkbox" 
            name="" 
            id="" />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    )
}