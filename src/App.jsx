import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");

  const passRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str = str += "0123456789"
    if (charAllowed) str = str += '!@#$%^&*()'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);


  }, [numberAllowed, charAllowed, length])

  const copyToClipboard = () => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }
  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-2xl px-4 my-8 text-orange-500 bg-gray-50'>
        <label className='text-center my-3 px-7 ml-25'>Password Generator</label>
        <div className='flex shadow rounded-lg overflow-hidden mb-7'>
          <input type='text' value={password} placeholder='password'
            className='outline-none w-full py-1 px-3 mt-3' readOnly ref={passRef}></input>
          <button className='outline-none bg-amber-300 px-3 py-0.5 shrink-0' onClick={copyToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' value={length} min={6}
              max={100}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}></input>
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' value={setCharAllowed} onChange={() => {
              setCharAllowed((prev) => !prev)
            }}></input>
            <label>Characters</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' value={setNumberAllowed} onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}></input>
            <label>Numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
