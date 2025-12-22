import React, { useState } from "react";
import axios from "axios";

export default function Test() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.imageUrl) {
        setImageUrl(res.data.imageUrl);
      } else {
        throw new Error("Invalid server response");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(
        err.response?.data?.error ||
        err.response?.data?.details ||
        err.message ||
        "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cloudinary Image Upload Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Public URL:</strong>{" "}
            <a href={imageUrl} target="_blank" rel="noreferrer">
              {imageUrl}
            </a>
          </p>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ height: "150px", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}
