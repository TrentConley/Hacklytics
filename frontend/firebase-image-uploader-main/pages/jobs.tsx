import React, { useEffect, useState, FC } from "react";
import axios from "axios";

const Classifier: FC = () => {
  const [buttonNames, setButtonNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchButtonNames = async () => {
      try {
        const response = await axios.get("http://18.188.69.104:5000/getModels");
        setButtonNames(response.data);
      } catch (error) {
        console.error("Failed to fetch button names:", error);
      }
    };

    fetchButtonNames();
  }, []);

  return (
    <div>
      {buttonNames.map((name, index) => (
        <button key={index} style={{ margin: "10px" }}>
          {name}
        </button>
      ))}
    </div>
  );
};

export default Classifier;
