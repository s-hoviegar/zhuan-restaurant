import { getDatabase } from "firebase/database";
import { app } from "./firebase-config";

// Initialize Realtime Database and get a reference to the service
const firebaseDb = getDatabase(app);

export default firebaseDb;
