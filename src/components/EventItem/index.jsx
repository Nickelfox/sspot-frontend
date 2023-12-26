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
  const { getBackground, getBorderRadius, getOpacity, getMarginTop, getBColor, getItemOpacity } =
    useEventItemController()
  const styles = useStyles()
  const resources = resourceMap.get(item?.resourceId)
  const filterItem = resources.filter((resource) => resource.id === item?.resourceId)
  const resourceObjectForEvent = filterItem[0]
  let bColor = getBColor(item)
  let opacity = getItemOpacity(item)
  let divStyle = {
    backgroundColor: getBackground(resourceObjectForEvent, bColor),
    borderRadius: getBorderRadius(resourceObjectForEvent),
    opacity: getOpacity(resourceObjectForEvent, opacity),
    marginTop: getMarginTop(resourceObjectForEvent),
    ...styles?.divStyles
  }
  return (
    <div key={item.id} className={`${mustAddCssClass} `} style={divStyle}>
      <span
        style={{
          lineHeight: `${eventHeight}px`,
          ...styles?.divSpan
        }}>
        <Typography sx={[styles?.divSpan, styles?.divText]}>
          {resourceObjectForEvent?.parentId
            ? `${item?.title} h/day`
            : `${JSON.parse(item?.title).toFixed(1)} %`}
          <span>{item?.assignedhours ? `${item?.assignedhours} hrs` : null}</span>
        </Typography>
      </span>
    </div>
  )
}
EventItemTemplateResolver.propTypes = {
  resourceMap: PropTypes.object,
  item: PropTypes.object,
  mustAddCssClass: PropTypes.string,
  eventHeight: PropTypes.number
}
export default EventItemTemplateResolver
