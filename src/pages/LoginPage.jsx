import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const LoginPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, 'users'));
        
    //     // Transforming the documents into an array of data objects
    //     const data = querySnapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()  // Spread the document data
    //     }));

    //     // Setting the state with the transformed data
    //     setItems(data);

    //     // Optional: Log the fetched data to the console for verification
    //     console.log('Fetched items:', data);
    //   } catch (error) {
    //     console.error('Error fetching documents: ', error);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-screen bg-blue-950'>
      <div className='w-fit h-fit p-10 bg-slate-50 rounded-xl '>
        <form className='flex flex-col gap-y-5 '>
          <label className='self-center'>LOGIN HERE</label>
          <input className='inp-def' required type='text' placeholder='Username'></input>
          <input className='inp-def' required type='password' placeholder='Password'></input>
          <button type='submit' className='btn-pri'>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
