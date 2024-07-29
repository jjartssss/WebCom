import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();
  const [inputs, setInputs] = useState({username: '', email: '', password: ''});
  const user = localStorage.getItem('user')
  const userData = JSON.parse(user);
  const HandleInputs = (event) => {
    const {name, value} = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const HandleLogin = async (e) => {

  }
  useEffect(() => {
    if (userData.userID !== "" || userData.userID !== null) {
      navigate('/user')
    }
  }, []);
  
  return (
    <div className='flex justify-center items-center w-full h-screen bg-blue-950'>
      <div className='w-fit h-fit p-10 bg-slate-50 rounded-xl '>
        <form onSubmit={HandleLogin} className='flex flex-col gap-y-5 '>
          {/* <label className='self-center'>LOGIN HERE</label> */}
          <input name='username' value={inputs.username} onChange={HandleInputs} className='inp-def' required type='text' placeholder='Username'></input>
          <input name='email' value={inputs.email} onChange={HandleInputs} className='inp-def' required type='email' placeholder='Email'></input>
          <input name='password' value={inputs.password} onChange={HandleInputs} className='inp-def' required type='password' placeholder='Password'></input>
          <button type='submit' className='btn-pri'>Create Account</button>
          <label className='text-center'>Already have an account? <b onClick={()=> navigate('/login')} className="cursor-pointer text-blue-600">Login</b> </label>
        </form>
      </div>
    </div>
  );
}

export default SignupPage