import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    }
  };

  const handleSubmission = () => {
    // TODO: Write the function to upload the image to Google Drive
  };

  return (
    <div className="w-full max-w-3xl p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Upload Image</h2>
      <div className="mt-4">
        <input type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div>
            <p>Filename: {selectedFile?.name}</p>
            <p>Filetype: {selectedFile?.type}</p>
            <p>Size in bytes: {selectedFile?.size}</p>
            <div>
              <Button className="mt-2" onClick={handleSubmission}>
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
      </div>
    </div>
  );
}
// prompt: create a component that is exported that includes an upload box. The user should be able to upload their images in this folder. include function stubs for function that need to be included such as when the user uploads the image, where the image is written to like a googl drive. include tailwind css to style to look clean.
