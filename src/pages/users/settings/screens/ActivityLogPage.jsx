import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../../../../utils/firebase/firebaseConfig';

const ActivityLogPage = () => {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    const [userActivities, setUserActivities] = useState([]);
    const fetchActivities = async () => {
        const userRef = doc(db, 'users', userData.userID);
        const activitiesRef = collection(userRef, 'activity');

        // Create a query to order by a specific field, e.g., "createdAt"
        const q = query(activitiesRef, orderBy('createdAt', 'asc'));

        const querySnapshot = await getDocs(q);

        const activities = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return activities;
    };

    const loadUserActivities = async () => {
        try {
            const activityData = await fetchActivities();
            setUserActivities(activityData);
        } catch (err) {
            console.error("Error fetching chapter details: ", err);
            // setError("Failed to load chapter details.");
        }
    };

    useEffect(() => {
        loadUserActivities();
    }, []);


  return (
    <div>
        {
            userActivities ? 
                userActivities.map((activity, index) => (
                    <div key={index} className='w-full h-fit p-3'>
                        {activity.id}
                    </div>
                )) : <></>
        }
    </div>
  )
}

export default ActivityLogPage