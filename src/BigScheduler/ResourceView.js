/*eslint no-extra-boolean-cast: "error"*/
/*eslint-disable no-unused-vars */
import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons"
import { Avatar } from "@mui/material"

class ResourceView extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    contentScrollbarHeight: PropTypes.number.isRequired,
    slotClickedFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func,
    toggleExpandFunc: PropTypes.func
  }
  getArrow = (item) => {
    const { schedulerData, toggleExpandFunc } = this.props
    const expandFun = !!toggleExpandFunc
    return item.hasChildren ? (
      item.expanded ? (
        <MinusSquareOutlined
          key={`es${item.indent}`}
          style={{}}
          className=""
          onClick={() => {
            if (expandFun) toggleExpandFunc(schedulerData, item.slotId)
          }}
        />
      ) : (
        <PlusSquareOutlined
          key={`es${item.indent}`}
          style={{}}
          className=""
          onClick={() => {
            if (expandFun) toggleExpandFunc(schedulerData, item.slotId)
          }}
        />
      )
    ) : null
  }

  render() {
    const {
      schedulerData,
      contentScrollbarHeight,
      slotClickedFunc,
      slotItemTemplateResolver,
      toggleExpandFunc
    } = this.props
    const { renderData } = schedulerData

    let width = "25rem"
    let paddingBottom = contentScrollbarHeight
    let displayRenderData = renderData.filter((o) => o.render)
    let resourceList = displayRenderData.map((resourceItem) => {
      return (
        <>
          {
            <div>
              <div
                className="bg-[#fff] flex justify-around items-center"
                style={{
                  border: "1px solid #eee",
                  fontSize: "1.7rem",
                  minHeight: "6rem",
                  height: "fit-content"
                  //   marginBottom: 10
                }}>
                {!resourceItem?.parentId && this.getAvatar(resourceItem)}
                <div>
                  <div>
                    <span>{resourceItem?.slotName}</span>
                    <span>{this.getArrow(resourceItem)}</span>
                  </div>
                  {!resourceItem?.parentId && <select></select>}
                </div>
              </div>
            </div>
          }
        </>
      )
    })

    return (
      <div style={{ paddingBottom: paddingBottom }}>
        <table style={{ width: width }}>
          <tbody>{resourceList}</tbody>
        </table>
      </div>
    )
  }
  getNameInitials = (name) => {
    const nameArr = name.split("_")
    const initials = nameArr.map((word) => word.charAt(0)).join("")
    return initials
  }
  getAvatar = (item) => {
    if (item?.parentId === undefined) {
      return (
        <Avatar alt="User" style={{ backgroundColor: "#000", fontSize: "2.5rem" }}>
          {this.getNameInitials(item?.slotName)}
        </Avatar>
      )
    }
  }
}

export default ResourceView
