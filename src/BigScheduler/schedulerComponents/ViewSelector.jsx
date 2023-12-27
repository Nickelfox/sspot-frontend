import React from "react"
import { Radio } from "antd"

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const ViewSelector = (props) => {
  const { schedulerData, handleParentChange, selectedParent } = props
  const { config } = schedulerData
  let parentViewList = config.parentView.map((item, index) => {
    return (
      <RadioButton
        style={{
          border: "1px solid #666666",
          height: "3rem",
          borderRadius: "0.4rem",
          width: "15rem",
          backgroundColor: selectedParent === item?.value ? "#d0d0d0" : "#f6f6f6",
          color: "#666666"
        }}
        key={`${item?.value}${index}`}
        value={`${item.value}`}
        className={`${
          selectedParent === item?.value ? "btn-selected" : "btn"
        } text-xl font-semibold flex justify-center items-center`}>
        <span className={`text-xl font-semibold`}>{item.name}</span>
      </RadioButton>
    )
  })
  return (
    <RadioGroup
      //   buttonStyle="solid"
      defaultValue={selectedParent}
      //   size="default"
      style={{
        minWidth: "30rem",
        maxWidth: "30rem",
        borderRight: "2px solid black"
      }}
      className="text-xl font-semibold flex px-2"
      onChange={(e) => {
        const value = JSON.parse(e?.target?.value)
        handleParentChange(value)
      }}>
      {parentViewList}
    </RadioGroup>
  )
}

export default ViewSelector
