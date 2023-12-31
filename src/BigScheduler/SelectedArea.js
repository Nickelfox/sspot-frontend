import React, { Component } from "react"
import { PropTypes } from "prop-types"

class SelectedArea extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }

  render() {
    const { left, schedulerData } = this.props
    const { config } = schedulerData
    return (
      <div
        className="selected-area"
        style={{
          left: left,
          width: 50,
          top: 0,
          bottom: 0,
          backgroundColor: config.selectedAreaColor,
          height: 36,
          marginLeft: "0.1rem",
          borderRadius: "0.4rem"
        }}
        id="area"></div>
    )
  }
}

export default SelectedArea
