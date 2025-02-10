import { useState, useCallback, useEffect } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharaterAllowed] = useState(false);
  const [password, setPassword] = useState("")
//useCallback is a React Hook that helps you remember a function so that it doesn't get recreated every time the component re-renders.
//                  :::syntax ::: 
// const cachedFn = useCallback(fn, dependencies)
  const password_generator = useCallback(() => {

    let pass= ""
    let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (CharacterAllowed) str += "!@#$%^&*-_~+=`{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, CharacterAllowed, setPassword])


  useEffect(()=>{
    password_generator()},
    [length, numberAllowed, CharacterAllowed, password_generator]
  );

  return (
    <>
    <div className='w-full max-w-2xl mx-auto shadow-md rounded-xl my-8 p-6 bg-gray-800'>
        <h1 className='text-3xl text-center font-medium text-white'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden bg-white my-5'>
        <input 
        type="text"
        value={password}
        placeholder='Password'
        className='outline-none w-full py-1 px-3'
        readOnly
        />
        <button
        className='outline-none bg-blue-800 text-white px-4 py-2 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <input 
            type="range"
            min = {8}
            max = {100}
            value={length} 
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
            />
            <label className='text-white'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input 
            type="checkbox" 
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput" className='text-white'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             id="characterInput" 
             defaultChecked = {CharacterAllowed}
             onChange={() => {
              setCharaterAllowed((prev) => !prev);
             }}
             />
            <label htmlFor="characterInput" className='text-white'>Characters</label>
          </div>
        </div>
        </div> 

    </>
  )
}

export default App
//    /* max-w- → Sets the maximum width of an element.
// 🔹 md → Refers to "medium" size, which is 28rem (448px).

// So, max-w-md means the element cannot be wider than 448px. */
