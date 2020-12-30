import React, { useState } from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const StyledInUl = styled(StyledUl)`
  &:hover {
    left: 100%;
    top: 0;
  }
`;

const StyledLi = styled.li`
  display: inline-block;
  position: relative;
  float: left;
  background: white;
  color: black;
  cursor: pointer;
  width: 10rem;
  height: 35px;
  border-color: transparent;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
`;

const Dropbtn = styled.div`
  display: inline-block;
  height: 2.1rem;
  color: black;
  text-align: center;
  text-decoration: none;
`;

const DropDownContent = styled.div`
  display: none;

  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  &:hover {
    display: block;
    margin-bottom: 30px;
    width: 20rem;
  }
  &:hover ${DropDownInContent} {
    display: none;
  }
`;

const DropDownInContent = styled(DropDownContent)`
  background: white;
  color: black;
  cursor: pointer;
  margin-bottom: 20px;
  width: 20rem;
  height: 35px;
  border-color: transparent;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  order: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;

  &:hover {
    background-color: gray;
  }
  &:hover ${DropDownContent} {
    display: block;
  }
  &:hover ${DropDownInContent} {
    display: none;
  }
`;

const DropDownInLi = styled(StyledLi)`
  display: inline-block;
  background: white;
  color: black;
  cursor: pointer;
  width: 20rem;
  height: 2.1rem;
  border-color: transparent;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:hover {
    background-color: gray;
  }
  &:hover ${DropDownInContent} {
    display: block;
    top: 0;
    left: 100%;
  }
`;

const SubA = styled.a`
  display: block;
  background: white;
  color: black;
  cursor: pointer;
  width: 20rem;
  height: 2.1rem;
  border-color: transparent;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const InSubA = styled.a`
  display: block;
  background: white;
  color: black;
  cursor: pointer;
  width: 10rem;
  height: 2.1rem;
  border-color: transparent;
  box-shadow: 20px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }
  z-index: 100;
`;

function DropdownMulti(props) {
  // const [text, setText] = useState('Category');
  const handleClick = action => {
    console.log('testing');
    if (!action) return;
    console.log('clicked');
    setText(action);
  };

  return (
    <StyledUl>
      <DropDownLi>
        <Dropbtn>{props.category}&or;</Dropbtn>
        <DropDownContent>
          <SubA name="Rent" onClick={props.handleChange}>
            Rent
          </SubA>
          <SubA name="Car Payment" onClick={props.handleChange}>
            Car Payment
          </SubA>

          <StyledInUl>
            <DropDownInLi>
              <Dropbtn id="Food" onClick={props.handleChange}>
                Food
              </Dropbtn>
              <DropDownInContent>
                <InSubA name="Grocery" onClick={props.handleChange}>
                  Grocery
                </InSubA>
                <InSubA name="Restaurants" onClick={props.handleChange}>
                  Restaurants
                </InSubA>
              </DropDownInContent>
            </DropDownInLi>
          </StyledInUl>
        </DropDownContent>
      </DropDownLi>
    </StyledUl>
  );
}

export default DropdownMulti;
