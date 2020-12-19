import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #9cadc7;
  border: 1px solid #eff3f8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 18px;
  color: whitesmoke;
`;

function Button(props) {
  return (
    <StyledButton
      onClick={props.handleClick}
      disabled={props.isDisabled}
      className={props.classType || 'primary'}
    >
      {props.buttonText}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
  handleClick: PropTypes.func,
};
