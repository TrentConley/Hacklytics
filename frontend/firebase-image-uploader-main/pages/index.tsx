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
const ImageUploaderWrapper = ({
  category,
  onImageUpload,
}: {
  category: string;
  onImageUpload: (imageData: { imageUrl: string; category: string }) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const storageRef = ref(storage, new Date().toISOString());

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

  const uploadImage = async ({ imageFile }: Image) => {
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
            // Return the imageUrl and category when an image is uploaded successfully
            onImageUpload({ imageUrl: downloadURL, category });
          });
        }
      );
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-center">{category}</h2>
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
  );
};

const Home: NextPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [imageData, setImageData] = useState<
    Array<{ imageUrl: string; category: string }>
  >([]);
  const handleImageUpload = (imageData: {
    imageUrl: string;
    category: string;
  }) => {
    setImageData((prevImageData) => [...prevImageData, imageData]);
  };

  const handleSubmit = async () => {
    try {
      console.log("foobar");
      console.log(JSON.stringify(imageData));
      const response = await fetch("http://18.188.69.104:8080/upload/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageData),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const addCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  return (
    <>
      <div>
        <Head>
          <title>Image Uploader</title>
        </Head>
        <div className="flex justify-center mt-10">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="border-2 border-gray-300 rounded-md p-2 mr-2"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white rounded-md p-2"
          >
            Add Category
          </button>
        </div>
        <div className="grid">
          {" "}
          {/* Reduced horizontal gap */}
          {categories.map((category, index) => (
            <div key={index} className="">
              {" "}
              {/* Adjusted height and overflow */}
              <ImageUploaderWrapper
                category={category}
                onImageUpload={handleImageUpload}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-md p-2 flex justify-center  "
        >
          Submit
        </button>
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
