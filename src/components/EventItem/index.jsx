/**
 * @returns
 * The Purpose of this component is to return
 * The Event Items for Parent as well as Child
 * Parent here represents Team Members
 * Child here represents Projects
 */

import React from "react"
import { Typography } from "@mui/material"
import { PropTypes } from "prop-types"
import { useEventItemController } from "./eventItem.controller"
import { useStyles } from "components/EventItem/eventItemStyles"
const EventItemTemplateResolver = (props) => {
  const { resourceMap, item, mustAddCssClass, eventHeight } = props
  const {
    getBackground,
    getBorderRadius,
    getOpacity,
    getMarginTop,
    getBColor,
    getItemOpacity,
    getSpanStyles
  } = useEventItemController()
  const styles = useStyles()
  const resources = resourceMap.get(item?.resourceId)
  const filterItem = resources.filter((resource) => resource.id === item?.resourceId)
  const resourceObjectForEvent = filterItem[0]
  let bColor = getBColor(item)
  let opacity = getItemOpacity(item)
  let divStyle = {
    backgroundColor: getBackground(resourceObjectForEvent, bColor),
    borderRadius: getBorderRadius(resourceObjectForEvent),
    opacity: !item?.resourceParentID ? getOpacity(resourceObjectForEvent, opacity) : 1,
    marginTop: getMarginTop(resourceObjectForEvent),
    height: !item?.resourceParentID ? 43 : 35,
    ...styles?.divStyles
  }
  const title = item?.title === 100 ? "Full" : `${JSON.parse(item?.title).toFixed(1)} %`
  return (
    <div key={item.id} style={{ height: 43, marginLeft: 2 }}>
      <div key={item.id} className={`${mustAddCssClass} `} style={divStyle}>
        <span
          style={{
            lineHeight: `${eventHeight}px`,
            ...styles?.divSpan
          }}>
          <Typography sx={getStyles(item, styles)}>
            {resourceObjectForEvent?.parentId ? `${item?.title} h/d` : `${title}`}
            <span style={getSpanStyles(item, styles)}>
              {item?.assignedhours ? `${item?.assignedhours} hrs` : null}
            </span>
          </Typography>
        </span>
      </div>
    </div>
  )
}
const getStyles = (item, styles) => {
  if (item?.resourceParentID) {
    return [styles?.divText]
  } else {
    return [styles?.divSpan, styles?.divText]
  }
}

EventItemTemplateResolver.propTypes = {
  resourceMap: PropTypes.object,
  item: PropTypes.object,
  mustAddCssClass: PropTypes.string,
  eventHeight: PropTypes.number
}
export default EventItemTemplateResolver
