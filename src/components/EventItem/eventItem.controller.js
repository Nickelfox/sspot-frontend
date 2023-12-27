import { useTheme } from "@mui/material"
export const useEventItemController = () => {
  const theme = useTheme()
  const getBackground = (parentObject, bColor) => {
    if (parentObject?.parentId === undefined) {
      return bColor
    } else {
      let str = parentObject?.color
      str = str.slice(0, -2)
      return str
    }
  }
  const getBorderRadius = (parentObject) => {
    if (parentObject?.parentId === undefined) {
      return 0
    } else {
      return 4
    }
  }
  const getOpacity = (parentObject, opacity) => {
    if (parentObject?.parentId === undefined) {
      return opacity
    } else {
      return 1
    }
  }
  const getMarginTop = (parentObject) => {
    if (parentObject?.parentId === undefined) {
      return "-0.15rem"
    } else {
      return "0"
    }
  }
  const getBColor = (item) => {
    return item?.title <= 100
      ? theme?.palette?.background?.limitTime
      : theme?.palette?.background?.overTime
  }
  const getItemOpacity = (item) => {
    if (!item?.resourceParentID) {
      return item?.title / 100 < 0.5 ? 0.5 : item?.title / 100
    } else {
      return 1
    }
  }
  const getSpanStyles = (item, styles) => {
    return !item?.resourceParentID
      ? styles?.spanText
      : { ...styles?.spanText, ...styles?.paddingSpan }
  }
  return {
    getBackground,
    getBorderRadius,
    getOpacity,
    getMarginTop,
    getBColor,
    getItemOpacity,
    getSpanStyles
  }
}
