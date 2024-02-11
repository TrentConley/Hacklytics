import React, { useEffect, useState, FC, useCallback } from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";
import { useDropzone } from "react-dropzone";
import Header from "@/components/header";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD9FC__UnUnIC7fDQmZqpkFL_-b5hI7pFg",
  authDomain: "hacklytics-fa91a.firebaseapp.com",
  projectId: "hacklytics-fa91a",
  storageBucket: "hacklytics-fa91a.appspot.com",
  messagingSenderId: "189681439764",
  appId: "1:189681439764:web:b053fd6bce8060b5958301",
  measurementId: "G-PBJQP1Z520",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Classifier: FC = () => {
  const [buttonNames, setButtonNames] = useState<string[]>([]);
  const [selectedButton, setSelectedButton] = useState<number | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      uploadImage({ imageFile: file });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop,
  });
  const [buttonModelMap, setButtonModelMap] = useState<{ [key: string]: any }>(
    {}
  );
  const uploadImage = async ({ imageFile }: { imageFile: Blob }) => {
    try {
      setLoading(true);
      const storageRef = ref(storage, new Date().toISOString());
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setLoading(false);
            setSuccess(true);
          });
        }

        // after upload image, then call post to your sever with model name and image url
      );
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchButtonNames = async () => {
      try {
        const response = await axios.get(
          "https://3deb-2610-148-205b-0-7004-5839-c13d-e1c7.ngrok-free.app/getModels"
        );
        const modelID = (response.data as Array<Array<any>>).map(
          (item) => item[0]
        );

        const buttonNames = (response.data as Array<Array<any>>).map(
          (item) => item[1]
        );

        const newButtonModelMap: { [key: string]: any } = {};
        for (let i = 0; i < buttonNames.length; i++) {
          newButtonModelMap[buttonNames[i]] = modelID[i];
        }

        setButtonModelMap(newButtonModelMap);

        setButtonNames(buttonNames);

        console.log(response.data[0][1]);
        // setButtonNames(response.data);
        console.log(`got names`);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch button names:", error);
      }
    };

    fetchButtonNames();
  }, []);

  const submitImage = async () => {
    const model =
      buttonModelMap[buttonNames[selectedButton ? selectedButton : 0]];
    console.log(model);
    const response = await fetch(
      `https://3deb-2610-148-205b-0-7004-5839-c13d-e1c7.ngrok-free.app/classify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          model,
        }),
      }
    );
    console.log(response);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/robotichand.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <select
          value={selectedButton}
          onChange={(e) => setSelectedButton(Number(e.target.value))}
          style={{
            fontSize: "2em", // Increase the text size
            height: "2em",
            width: "20%",
            marginBottom: "1em", // Add padding to the bottom
            backgroundColor: "#E8E8E8",
          }}
        >
          {buttonNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>
        {selectedButton !== null && (
          <div style={{ width: "50%", height: "75%", marginBottom: "1em" }}>
            <ImageUploader
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              open={open}
              loading={loading}
              success={success}
              progress={progress}
              imageUrl={imageUrl}
            />
          </div>
        )}
        <button
          onClick={submitImage}
          style={{
            background: "black",
            color: "gold",
            border: "1px solid",
            backgroundImage: "linear-gradient(to right, gold, black)",
            padding: "10px 20px",
            fontSize: "1em",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1em",
          }}
        >
          Submit Image
        </button>
      </div>
    </div>
  );
};
export default Classifier;
