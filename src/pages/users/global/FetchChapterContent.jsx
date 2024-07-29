import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebaseConfig";

const fetchChapterContents = async (projectId, chapterId) => {
    try {
        const chapterRef = doc(db, 'projects', projectId, 'chapters', chapterId);
        const chapterSnap = await getDoc(chapterRef);

        if (chapterSnap.exists()) {
            return chapterSnap.data();
        } else {
            throw new Error("No such document!");
        }
    } catch (error) {
        console.error("Error fetching chapter: ", error);
        throw error;
    }
};

export {fetchChapterContents}