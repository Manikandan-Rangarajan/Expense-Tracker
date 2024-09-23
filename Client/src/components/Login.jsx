import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {


    const USER_REGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const CLASS_REGX3 = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PASS_REGX2 = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const userRef = useRef(); 
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [classSec, setClassSec] = useState('');
    const [validclassSec, setValidClassSec] = useState(false);
    const [classFocus, setClassFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus(); 
    }, []);

    useEffect(() => {
        setValidName(USER_REGX.test(user));
    }, [user]);

    useEffect(() => {
        setValidClassSec(CLASS_REGX3.test(classSec));
    }, [classSec]);

    useEffect(() => {
        setValidPwd(PASS_REGX2.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/sign-in', { user, pwd, classSec });
            
            if (response.status === 201) {
              alert('User created successfully.Now pls login in the sign-in page');
              navigate('/')
            }
          } catch (error) {
              alert('error occured change the username and try');
              console.error(error);
          }
    }

    return (
        <> 
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-xl">
            <p ref={errRef} className={errMsg ? "errmsg" : "hidden"} aria-live="assertive">{errMsg}</p>
            <h1 className="text-black font-bold m-[30px] p-[10px]">SIGN-UP</h1>
            <form onSubmit={handleSubmit} action="POST" className="min-w-6 min-h-19 flex flex-col justify-center items-center text-gray-600 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
               
                <label className="font-bold m-[30px] mb-[0px]" htmlFor="username">Username:
                    <span className={validName ? "valid" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={!validName || !user ? "invalid" : "hidden"}><FontAwesomeIcon icon={faTimes}/></span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    placeholder="Username"
                    className="border border-gray-600 rounded"
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden" }>
                <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label className="font-bold m-[30px] mb-[0px]" htmlFor="confirm_pwd">Class & Section:</label>
                <input
                    type="text"
                    id="classSec"
                    onChange={(e) => setClassSec(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    onFocus={() => setClassFocus(true)}
                    onBlur={() => setClassFocus(false)}
                    placeholder="Class section"
                    className="border border-gray-600 rounded"
                />

                <label className="font-bold m-[30px] mb-[0px]" htmlFor="password">Password:
                    <span className={validPwd ? "valid" : "hidden"}><FontAwesomeIcon icon={faCheck}/></span>
                    <span className={validPwd || !pwd ? "hidden" : "invalid"}><FontAwesomeIcon icon={faTimes}/></span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    placeholder="Password"
                    className="border border-gray-600 rounded"
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hidden"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                    Allowed special characters: !@#$%
                </p>

                <label className="font-bold m-[30px] mb-[0px]" htmlFor="confirm_pwd">Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck}/></span>
                    <span className={validMatch || !matchPwd ? "hidden" : "invalid"}><FontAwesomeIcon icon={faTimes}/></span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    placeholder="Confirm Password"
                    className="border border-gray-600 rounded"
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hidden"}>
                    Must match the first password input field.
                </p>
                

                <button
                  type="submit"
                  className="bg-black text-white font-bold py-2 px-4 my-5 rounded hover:cursor-pointer hover:bg-green-400 hover:text-black" 
                  disabled={!validName || !validPwd || !validMatch}>
                    Sign Up
                </button>
            </form>
        </div>
     </>
  );
}

export default Login