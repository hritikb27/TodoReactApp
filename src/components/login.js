import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { validateEmail, classNames } from '../utils'

const Login = () => {
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [emailValidation, setEmailValidation] = useState(true)
    const [passwordValidation, setPasswordValidation] = useState(true)
    const loginDisableRef = useRef(true);

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
        console.log(password)
        setPassword(password)
    }

    const handleLogin = async () => {
        const loginCall = await fetch('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ email: 'test@rapptrlabs.com', password: 'Test123' })
        })

        const result = await loginCall.json()
        console.log('loginCall req: ', result)
    }

    useEffect(() => {
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
                        <input className={classNames(emailValidation ? '' : 'border-red-400', "w-full border rounded p-2 outline-none focus:shadow-outline")} value={email} onChange={(e) => handleEmail(e.target.value)} type="email" name="email" id="email" placeholder="user@rapptrlabs.com" />
                    </div>
                    <div className="mb-6 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">Password</label>
                        <input className={classNames(passwordValidation ? '' : 'border-red-400', "w-full border rounded p-2 outline-none focus:shadow-outline")} value={password} onChange={(e) => handlePassword(e.target.value)} type="password" name="password" id="password" placeholder="Must be at least 4 characters" />
                    </div>
                    <Link to='/todo'><button disabled={loginDisableRef.current} onClick={handleLogin} className={classNames((email && password) && (emailValidation && passwordValidation) ? '' : 'opacity-50', "w-full border-t border-l-2 border-r-4 border-b-4 border-black shadow-2xl bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded")}>Login</button></Link>
                </form>
            </div>
        </div>
    )
}

export default Login;