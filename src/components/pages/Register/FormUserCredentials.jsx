import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledInput, StyledTitle } from '../../../styles/styled';
import { Button } from '../../common';

function FormUserAccount({
  errorMessage,
  newUser,
  handleChange,
  registrationSubmit,
}) {
  const { register, errors, handleSubmit } = useForm();

  const handleClick = page => {
    page === 'second' ? registrationSubmit(page) : registrationSubmit(null);
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <StyledTitle capitalize>Credentials</StyledTitle>
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          EMAIL
        </label>
        <br />
        <StyledInput
          ref={register({ required: true })}
          type="email"
          name="email"
          onChange={handleChange}
          value={newUser.email}
        />
      </div>
      {errors.email && <p>Email is required</p>}
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          USERNAME
        </label>
        <br />
        <StyledInput
          ref={register({ required: true, maxLength: { value: 14 } })}
          type="text"
          name="user_name"
          onChange={handleChange}
          value={newUser.user_name}
        />
      </div>
      {errors.user_name && <p>Username must be shorter than 14 characters</p>}
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          PASSWORD
        </label>
        <br />
        {/* Display message 6 characters or longer with at least one number is best */}
        <StyledInput
          ref={register({ required: true })}
          type="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      {errors.password && <p>Password is required</p>}
      {/* <div className="field">
          <label
            className="label"
            style={{
              fontSize: '1rem',
              letterSpacing: '2px',
              color: '#363b3d',
            }}
          >
            CONFIRM PASSWORD
          </label>
          <br />
          Display message 6 characters or longer with at least one number is best
          <StyledInput
            ref={register({ required: true })}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>

      {/* Prev Button shouldnt check for errors */}

      {errorMessage ? <p>{errorMessage}</p> : null}

      <Button buttonText="Register" />

      <Button
        buttonText="< Prev Page"
        handleClick={() => handleClick('second')}
      />
    </form>
  );
}

export default FormUserAccount;
