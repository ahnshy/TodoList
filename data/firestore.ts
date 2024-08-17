// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs, getDoc, setDoc, doc, deleteDoc, updateDoc, Timestamp
} from "firebase/firestore";
import exp from "constants";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// get all docs
export async function fetchTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));

  const fetchedTodos = [];
  if (querySnapshot.empty) {
    console.log("fetchedTodos empty.");
    return fetchedTodos;
  }

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());

    const item = {
      id:doc.id,
      title:doc.data()["title"],
      is_done:doc.data()["is_done"],
      create_at:doc.data()["create_at"].toDate(),
      //create_at:doc.data()["create_at"].toDate().toLocaleTimeString('ko'),
    }
    fetchedTodos.push(item);

  });

  return fetchedTodos;
}

// add to do docs
export async function addTodos({ title }) {
  const newItemRef = doc(collection(db, "todos"));

  const createAtTimestamp = Timestamp.fromDate(new Date());

  const newItem = {
    id: newItemRef.id,
    title: title,
    is_done: false,
    create_at: createAtTimestamp
  }

  await setDoc(newItemRef, newItem);

  return newItem;

  // return {
  //     id: newItemRef.id,
  //     title: title,
  //     is_done: false,
  //     create_at: createAtTimestamp.toDate(),
  // };
}

// get to do by id
export async function getTodo(id) {
  if (id === null){
    return null;
  }

  const itemDocRef = doc(db, "todos", id);
  const itemDocSnap = await getDoc(itemDocRef);

  if (itemDocSnap.exists()) {
    console.log("Document data:", itemDocSnap.data());

    const item = {
      id:itemDocSnap.id,
      title:itemDocSnap.data()["title"],
      is_done:itemDocSnap.data()["is_done"],
      create_at:itemDocSnap.data()["create_at"].toDate(),
      //create_at:doc.data()["create_at"].toDate().toLocaleTimeString('ko'),
    }

    return item;

  } else {
    console.log("No Such Document!");
    return null;
  }
}

// delete to do by id
export async function deleteTodo(id) {

  const getedTodo = await getTodo(id);

  if (getedTodo === null) {
    return null;
  }

  await deleteDoc(doc(db, "todos", id));
  return getedTodo;
}

// edit to do by id
export async function updateTodo(id, { title, is_done }) {

  const getedTodo = await getTodo(id);

  if (getedTodo === null) {
    return null;
  }

  const itemRef = doc(db, "todos", id);

  await updateDoc(itemRef, {
    title: title,
    is_done: is_done
  });

  return {
        id: id,
        title: title,
        is_done: is_done,
        create_at: getedTodo.create_at
    };
}

module.exports = { fetchTodos, addTodos, getTodo, deleteTodo, updateTodo }
