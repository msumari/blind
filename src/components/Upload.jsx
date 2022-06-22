import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../fire";

function Upload() {
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "cancel":
            console.log("Upload is canceled");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (err) => {
        console.log(err);
        alert(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const cancelUpload = () => {
    uploadTask.cancel();
  };

  return (
    <div className="bg-gray-700 w-full grid place-items-center text-white">
      <h1>Instructor</h1>
      <input type="file" onChange={handleChange} accept="application/pdf" />
      <button onClick={handleUpload} className="bg-lime-600 rounded p-2 ">
        Upload Notes
      </button>
      <p>{percent} "% done"</p>
      {100 > percent > 0 && (
        <button onClick={cancelUpload} className="bg-red-600 rounded p-2 ">
          Cancel Upload
        </button>
      )}
    </div>
  );
}

export default Upload;
