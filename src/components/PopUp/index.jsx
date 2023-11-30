/*eslint-disable no-unused-vars */
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import { Box, Modal } from "@mui/material"
import React from "react"
import "./popUpModal.scss"

const Popup = ({ open, handleClose = () => {}, children, styles = {} }) => {
  return (
    <Modal
      open={open}
      // classes={{ root: { padding: "2rem, 0" } }}
      // sx={{ zIndex: 2500 }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div id="popup" className={`popUp`} style={styles}>
        {children}
      </div>
    </Modal>
  )
}

export default Popup
