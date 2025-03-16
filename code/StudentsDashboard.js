import React, { useState, useEffect } from "react";
import {
    FaUserEdit,
    FaTrash,
    FaPlus,
    FaChalkboardTeacher,
    FaSignOutAlt,
} from "react-icons/fa";
import { db } from './firebase'; 
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';

const defaultAvatar = ""; 

const StudentDashboard = ({ handleLogout }) => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        img: defaultAvatar,
    });
    const [editingStudent, setEditingStudent] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const loadStudents = async () => {
            const studentsFromDB = await getAllStudents();
            setStudents(studentsFromDB);
        };
        loadStudents(); // Load students on component mount
    }, []);

    const getAllStudents = async () => {
        const studentsCollection = collection(db, "students");
        const studentSnapshot = await getDocs(studentsCollection);
        return studentSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingStudent) {
            await updateStudent(editingStudent.id, newStudent);
        } else {
            await addStudent(newStudent);
        }

        resetForm();
        await refreshStudents();
    };

    const addStudent = async (studentData) => {
        await addDoc(collection(db, "students"), studentData);
    };

    const updateStudent = async (id, studentData) => {
        const studentRef = doc(db, "students", id);
        await updateDoc(studentRef, studentData);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setNewStudent({
            firstName: student.firstName,
            middleName: student.middleName,
            lastName: student.lastName,
            img: student.img,
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "students", id));
        await refreshStudents();
    };

    const refreshStudents = async () => {
        const studentsFromDB = await getAllStudents();
        setStudents(studentsFromDB);
    };

    const resetForm = () => {
        setNewStudent({ firstName: "", middleName: "", lastName: "", img: defaultAvatar });
        setEditingStudent(null);
        setShowAddForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // For display purposes only
            setNewStudent((prev) => ({ ...prev, img: imageUrl }));
        }
    };

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}><FaChalkboardTeacher /> Dashboard</h2>
                <button onClick={() => setShowAddForm(true)} style={styles.addButton}><FaPlus /> Add Student</button>
                <button onClick={handleLogout} style={styles.logoutButton}><FaSignOutAlt /> Log Out</button>
            </aside>
            <main style={styles.content}>
                <h2 style={styles.header}>Student Dashboard</h2>
                {showAddForm && (
                    <div style={styles.formContainer}>
                        <h3 style={styles.subHeader}>{editingStudent ? "Edit Student" : "Add New Student"}</h3>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <input type="text" name="firstName" value={newStudent.firstName} onChange={handleInputChange} placeholder="First Name" required style={styles.input} />
                            <input type="text" name="middleName" value={newStudent.middleName} onChange={handleInputChange} placeholder="Middle Name" style={styles.input} />
                            <input type="text" name="lastName" value={newStudent.lastName} onChange={handleInputChange} placeholder="Last Name" required style={styles.input} />
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} />
                            <button type="submit" style={styles.button}>{editingStudent ? "Update Student" : "Add Student"}</button>
                            <button type="button" onClick={resetForm} style={styles.cancelButton}>Cancel</button>
                        </form>
                    </div>
                )}
                <div style={styles.studentGrid}>
                    {students.map((student) => (
                        <div key={student.id} style={styles.card}>
                            <img src={student.img || defaultAvatar} alt="Profile" style={styles.profilePic} />
                            <h4 style={styles.name}>{student.firstName} {student.middleName} {student.lastName}</h4>
                            <div style={styles.cardButtons}>
                                <button onClick={() => handleEdit(student)} style={styles.smallButton}><FaUserEdit /></button>
                                <button onClick={() => handleDelete(student.id)} style={styles.deleteButton}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// Styling as before
const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        background: "#f9f9f9",
        color: "#333",
        fontFamily: "Arial, sans-serif"
    },
    sidebar: {
        width: "250px",
        background: "#ffffff",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    sidebarTitle: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333"
    },
    addButton: {
        padding: "10px 15px",
        background: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s"
    },
    logoutButton: {
        padding: "10px 15px",
        background: "#ff7373",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },
    content: {
        flex: 1,
        padding: "20px"
    },
    header: {
        fontSize: "32px",
        marginBottom: "20px",
        textAlign: "center",
        color: "#444"
    },
    formContainer: { marginBottom: "20px" },
    studentGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
    },
    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer"
    },
    profilePic: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px"
    },
    name: {
        fontSize: "20px",
        fontWeight: "600",
        margin: "10px 0",
        color: "#333"
    },
    cardButtons: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
    },
    smallButton: {
        margin: "5px",
        padding: "8px 12px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background 0.3s"
    },
    deleteButton: {
        margin: "5px",
        padding: "8px 12px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background 0.3s"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    input: {
        padding: "12px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        outline: "none"
    },
    fileInput: {
        border: "none",
        marginBottom: "10px"
    },
    button: {
        padding: "12px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background 0.3s"
    },
    cancelButton: {
        padding: "12px",
        backgroundColor: "#ff5757",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background 0.3s"
    }
};

export default StudentDashboard;