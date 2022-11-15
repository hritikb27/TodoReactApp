import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, classNames, saveState, loadState } from '../utils'

const Login = () => {
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [emailValidation, setEmailValidation] = useState(true)
    const [passwordValidation, setPasswordValidation] = useState(true)
    const loginDisableRef = useRef(true);
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

    const handlePassword = (password) => {
        if (password.length >= 4 && password.length <= 16) {
            setPasswordValidation(true)
        }
        else {
            setPasswordValidation(false)
        }
        setPassword(password)
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
        if(!email && !password) loginDisableRef.current = true
        if((emailValidation && passwordValidation) && (email && password)){
            loginDisableRef.current = false
        }
    }, [emailValidation, passwordValidation])

    return (
        <div className="flex items-center h-screen w-full">
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl text-center uppercase font-bold mb-4">Rapptr Labs</span>
                <form className="mb-4" action="/" method="post">
                    <div className="mb-4 md:w-full">
                        <label htmlFor="email" className="block text-xs mb-1">Email</label>
                        <input className={classNames(emailValidation ? '' : 'border-red-400', "w-full border-2 rounded p-2 outline-none focus:shadow-outline")} value={email} onChange={(e) => handleEmail(e.target.value)} type="email" name="email" placeholder="user@rapptrlabs.com" />
                        {!emailValidation && <span className="text-red-500 ">Not a valid email</span>}
                    </div>
                    <div className="mb-6 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">Password</label>
                        <input className={classNames(passwordValidation ? '' : 'border-red-400', "w-full border-2 rounded p-2 outline-none focus:shadow-outline")} value={password} onChange={(e) => handlePassword(e.target.value)} type="password" name="password" placeholder="Must be at least 4 characters" />
                        {!passwordValidation && <span className="text-red-500 ">Not a valid password</span>}
                    </div>
                    <button disabled={loginDisableRef.current} onClick={handleLogin} className={classNames((email && password) && (emailValidation && passwordValidation) ? '' : 'opacity-50', "w-full border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded")}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;