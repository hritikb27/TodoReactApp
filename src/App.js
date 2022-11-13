import { useState } from "react";
import { validateEmail, classNames } from './utils'

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [emailValidation, setEmailValidation] = useState(true)
  const [passwordValidation, setPasswordValidation] = useState(true)

  const handleEmail = (email) => {
    const validate = validateEmail(email)
    if (validate) {
      return setEmailValidation(true)
    }
    else {
      setEmailValidation(false)
    }
    setEmail(email)
  }

  const handlePassword = (password) => {
    if (password.length >= 4 && password.length <= 16) {
      return setPasswordValidation(true)
    }
    else {
      setPasswordValidation(false)
    }
    setPassword(password)
  }
  return (
    <div className="">
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl text-center uppercase font-bold mb-4">Rapptr Labs</span>
          <form className="mb-4" action="/" method="post">
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">Email</label>
              <input className={classNames(emailValidation ? '' : 'border-red-400', "w-full border rounded p-2 outline-none focus:shadow-outline")} value={email} onChange={(e) => handleEmail(e.target.value)} type="email" name="email" id="email" placeholder="user@rapptrlabs.com" />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">Password</label>
              <input className={classNames(passwordValidation ? '' : 'border-red-400', "w-full border rounded p-2 outline-none focus:shadow-outline")} value={password} onChange={(e) => handlePassword(e.target.value)} type="password" name="password" id="password" placeholder="Must be at least 4 characters" />
            </div>
            <button className={classNames(emailValidation ? '' : 'opacity-50', "w-full border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded")}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
