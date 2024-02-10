import React from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import UploadProgress from "@/components/uploadProgress";
import UploadPreview from "@/components/uploadPreview";

type ImageUploaderProps = {
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  open: () => void;
  loading: boolean;
  success: boolean;
  progress: number;
  imageUrl: string;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  open,
  loading,
  success,
  progress,
  imageUrl,
}) => {
  return (
    <div className="">
      {!success && (
        <div
          className={` ${loading ? "hidden" : ""} flex justify-center w-full`}
        >
          <div className="dropzone">
            <div {...getRootProps()} className="drag_drop_wrapper">
              <input hidden {...getInputProps()} />
            </div>
            <div className="flex w-full justify-center">
              <button onClick={open} className="dropzone_button">
                Choose a file
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <UploadProgress progress={progress} />}

      {success && <UploadPreview imageUrl={imageUrl} />}
    </div>
  );
};

export default ImageUploader;
