import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../../../../utils/firebase/firebaseConfig';
import ActivityCard from '../../../../components/ActivityCard';

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
    <div className='p-5'>
        <center><h1 className='font1 p-5'>Activities</h1></center>
        <div className='flex flex-col gap-y-2 overflow-y-auto'>
            {
                userActivities && userActivities.length > 0 ? 
                    userActivities.map((activity, index) => {
                        const type = activity.type === "like-comment" ? "like" : 
                                     activity.type === "dislike-comment" ? "dislike" :
                                     activity.type === "comment" ? "comment" : "";
                        console.log(type);
                        return <ActivityCard dateTime={activity.createdAt} key={index} comment={activity.actMessage} id={activity.commentID} type={type} />;
                    }) : <p>No activities found.</p>
            }
        </div>
    </div>
)
}

export default ActivityLogPage