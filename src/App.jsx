import { useCallback, useState,useEffect,useRef } from "react";

function App() {
  const [Length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);


  const passwordGenerator =useCallback 
    (() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numberAllowed) str += "0123456789";
      if (charAllowed) str += "!@#$%^&*()_+";
      for (let i = 1; i <= Length; i++) {
        let char = (Math.random() * str.length + 1) | 0;
        pass += str.charAt(char);
      }
      
      setPassword(pass)
    },
    [Length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(Password)
  },[Password])

useEffect(() => {
  passwordGenerator()
},[Length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className=" w-full max-w-xl mx-auto shadow-md rounded-lg p-10 my-8  bg-gray-700 text-orange-500">
        <h1 className="text-white text-center pb-4 text-2xl">
          Generate a Password{" "}
        </h1>
        <div className="flex shadow rounded-lg  mb-4 pb-5">
          <input
            type="text"
            value={Password}
            className=" outline-none w-full py-2 px-3  "
            placeholder="Generated Password"
            readOnly
            ref = {passwordRef}
          />
          <button  
          onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={0}
              max={30}
              value={Length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);

                console.log("Value: ", e.target.value);
              }}
            />
            <label>Length:{Length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            id="numbersInput"
            onChange={() =>{
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numbersInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked = {charAllowed}
            id="numbersInput"
            onChange={() =>{
              setCharAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numbersInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
 
         
     

    
