import React from "react";
import PropTypes from "prop-types";

export const LeftSelectionPanel = ({ moveRight, moveLeft }) => (
  <div className="ms-selectionpanel">
    <button type="button" onClick={moveRight} style={{ margin: "120px 6px" }}>
      <i className="icon ion-arrow-right-a"></i>
    </button>
    <button type="button" onClick={moveLeft} style={{ marginLeft: "6px" }}>
      <i className="icon ion-arrow-left-a"></i>
    </button>
  </div>
);

LeftSelectionPanel.propTypes = {
  moveRight: PropTypes.func,
  moveLeft: PropTypes.func
};

export const RightSelectionPanel = ({
  moveTop,
  moveUp,
  moveDown,
  moveBottom
}) => (
  <div className="ms-selectionpanel2">
    <button type="button" onClick={moveTop} style={{ margin: "65px 6px" }}>
      <i className="icon ion-ios-skipbackward rotate-90"></i>
    </button>
    <span style={{ marginLeft: "6px" }}>Up</span>
    <button type="button" style={{ margin: "6px" }} onClick={moveUp}>
      <i className="icon ion-arrow-up-b"></i>
    </button>
    <button type="button" style={{ margin: "6px" }} onClick={moveDown}>
      <i className="icon ion-arrow-down-b"></i>
    </button>
    <span style={{ marginLeft: "6px" }}>Down</span>
    <button type="button" onClick={moveBottom} style={{ margin: "55px 6px" }}>
      <i className="icon ion-ios-skipforward rotate-90"></i>
    </button>
  </div>
);

RightSelectionPanel.propTypes = {
  moveTop: PropTypes.func,
  moveDown: PropTypes.func,
  moveBottom: PropTypes.func,
  moveUp: PropTypes.func
};
