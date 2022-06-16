// import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const Login = () => {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('');
	}, [email, password])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			var response = await axios.post('auth/signin', JSON.stringify({ email, password }),
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			var accessToken = response?.data?.userData?.accessToken
			var roles = response?.data?.userData?.roles
			
			response = await axios.get(`usuarios/${response?.data?.userData?.userId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'access_token': accessToken
				}
			}
		);

			var displayName = response?.data?.displayName

			// setAuth({ email, password, roles, accessToken })
			setAuth({ email, roles, accessToken, displayName})
			setEmail('')
			setpassword('')

			navigate(from, { replace: true })

		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();

		}
	}

	return (
		<section>
			<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

			<h1>Iniciar sesión</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Correo electrónico:</label>
				<input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} required />
				<label htmlFor="password">Contraseña:</label>
				<input type="password" id="password" onChange={(e) => setpassword(e.target.value)} value={password} required />

				<button>Sign In</button>
			</form>

			{/* <p>
                <span className="line">
                    <Link to="/register">¿Quieres registrarte?</Link>
                </span>
            </p> */}
		</section>
	)
}

export default Login