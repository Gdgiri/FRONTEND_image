import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const Upload = () => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (video) {
      uploadFile(video, "videoUrl");
    }
  }, [video]);

  useEffect(() => {
    if (img) {
      uploadFile(img, "imgUrl");
    }
  }, [img]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "imgUrl" ? "images/" : "videos/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (fileType === "imgUrl") {
          setImgPerc(Math.round(progress));
        } else {
          setVideoPerc(Math.round(progress));
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          setInputs((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", inputs); // Log data
      await axios.post("http://localhost:5000/api/video", inputs);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h4>Upload Files</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="video">Video:</label>
                  {videoPerc > 0 && (
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${videoPerc}%` }}
                        aria-valuenow={videoPerc}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {videoPerc}%
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control-file"
                    name="video"
                    id="video"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="img">Image:</label>
                  {imgPerc > 0 && (
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${imgPerc}%` }}
                        aria-valuenow={imgPerc}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {imgPerc}%
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control-file"
                    name="img"
                    id="img"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
