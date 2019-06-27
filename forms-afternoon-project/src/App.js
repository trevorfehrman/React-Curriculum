import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ name: '', age: '' });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(user);
  };

  const handleChange = event => {
    // setUser({ [event.target.name]: event.target.value });
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className='App'>
      {console.log(user)}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={user.name}
            onChange={event => handleChange(event)}
          />
        </label>
        <label>
          Age:
          <input type='text' name='age' value={user.age} onChange={event => handleChange(event)} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
