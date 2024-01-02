import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passref = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUXYZabcdefghijklmnoprstuvxyz";
    if (numberallowed) {
      str += "0123456789";
    }

    if (charallowed) {
      str += "!@#$%^&*():}{_};[]";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  const copytoclipbord = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberallowed, charallowed, passwordGenerator]);

  return (
    <div className="  bg-gray-600  mx-auto  max-w-md px-10 mb-5  text-orange-400  rounded   my-4  ">
      <h1 className="text-white text-center ">Passsword Generator</h1>
      <div className=" flex   overflow-hidden  mb-4 justify-center rounded">
        <input
          type="text"
          value={password}
          className=" w-full h-8 py-1 text-left px-2 mb-2  "
          placeholder="password"
          readOnly
          ref={passref}
        />
        <button
          onClick={copytoclipbord}
          className="  bg-blue-700  mb-2  py-1 w-14 text-white align-middle "
        >
          copy
        </button>
      </div>
      <div className="flex  mb-2 gap-x-2">
        <input
          type="range"
          min={1}
          max={12}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {
            setlength(e.target.value);
          }}
        />
        <label>length:{length}</label>
        <div className="gap-x-1 mb-2 flex">
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={() => {
              setnumberallowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">number</label>

          <input
            type="checkbox"
            defaultChecked={charallowed}
            id="charatrInput"
            onChange={() => {
              setcharallowed((prev) => !prev);
            }}
          />
          <label htmlFor="charaterInput">charrater</label>
        </div>
      </div>
    </div>
  );
}
export default App;
