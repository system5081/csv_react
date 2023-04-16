import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Modal from "react-modal";

import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { Fab } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { useMediaQuery } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';



import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PhotoIcon from '@mui/icons-material/Photo';
import PostAddIcon from '@mui/icons-material/PostAdd';

const TextAlignContainer = styled(Container)(({ theme }) => ({
    textAlign: "center",
}));

const TextAlignGrid = styled(Grid)(({ theme }) => ({
    textAlign: "center",
}));

const Main = () => {
    Modal.setAppElement("#root");
    const {
        title,
        setTitle,
        csv,
        setCsv,
        thum,
        modalIsOpen,
        setModalIsOpen,
        newCsv,
    } = useContext(ApiContext);

    const customStyles = {
        content: {
          top: "30%",
          left: "43%",
          right: "auto",
          bottom: "auto",
        },
    };
    const isMediumScreen = useMediaQuery("(max-width: 1050px) and (min-width: 601px)");
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleEditMovie = () => {
        const fileInput = document.getElementById("csvInput");
        fileInput.click();
    };


    const PaddedSmallGrid = styled(Grid)(({ theme }) => ({
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    }));

    const PaddedMediumGrid = styled(Grid)(({ theme }) => ({
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(0),
    }));

    const CenterTypography = styled(Typography)(({ theme }) => ({
        textAlign: 'center',
      }));

  return (
    <>
      <TextAlignGrid>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>

            <Grid item xs={1}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => setModalIsOpen(true)}
              >
                <AddCircleIcon />
              </Fab>
            </Grid>
            <Grid item xs={isSmallScreen ? 12 : isMediumScreen ? 11 : 8}>

            </Grid>

            <Grid item xs={isSmallScreen ? 12 : isMediumScreen ? 12 : 3}>
            </Grid>
          </Grid>
        </Grid>
      </TextAlignGrid>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <CenterTypography>Caluculate title</CenterTypography>
        <br />
        <TextField
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <br />
        <TextAlignContainer>
          <input
            type="file"
            id="csvInput"
            hidden="hidden"
            onChange={(event) => setCsv(event.target.files[0])}
          />

          <IconButton onClick={handleEditMovie}>
            <PostAddIcon className="photo" />
          </IconButton>

          <br />

          {title && csv &&  (
            <button className="btn-modal" onClick={() => newCsv()}>
              <UploadFileIcon />
            </button>
          )}
          <button className="btn-modal" onClick={() => setModalIsOpen(false)}>
            <CancelPresentationIcon />
          </button>
        </TextAlignContainer>
      </Modal>
    </>
  );
};
export default Main;