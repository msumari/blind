import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../fire";
import { Link } from "react-router-dom";

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
          localStorage.setItem("url", JSON.stringify(downloadURL));
        });
      }
    );
    setFile("");
  };

  const cancelUpload = () => {
    uploadTask.cancel();
  };

  return (
    <div className="bg-gray-700 w-full grid place-items-center text-white">
      <h1 className="py-3 font-semibold text-xl uppercase underline">
        Notes Uploader
      </h1>
      <div className="px-1 grid place-items-center">
        <label
          for="dropzone-file"
          className="flex flex-col justify-center items-center w-full h-64  rounded-lg border-2  border-dashed cursor-pointer hover:bg-bray-800 bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
        >
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            {file ? (
              <h1>{file.name}</h1>
            ) : (
              <>
                <svg
                  class="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-400">
                  <span class="font-semibold">Click to upload</span>
                  or drag and drop
                </p>
                <p class="text-xs text-gray-400">PDF (MAX. 100 Mb)</p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            onChange={handleChange}
            className="hidden"
            accept="application/pdf"
          />
        </label>
        <div className="py-5">
          <button onClick={handleUpload} className="bg-lime-600 rounded p-2 ">
            Upload Notes
          </button>
          <p className="text-center py-2 font-bold">{percent} %</p>
          {100 > percent > 0 && (
            <button onClick={cancelUpload} className="bg-red-600 rounded p-2 ">
              Cancel Upload
            </button>
          )}
        </div>
      </div>
      <Link to="/">
        <button className="text-white text-xl bg-white rounded-full p-1">
          👨‍🎓
        </button>
      </Link>
    </div>
  );
}

export default Upload;
