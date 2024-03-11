import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function ModalCategories({ onClose }) {
  return (
    <div>
      <Modal
        open={true} // Always open when rendered
        onClose={onClose} // Call the onClose function passed from the parent to close the modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Product Successfully Created!
            </Typography>
            <CheckCircleIcon
              sx={{ color: "green", fontSize: 80, alignSelf: "center" }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your product has been successfully created! Go check it out on the
              products page. Click outside to close or click the button below to
              add another product.
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
              Add Another Products
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalCategories;
