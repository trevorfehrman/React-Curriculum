import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser({ username: '', password: '' });
    console.log(user.name);
    console.log(user.password);
  };

  return (
    <div className='App'>
      {console.log(user)}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Username:
          <input
            type='text'
            name='username'
            value={user.username}
            onChange={event => handleChange(event)}
          />
        </label>
        <label>
          Password:
          <input
            type='text'
            name='password'
            value={user.password}
            onChange={event => handleChange(event)}
          />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}

export default App;

// const [user, setUser] = useState({ name: '', lastName: '' });

// const handleSubmit = event => {
//   event.preventDefault();
//   console.log(user);
//   setUser({ name: '', lastName: '' });
// };

// const handleChange = event => {
//   // console.log(event);
//   setUser({
//     ...user,
//     [event.target.name]: event.target.value
//   });
// };

// return (
//   <div className='App'>
//     {console.log(user)}
//     <form onSubmit={event => handleSubmit(event)}>
//       <label>
//         Name:
//         <input
//           type='text'
//           name='name'
//           value={user.test}
//           onChange={event => handleChange(event)}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           type='text'
//           name='lastName'
//           value={user.lastName}
//           onChange={event => handleChange(event)}
//         />
//       </label>
//       <button>Submit</button>
//     </form>
//   </div>
// );
