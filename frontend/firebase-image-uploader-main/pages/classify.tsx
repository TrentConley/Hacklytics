import React, { useEffect, useState, FC, useCallback } from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";
import { useDropzone } from "react-dropzone";
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
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
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
        const response = await axios.get("http://18.188.69.104:5000/getModels");
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
    const response = await fetch(`http://18.188.69.104:5000/classify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl,
        model,
      }),
    });
    // handle the response here
  };

  return (
    <div>
      {buttonNames.map((name, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <button onClick={() => setSelectedButton(index)}>{name}</button>
          {selectedButton === index && (
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
          )}
        </div>
      ))}
      <button onClick={submitImage}>Submit</button>
    </div>
  );
};

export default Classifier;
