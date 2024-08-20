import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Stack } from '@mui/system';

const MAX_FILE_SIZE_MB = 1;
const ALLOWED_FILE_TYPES = ["text/csv"];

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.filter(file => ALLOWED_FILE_TYPES.includes(file.type) && file.size > MAX_FILE_SIZE_MB * 1024 * 1024)
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      axios.postForm('http://localhost:9222/upload', {
        "expenditures": selectedFiles
      })
    } else {
      console.error('No files selected');
    }
  };

  return (
    <Box p={3} border="1px dashed" borderColor={(theme => theme.palette.primary.dark)} borderRadius={8} textAlign="center">
      <input
        type="file"
        accept="text/csv"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="multiple-file-input"
      />
      <label htmlFor="multiple-file-input">
        <Button variant="outlined" component="span">
          Select Files
        </Button>
      </label>
      {selectedFiles.length > 0 && (
        <Stack>
          <Typography variant="subtitle1" mt={2}>
            Selected Files:
          </Typography>
          {selectedFiles.map(file => (
            <Typography variant="caption">{file.name}</Typography>
          ))}
          <Button variant="contained" color="primary" onClick={handleUpload} mt={2}>
            Upload
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default FileUpload;