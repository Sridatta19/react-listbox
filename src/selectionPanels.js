
import React, { PropTypes } from 'react'

export const SelectionPanel = ({ moveRight, moveLeft }) => (
  <div className="ms-selectionpanel">
    <button onClick={moveRight} style={{ margin: '120px 0' }}>
      <i className="icon ion-arrow-right-a"></i>
    </button>
    <button onClick={moveLeft}><i className="icon ion-arrow-left-a"></i></button>
  </div>
)

SelectionPanel.propTypes = {
  moveRight: PropTypes.func,
  moveLeft: PropTypes.func
}

export const SelectionPanel2 = ({ moveTop, moveUp, moveDown, moveBottom }) => (
  <div className="ms-selectionpanel2">
    <button onClick={moveTop} style={{ margin: '65px 0' }}><i className="icon ion-ios-skipbackward rotate-90"></i></button>
    <span>Up</span>
    <button style={{ marginBottom: '5px' }} onClick={moveUp}><i className="icon ion-arrow-up-b"></i></button>
    <button onClick={moveDown}><i className="icon ion-arrow-down-b"></i></button>
    <span>Down</span>
    <button onClick={moveBottom} style={{ margin: '55px 0' }}><i className="icon ion-ios-skipforward rotate-90"></i></button>
  </div>
)

SelectionPanel2.propTypes = {
  moveTop: PropTypes.func,
  moveDown: PropTypes.func,
  moveBottom: PropTypes.func,
  moveUp: PropTypes.func
}
