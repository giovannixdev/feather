import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyledInput, StyledTitle } from '../../../styles/styled';
import { Button } from '../../common';

function FormUserAccount({ newUser, handleChange, registrationSubmit }) {
  const { register, errors, handleSubmit } = useForm();

  const handleClick = page => {
    page === 'first' ? registrationSubmit(page) : registrationSubmit('third');
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <StyledTitle capitalize>Account Info</StyledTitle>
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          BANK NAME
        </label>
        <br />
        <StyledInput
          ref={register({ required: true })}
          type="text"
          name="description"
          onChange={handleChange}
          value={newUser.description}
        />
      </div>
      {errors.description && <p>Description is required</p>}
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          ACCOUNT TYPE
        </label>
        <br />
        {/* // TODO: Disable & Format this input */}
        <StyledInput
          ref={register({ required: true })}
          type="text"
          name="type"
          value={newUser.type}
        />
      </div>
      {errors.type && <p>Type is required</p>}
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          BALANCE
        </label>
        <br />
        <StyledInput
          ref={register({ required: true })}
          type="number"
          name="balance"
          onChange={handleChange}
          value={newUser.balance}
        />
      </div>
      {errors.balance && <p>Balance is required</p>}
      <div className="field">
        <label
          className="label"
          style={{
            fontSize: '1rem',
            letterSpacing: '2px',
            color: '#363b3d',
          }}
        >
          RATE
        </label>
        <br />
        <StyledInput
          ref={register({ required: true })}
          type="number"
          name="rate"
          value={newUser.rate}
        />
      </div>
      {errors.rate && <p>Rate is required</p>}

      <Button buttonText="Next Page >" />

      {/* Prev Button shouldnt check for errors */}

      <Button
        buttonText="< Prev Page"
        handleClick={() => handleClick('first')}
      />
    </form>
  );
}

export default FormUserAccount;
