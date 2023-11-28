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

    // let width = schedulerData.getResourceTableWidth();
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
                  {/* <select></select> */}
                </div>
              </div>
            </div>
          }
        </>
      )
    })
    // let resourceList = displayRenderData.map((item) => {
    //   let indents = [];
    //   for (let i = 0; i < item.indent; i++) {
    //     indents.push(<span key={`es${i}`} className="expander-space"></span>);
    //   }
    //   //   let indent = (
    //   //     <span key={`es${item.indent}`} className="expander-space"></span>
    //   //   );
    //   let indent;
    //   if (item.hasChildren) {
    //     indent = item.expanded ? (
    //       <MinusSquareOutlined
    //         key={`es${item.indent}`}
    //         style={{}}
    //         className=""
    //         onClick={() => {
    //           if (!!toggleExpandFunc)
    //             toggleExpandFunc(schedulerData, item.slotId);
    //         }}
    //       />
    //     ) : (
    //       <PlusSquareOutlined
    //         key={`es${item.indent}`}
    //         style={{}}
    //         className=""
    //         onClick={() => {
    //           if (!!toggleExpandFunc)
    //             toggleExpandFunc(schedulerData, item.slotId);
    //         }}
    //       />
    //     );
    //   }
    //   indents.push(indent);

    //   let a =
    //     slotClickedFunc != undefined ? (
    //       <span className="slot-cell">
    //         <a
    //           style={{
    //             cursor: slotClickedFunc === undefined ? undefined : "pointer"
    //           }}
    //           className="slot-text"
    //           onClick={() => {
    //             slotClickedFunc(schedulerData, item);
    //           }}
    //         >
    //           <Avatar sx={{ borderRadius: 0, height: "8rem", width: "8rem" }} />{" "}
    //           {item.slotName}
    //         </a>
    //         {indents}
    //       </span>
    //     ) : (
    //       <span
    //         className="flex justify-between w-full"
    //         // style={{ maxWidth: "fit-content" }}
    //       >
    //         <div>
    //           {console.log(item)}
    //           {item?.parentId === undefined && (
    //             <Avatar
    //               sx={{ borderRadius: 0, height: "6rem", width: "6rem" }}
    //             />
    //           )}
    //         </div>
    //         <span
    //           style={{
    //             cursor: slotClickedFunc === undefined ? undefined : "pointer"
    //           }}
    //           className="slot-text"
    //         >
    //           {item.slotName}
    //         </span>{" "}
    //         <span>{indents}</span>
    //       </span>
    //     );
    //   let slotItem = (
    //     <div
    //       title={item.slotName}
    //       className="overflow-text header2-text"
    //       style={{ textAlign: "left", width: width }}
    //     >
    //       {a}
    //     </div>
    //   );
    //   if (!!slotItemTemplateResolver) {
    //     let temp = slotItemTemplateResolver(
    //       schedulerData,
    //       item,
    //       slotClickedFunc,
    //       width,
    //       "overflow-text header2-text"
    //     );
    //     if (!!temp) slotItem = temp;
    //   }

    //   let tdStyle = { height: "6rem" };
    //   if (item.groupOnly) {
    //     tdStyle = {
    //       ...tdStyle,
    //       backgroundColor: schedulerData.config.groupOnlySlotColor
    //     };
    //   }

    //   return (
    //     <tr key={item.slotId}>
    //       <td data-resource-id={item.slotId} style={tdStyle}>
    //         {slotItem}
    //       </td>
    //     </tr>
    //   );
    // });

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
