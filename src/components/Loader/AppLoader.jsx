import React, { useEffect, useState } from "react"
import Lottie from "lottie-react"
import AnimationFile from "assets/animations/default-loader.json"
import styles from "./Loader.module.css"
import { useSelector } from "react-redux"
import { Typography } from "@mui/material"

function AppLoader({ visible: isVisible = false }) {
  const [showLoader, setLoader] = useState(false)
  const { visible, message } = useSelector((store) => store.loader)

  useEffect(() => {
    if (!!visible || !!isVisible) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [visible, isVisible])

  if (!showLoader) return null

  return (
    <div className={styles.loader}>
      <Lottie animationData={AnimationFile} loop={true} />
      {Boolean(message) && <Typography>{message}</Typography>}
    </div>
  )
}

export default AppLoader
