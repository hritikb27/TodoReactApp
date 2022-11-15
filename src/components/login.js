import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, classNames, saveState, loadState } from '../utils'
import userIcon from '../assets/userIcon.png'
import lockIcon from '../assets/lockIcon.png'

const Login = () => {
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [emailValidation, setEmailValidation] = useState(true)
    const [passwordValidation, setPasswordValidation] = useState(true)
    const [loginDisable, setLoginDisable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // redirect to todo page if user has login data persisted in localstorage
        const getLoginData = loadState('login');
        if(getLoginData){
            navigate('/todo')
        }
    }, [])

    const handleEmail = (email) => {
        const validate = validateEmail(email)
        if (validate) {
            setEmailValidation(true)
        }
        else {
            setEmailValidation(false)
        }
        setEmail(email)
    }

    const handlePassword = (passwordInput) => {
        if (passwordInput.length >= 4 && passwordInput.length <= 16) {
            setPasswordValidation(true)
        }
        else {
            setPasswordValidation(false)
        }
        setPassword(passwordInput)
    }

    const handleLogin = async () => {
        // save login data in localstorage
        saveState('login', {email, password})
        // response is not coming back successfully due to cors policy issue, maybe cors is not set with allow all origins to the server

        /* const loginCall = await fetch('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     mode: 'cors',
        //     body: JSON.stringify({ email: 'test@rapptrlabs.com', password: 'Test123' })
        // })

        // const result = await loginCall.json() */

        navigate('/todo')
    }

    useEffect(() => {
        // make login button disabled when input fields are empty and until all validations are not passed
        if(!email && !password) setLoginDisable(true)
        if(!emailValidation || !passwordValidation) setLoginDisable(true)
        else if((emailValidation && passwordValidation) && (email && password)){
            setLoginDisable(false)
        }
    }, [emailValidation, passwordValidation])

    return (
        <div className="flex items-center h-screen w-full">
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-2xl text-center uppercase font-bold mb-4">Rapptr Labs</span>
                <form className="mb-4" action="/" method="post">
                    <div className="relative mb-4 md:w-full">
                        <label htmlFor="email" className="block text-xs mb-1">Email</label>
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <img src={userIcon} className='top-7 w-[25px]' alt="user-email" />
                            </span>
                            <input className={classNames(emailValidation ? '' : 'border-red-400', "w-full h-[40px] py-2 text-sm text-white border border-black bg-white rounded pl-10 focus:outline-none focus:bg-white focus:text-gray-900")} value={email} onChange={(e) => handleEmail(e.target.value)} type="email" name="email" placeholder="user@rapptrlabs.com" />
                        </div>
                        {!emailValidation && <span className="text-red-500 ">Not a valid email</span>}
                    </div>
                    <div className="mb-6 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">Password</label>
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <img src={lockIcon} className='top-7 w-[25px]' alt="user-password" />
                            </span>
                            <input className={classNames(passwordValidation ? '' : 'border-red-400', "w-full h-[40px] py-2 text-sm text-white border border-black bg-white rounded pl-10 focus:outline-none focus:bg-white focus:text-gray-900")} value={password} onChange={(e) => handlePassword(e.target.value)} type="password" name="password" placeholder="Must be at least 4 characters" />
                        </div>
                        {!passwordValidation && <span className="text-red-500 ">Not a valid password</span>}
                    </div>
                    <button disabled={loginDisable} onClick={handleLogin} className={classNames((email && password) && (emailValidation && passwordValidation) ? '' : 'opacity-50', "w-full border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded")}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;