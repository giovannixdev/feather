import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';

function RenderRegister() {
  return (
    <div>
      <form>
        <div>
          <label className="label">First Name: </label>
          <br />
          <input className="input" type="text" name="first_name" />
        </div>
        <div>
          <label className="label">Last Name: </label>
          <br />
          <input className="input" type="text" name="last_name" />
        </div>
        <div>
          <label className="label">Date of Birth: </label>
          <br />
          <input className="input" type="date" name="birth_date" />
        </div>
        <div>
          <label className="label">Email: </label>
          <br />
          <input className="input" type="email" name="email" />
        </div>
        <div className="field">
          <label className="label">Username: </label>
          <br />
          <input className="input" type="text" name="user_name" />
        </div>
        <div className="field">
          <label className="label">Password: </label>
          <br />
          <input className="input" type="password" name="password" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <div>
        <Link to="/">Back to Login.</Link>
      </div>
    </div>
  );
}

export default RenderRegister;
