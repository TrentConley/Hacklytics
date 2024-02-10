import React, { useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PhotographIcon } from "@heroicons/react/solid";
import { useDropzone } from "react-dropzone";
// import axios from "axios";
import initFirebase from "@/lib/firebaseInit";
import ImageUploader from "@/components/ImageUploader";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import UploadProgress from "@/components/uploadProgress";
import UploadPreview from "@/components/uploadPreview";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const storageRef = ref(storage, new Date().toISOString());
type Image = {
  imageFile: Blob;
};

const Home: NextPage = () => {
  let [progress, setProgress] = useState<number>(0);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // Upload files to storage
    const file = acceptedFiles[0];
    uploadImage({ imageFile: file });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  //Using Cloudinary
  // sample comment

  // const uploadImage = async ({ imageFile }: Image) => {
  //   setLoading(false);
  //   const uploadURL = process.env.NEXT_PUBLIC_UPLOAD_URL as string;
  //   const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
  //   const formData = new FormData();
  //   try {
  //     formData.append("file", imageFile);
  //     formData.append("upload_preset", uploadPreset);
  //     const response = await axios.post(uploadURL, formData, {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     });
  //     console.log(response.data);
  //     setLoading(false);
  //   } catch (e: any) {
  //     console.log(e.message);
  //     setLoading(false);
  //   }
  // };

  // Firebase Storage

  const uploadImage = async ({ imageFile }: Image) => {
    try {
      setLoading(true);
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
      );
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>Image Uploader</title>
        </Head>
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

        <footer className="bottom-0 my-3">
          <div className="flex w-full justify-center mb-0">
            <p className="text-center tracking-tight">
              Designed & Developed by{" "}
              <a
                href="https://machindustries.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-600 transition"
              >
                Trent Conley
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
