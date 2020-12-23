import React, { useState } from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RenderRegister() {
  const [newUser, setNewUser] = useState({});

  const handleChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const url = '/api/register';

  const sendData = () => {
    axios
      .post(url, newUser)
      .then(res => console.log(`Data sent -> ${res.data}`))
      .catch(err => console.log(`Error from RenderRegister -> ${err.data}`));
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label">First Name: </label>
          <br />
          <input
            className="input"
            type="text"
            name="first_name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Last Name: </label>
          <br />
          <input
            className="input"
            type="text"
            name="last_name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Date of Birth: </label>
          <br />
          <input
            className="input"
            type="date"
            name="birth_date"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Email: </label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        {/* TODO: Dropdown menu for account type  */}
        <div>
          <label className="label">Account Type: </label>
          <br />
          <input
            className="input"
            type="text"
            name="type"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Description: </label>
          <br />
          <input
            className="input"
            type="text"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Balance : </label>
          <br />
          <input
            className="input"
            type="number"
            name="balance"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="label">Username: </label>
          <br />
          <input
            className="input"
            type="text"
            name="user_name"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="label">Password: </label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <Link to="/">Back to Login.</Link>
      </div>
    </div>
  );
}

export default RenderRegister;
