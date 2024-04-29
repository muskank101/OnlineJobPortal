import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Axios from "axios";

import { SetPopupContext } from "../App";

// const FileUploadInput = (props) => {
//   const setPopup = useContext(SetPopupContext);

//   const { uploadTo, identifier, handleInput } = props;

//   const [file, setFile] = useState("");
//   const [uploadPercentage, setUploadPercentage] = useState(0);

//   const handleUpload = () => {
//     console.log(file);
//     const data = new FormData();
//     data.append("file", file);
//     Axios.post(uploadTo, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         setUploadPercentage(
//           parseInt(
//             Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           )
//         );
//       },
//     })
//       .then((response) => {
//         console.log(response.data);
//         handleInput(identifier, response.data.url);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//       })
//       .catch((err) => {
//         console.log(err.response);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.statusText,
//           //   message: err.response.data
//           //     ? err.response.data.message
//           //     : err.response.statusText,
//         });
//       });
//   };

//////////// from ChatGPT // still not working!
const FileUploadInput = (props) => {
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;

  const [file, setFile] = useState(null); // Changed initial state to null

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update file state with the selected file
  };

  const handleUpload = () => {
    // Check if a file is selected
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
      .then((response) => {
        console.log(response.data);
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.statusText,
        });
      });
  };
///////////// frontend
  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: "100%", height: "100%" }}
          >
            {props.icon}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                console.log(event.target.files);
                setUploadPercentage(0);
                setFile(event.target.files[0]);
              }}
              // onChange={onChange}
              // onChange={
              //   (e) => {}
              //   //   setSource({ ...source, place_img: e.target.files[0] })
              // }
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            label={props.label}
            value={file ? file.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
            
          /> */}
          <input type="file" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => handleUpload()}
            disabled={file ? false : true}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FileUploadInput;