import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

const MAX_FILE_SIZE_MB = 1;
const ALLOWED_FILE_TYPES = ["text/csv"];

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;

    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a CSV");
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }

    setSelectedFiles(files);
    setError(null);
  };

  const handleUpload = () => {
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading file...", formData);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <Box p={3} border="1px dashed #ccc" borderRadius={8} textAlign="center">
      <input
        type="file"
        accept="text/csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="csv-file-input"
      />
      <label htmlFor="csv-file-input">
        <Button variant="outlined" component="span">
          Select Files
        </Button>
      </label>
      {selectedFiles && (
        <div>
          <Typography variant="subtitle1" mt={2}>
            Selected Files:
          </Typography>
          {selectedFile.map(file => (
            <Typography>{file.name}</Typography>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            mt={2}
          >
            Upload
          </Button>
        </div>
      )}
      {error && (
        <Typography variant="body2" color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;