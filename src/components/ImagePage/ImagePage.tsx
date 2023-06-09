import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ImagePage.css";

interface ImagePageProps {
  prompt: string;
  location: any;
}

const ImagePage: React.FC<ImagePageProps> = ({ location }) => {
  const [image, setImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const prompt = location.state?.prompt;
    console.log("HERE:", prompt);
    const generateImage = async () => {
      try {
        const response = await fetch(
          "https://fiction-fountain.herokuapp.com/generate-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
          }
        );

        const data = await response.json();
        console.log("HEEEEEREEEE:", data);
        if (response.status !== 200) {
          throw new Error("Error generating image:", data);
        } else {
          setImage(data.image);
        }
      } catch (error) {
        console.error("Error generating image:", error);
      }
    };

    generateImage();
  }, [location]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="ImagePage">
      <h1>Your Generated Image</h1>
      {image ? (
        <div className="image">
          <img src={image} alt="prompted" />
        </div>
      ) : (
        <p>One Moment, Bringing Your Image to Life...</p>
      )}
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};
export default ImagePage;
