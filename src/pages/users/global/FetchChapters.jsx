import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebaseConfig";

const fetchChapters = async (projectId) => {
    const projectRef = doc(db, 'projects', projectId);
    const chaptersRef = collection(projectRef, 'chapters');

    // Create a query to order by a specific field, e.g., "createdAt"
    const q = query(chaptersRef, orderBy('createdAt', 'asc'));

    const querySnapshot = await getDocs(q);

    const chapters = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return chapters;
};

export {fetchChapters}