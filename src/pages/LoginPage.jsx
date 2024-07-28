import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import GmailIcon from '../assets/icons/gmail.png';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [inputs, setInputs] = useState({ username: '', password: '' });

  useEffect(() => {
    // Check for redirect results after sign-in
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          localStorage.setItem('user', JSON.stringify({
            username: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            userID: user.uid
          }));

          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            username: user.displayName,
            email: user.email,
            password: '',
            photoURL: user.photoURL,
            userID: user.uid,
            lastLogin: new Date()
          });
          navigate('/user');
        }
      } catch (error) {
        console.error('Error during Google sign-in with redirect', error);
      }
    };

    fetchRedirectResult();
  }, [navigate]);

  const LoginWithGmail = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error during Google sign-in', error);
    }
  };

  if (user) {
    navigate('/user');
  }

  const HandleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const HandleLogin = async (e) => {
    // Your login logic here
  };

  return (
    <div className='flex justify-center items-center w-full h-screen bg-blue-950'>
      <div className='w-fit h-fit p-10 bg-slate-50 rounded-xl '>
        <form onSubmit={HandleLogin} className='flex flex-col gap-y-5 '>
          <input name='username' value={inputs.username} onChange={HandleInputs} className='inp-def' required type='text' placeholder='Username'></input>
          <input name='password' value={inputs.password} onChange={HandleInputs} className='inp-def' required type='password' placeholder='Password'></input>
          <button type='submit' className='btn-pri'>LOGIN</button>
          <label className='text-center'>or</label>
          <img onClick={LoginWithGmail} src={GmailIcon} className='cursor-pointer self-center w-[30px]' alt="Login with Google" />
          <label className='text-center'>Doesn't have an account? <b onClick={() => navigate('/signup')} className="cursor-pointer text-blue-600">Signup</b> </label>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
