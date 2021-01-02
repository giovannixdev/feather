import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #334f79;
  border: 1px solid #eff3f8;
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 18px;
  color: whitesmoke;
  height: 40px;
  cursor: pointer;
`;

function Button(props) {
  return (
    <StyledButton
      onClick={props.handleClick}
      disabled={props.isDisabled}
      className={props.classType || 'primary'}
      style={props.style}
    >
      {props.buttonText}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};
