// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuYQDUJWY9V4tYk5wiUGwyP5fnwsXDyDw",
    authDomain: "todo-list-guillermo.firebaseapp.com",
    projectId: "todo-list-guillermo",
    storageBucket: "todo-list-guillermo.appspot.com",
    messagingSenderId: "809651561667",
    appId: "1:809651561667:web:7cbe25fdb422156ec72e76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function getTasks() {
    const allTasks = [];


    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return allTasks
}

export async function addTask(taskName) {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            name: taskName,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function editDocument(name, id) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        name: name,
        completed: true,
    });
}