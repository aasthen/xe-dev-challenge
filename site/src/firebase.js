import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { environment } from "./environments/environment"

// Initialize Firebase
const app = initializeApp(environment.firebase);
export const db = getFirestore(app);