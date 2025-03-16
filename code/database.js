
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const studentsCollectionRef = collection(db, "students");


export const addStudent = async (student) => {
    try {
        const docRef = await addDoc(studentsCollectionRef, student);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};


export const getAllStudents = async () => {
    const data = await getDocs(studentsCollectionRef);
    return data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const updateStudent = async (student) => {
    const studentDoc = doc(db, "students", student.id);
    try {
        await updateDoc(studentDoc, {
            firstName: student.firstName,
            middleName: student.middleName,
            lastName: student.lastName,
            img: student.img 
        });
        console.log("Document updated:", student.id);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};


export const deleteStudent = async (id) => {
    const studentDoc = doc(db, "students", id);
    try {
        await deleteDoc(studentDoc);
        console.log("Document deleted:", id);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};