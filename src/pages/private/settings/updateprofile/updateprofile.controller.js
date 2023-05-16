import { useState } from "react"
import { useUpdateProfileModel } from "./updateprofile.model"
import UserImg from "assets/images/backgrounds/DefaultImg.png"
import { useUserSession } from "hooks/userSession"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { appActions } from "redux/store"

import { Toast } from "helpers/toasts/toastHelper"
export const useUpdateProfileController = () => {
  const user = useSelector((state) => state?.app?.user)
  const dispatch = useDispatch()
  const [uuid, setUuid] = useState(null)
  const [showLoader, setShowLoader] = useState(false)
  const [imgData, setImgData] = useState(user?.profile_pic_url)
  const userSession = useUserSession()
  const model = useUpdateProfileModel()

  const initialData = {
    file: user?.profile_pic_url ? imgData : null,
    firstname: user?.first_name,
    lastname: user?.last_name,
    email: user?.email,
    country_code: user?.country_code && user?.country_code !== "" ? user?.country_code : "+91",
    phone: user?.phone
  }
  const cleanHandlers = (filereader) => {
    filereader.removeEventListener("load", resolveImage)
  }
  const resolveImage = (reader) => {
    cleanHandlers(reader)
    setImgData(reader.result)
  }

  const handleUpdateProfile = async (values) => {
    const payload = new FormData()
    setShowLoader(true)

    payload.set("first_name", values.firstname)
    payload.set("last_name", values.lastname)
    payload.set("email", values.email)
    payload.set("phone", values.phone.replace(values.country_code, ""))

    payload.set("country_code", values.country_code)
    payload.set("profile_pic", uuid)

    const response = await model.update(payload)

    setShowLoader(false)
    if (response.success) {
      const updatedresponse = await model.profile()
      if (response.success) {
        dispatch(appActions.update(updatedresponse.data))
        userSession.setSession(updatedresponse.data)
      }
    }
  }

  const onChangePicture = async (e) => {
    const imgstat = e.target.files[0]

    if (
      (imgstat.type == "image/jpg" ||
        imgstat.type == "image/png" ||
        imgstat.type == "image/jpeg") &&
      imgstat.size < 2097152 * 5
    ) {
      if (e.target.files[0]) {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
          resolveImage(reader)
        })
        reader.readAsDataURL(e.target.files[0])
        const payload = new FormData()

        payload.set("media_key", e.target.files[0])
        payload.set("media_type", "IMAGE")
        payload.set("content_type", "multipart/form-data")
        const response = await model.media(payload)
        if (response.success) {
          setImgData(response.data.media_url)
          setUuid(response.data.id)
          Toast.success("Profile picture uploaded")
        }
      } else {
        setImgData(UserImg)
      }
    } else {
      Toast.warn("Please Upload a valid Image")
    }
  }

  return {
    showLoader,
    handleUpdateProfile,
    onChangePicture,
    imgData,
    initialData,
    setImgData
  }
}
