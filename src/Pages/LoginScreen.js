import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../Services/Api';

export default function LoginScreen() {
  const [formValue, setFormValue] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const x = { ...formValue };
    x[e.target.name] = e.target.value;
    setFormValue(x);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/user/login', formValue);

      localStorage.setItem('token', data.token);

      history.push('/admin');
    } catch (error) {
      if (error.response && error.response.data.error) {
        return alert(error.response.data.error);
      }
      alert('An error occurred');
    }
  };

  return (
    <header className="App-header">
      <h1>RealFlix</h1>
      <div className="container form-lines">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Login</button>
      </div>
    </header>
  );
}
