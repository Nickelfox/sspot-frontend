import React, { useState } from "react";
import { Radio } from "antd";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ViewSelector = (props) => {
  console.log(props);
  const { schedulerData } = props;
  const { config } = schedulerData;
  const [selectedView, setSelectedView] = useState("");
  let parentViewList = config.parentView.map((item, index) => {
    console.log(item, "parentItem");
    return (
      <RadioButton
        style={{
          border: "1px solid #666666",
          height: "3rem",
          borderRadius: "0.4rem",
          width: "11rem",
          backgroundColor:
            config?.selectedParent === item?.value ? "#d0d0d0" : "#f6f6f6",
          color: "#666666"
        }}
        key={`${item?.value}${index}`}
        value={`${item.value}`}
        className={`${
          config?.selectedParent === item?.value ? "btn-selected" : "btn"
        } text-xl font-semibold flex justify-center items-center`}
      >
        <span className={`text-xl font-semibold`}>{item.name}</span>
      </RadioButton>
    );
  });
  return (
    <RadioGroup
      //   buttonStyle="solid"
      defaultValue={config?.selectedParent}
      //   size="default"
      style={{
        maxWidth: "24rem",
        borderRight: "2px solid black"
      }}
      className="text-xl font-semibold flex px-2"
      //   onChange={(event) => {
      //     this.handleEvents(onViewChange, true, event);
      //   }}
    >
      {parentViewList}
    </RadioGroup>
  );
};

export default ViewSelector;
