import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase/firebaseConfig';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import GmailIcon from '../assets/icons/gmail.png'
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const LoginPage = () => {
  const provider = new GoogleAuthProvider();
  const user = localStorage.getItem('user')
  const userData = JSON.parse(user);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [inputs, setInputs] = useState({username: '', password: ''});
  useEffect(() => {
    if (user) {
      if (userData.userID !== "" || userData.userID !== null) {
        navigate('/user')
      }
    }
  }, []);

  const LoginWithGmail = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      localStorage.setItem('user', JSON.stringify({
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userID: user.uid
      }))

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        username: user.displayName,
        email: user.email,
        password:'',
        photoURL: user.photoURL,
        userID: user.uid,
        lastLogin: new Date()
      })
      navigate('/user')

    } catch (error) {
      console.error('Error during Google signin', error);
    }
  }
  const HandleInputs = (event) => {
    const {name, value} = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const HandleLogin = async (e) => {

  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-blue-950'>
      <div className='w-fit h-fit p-10 bg-slate-50 rounded-xl '>
        <form onSubmit={HandleLogin} className='flex flex-col gap-y-5 '>
          {/* <label className='self-center'>LOGIN HERE</label> */}
          <input name='username' value={inputs.username} onChange={HandleInputs} className='inp-def' required type='text' placeholder='Username'></input>
          <input name='password' value={inputs.password} onChange={HandleInputs} className='inp-def' required type='password' placeholder='Password'></input>
          <button type='submit' className='btn-pri'>LOGIN</button>
          <label className='text-center'>or</label>
          <img onClick={()=>LoginWithGmail()} src={GmailIcon} className='cursor-pointer self-center w-[30px]'/>
          <label className='text-center'>Doesn't have an account? <b onClick={() => navigate('/signup')} className="cursor-pointer text-blue-600">Signup</b> </label>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
