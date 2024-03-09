import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getDatabase, ref} from "firebase/database";
import { getStorage, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import {useState} from "react";


const firebaseConfig = {
  apiKey: "AIzaSyCpxclXBc4XFWTubnSN4QC0ARtMDSraUAs",
  authDomain: "project-2be95.firebaseapp.com",
  databaseURL: "https://project-2be95-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-2be95",
  storageBucket: "project-2be95.appspot.com",
  messagingSenderId: "997061651648",
  appId: "1:997061651648:web:f7d0cb0fb792e1ecbb1125"
  };

const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getDatabase(app);
 export const storage = getStorage(app);


 export const FileUploader = () => {
     const [file, setFile] = useState("");

     // progress
     const [percent, setPercent] = useState(0);

     // Handle file upload event and update state
     function handleChange(event) {
         setFile(event.target.files[0]);
     }

     const handleUpload = () => {
         if (!file) {
             alert("Please upload an image first!");
         }

         const storageRef = ref(storage, `/files/${file.name}`);

         // progress can be paused and resumed. It also exposes progress updates.
         // Receives the storage reference and the file to upload.
         const uploadTask = uploadBytesResumable(storageRef, file);

         uploadTask.on(
             "state_changed",
             (snapshot) => {
                 const percent = Math.round(
                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                 );

                 // update progress
                 setPercent(percent);
             },
             (err) => console.log(err),
             () => {
                 // download url
                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                     console.log(url);
                 });
             }
         );
     };

     return (
         <div>
             <input type="file" onChange={handleChange} accept="/image/*" />
             <button onClick={handleUpload}>Upload to Firebase</button>
             <p>{percent} "% done"</p>
         </div>
     );
 }

