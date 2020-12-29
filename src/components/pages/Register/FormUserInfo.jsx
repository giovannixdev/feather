import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledInput, StyledTitle } from '../../../styles/styled';
import { Button } from '../../common';

function FormUserInfo({ newUser, handleChange, registrationSubmit }) {
  const { register, errors, handleSubmit } = useForm();

  const handleClick = () => {
    registrationSubmit('second');
  };

  
  return (

      <form onSubmit={handleSubmit(handleClick)}>
        <StyledTitle capitalize>User Info</StyledTitle>
        <div>
          <label
            className="label"
            style={{
              fontSize: '1rem',
              letterSpacing: '2px',
              color: '#363b3d',
            }}
          >
            FIRST NAME
          </label>
          <br />
          <StyledInput
            ref={register({ required: true })}
            type="text"
            name="first_name"
            onChange={handleChange}
            value={newUser.first_name}
          />
        </div>
        {errors.first_name && <p>First name is required</p>}
        <div className="field">
          <label
            className="label"
            style={{
              fontSize: '1rem',
              letterSpacing: '2px',
              color: '#363b3d',
            }}
          >
            LAST NAME
          </label>
          <br />
          <StyledInput
            ref={register({ required: true })}
            type="text"
            name="last_name"
            onChange={handleChange}
            value={newUser.last_name}
          />
        </div>
        {errors.last_name && <p>Last name is required</p>}
        <div className="field">
          <label
            className="label"
            style={{
              fontSize: '1rem',
              letterSpacing: '2px',
              color: '#363b3d',
            }}
          >
            DATE OF BIRTH
          </label>
          <br />
          <StyledInput
            ref={register({ required: true })}
            type="date"
            name="birth_date"
            onChange={handleChange}
            value={newUser.birth_date}
          />
        </div>
        {errors.birth_date && <p>Date of birth is required</p>}
        <Button
          // disabled
          // type="submit"
          buttonText="Next Page >"
        // handleClick={handleClick}
        />
      </form>

  );
}

export default FormUserInfo;
