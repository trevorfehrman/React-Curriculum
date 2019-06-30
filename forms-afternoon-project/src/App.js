import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(name);
    console.log(password);
  };

  return (
    <div className='App'>
      {console.log({ name })}
      {console.log({ password })}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Username:
          <input type='text' onChange={event => handleNameChange(event)} />
        </label>
        <label>
          Password:
          <input type='text' onChange={event => handlePasswordChange(event)} />
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
