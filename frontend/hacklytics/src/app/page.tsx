import Image from "next/image";
import ChooseCategories from "../components/choose-categories";
import { UploadImages } from "@/components/upload-images";

export default function Home() {
  return (
    <div>
      <ChooseCategories />
      <UploadImages />
    </div>
  );
}
