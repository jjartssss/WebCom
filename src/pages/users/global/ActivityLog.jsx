import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebaseConfig";

const user = localStorage.getItem('user');
const userData = JSON.parse(user);

const AddDataToActivityLog = async (data) => {
    try {
        const userRef = doc(db, "users", userData.userID);
        const activityRef = collection(userRef, 'activity');
        await addDoc(activityRef, data).then(
            // alert("Added Reply"),
            console.log("Success adding activity log")
        )
    } catch (error) {
        console.error("Error adding reply", error);
    }
}

export {AddDataToActivityLog}