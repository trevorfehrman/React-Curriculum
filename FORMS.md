# FORMS

## Arguably the most sophisticated HTML element, the biggest anti-pattern in React, and the most important part of your application.

Signup, login, search, create, edit, dropdowns, checkboxes, radio buttons, regular buttons and more. The humble `<form>` tag carries a lot of weight on it shoulders. For many applications it's the artery between your code and the user -- the only means by which they have to tell us what we need to know. Because forms are natively _stateful_ in HTML (meaning the form itself keeps track of the information we need) using them in React can feel a bit odd, but it wouldn't be fair to blame `<form>` for that. After all, `<form>` was here first; it was a stateful component _before_ it was cool.

In this module we're going to create a simple Login form but you might be surprised as to how much there is to it. To do this the right way we're going to need to deep dive in to React, learn some ES6 syntax and brush up on our semantic HTML. Let's get started.

## A Login Form: Step by Step

We'll start simple.

```import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <form>
        <input />
      </form>
    </div>
  );
}

export default App;
```

This only renders a basic text input field but already we could ask a couple questions. First, if all we're rendering is an `<input>` then why are we bothering to put it inside a `<form>`? Second, there are a lot of different kinds of `<input>`'s, how does this one know to be a _text_ input? The answer to the first question has to do with the form being stateful, as we'll see soon. To some extent the `<form>` tag will be able to keep track of what its children are doing. As for the second question, a basic text field is what an `<input>` tag defaults to, but this isn't very semantic is it? Another way to say it is that this code isn't very "self-documenting", meaning other developers looking at our code in the future might have a harder time understanding what its for. What's even worse is that screen readers might have difficulty parsing what its for. A trivial effort from us can mean a world of difference for a future developer or for someone using a screen reader. Let's do better.

```
import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <form>
        <label>
          Username:
          <input type='text' />
        </label>
      </form>
    </div>
  );
}

export default App;
```

Better. Now screenreaders, users and fellow developers alike should have an easier time understanding what this input is for.

So now we've got a way for users to input text, the next step is to capture that value. In a regular DOM enviornment each change to this input would create a "change event" that the DOM API would expose to us but remember: React operates out of a virtual DOM so when it's deciding what to render to the page the DOM doesn't even exist yet. That's why the React team created "synthetic events" which effectively simulate DOM events inside the virutual DOM. We don't need to worry about the details of synthetic events at the moment. They're designed to work as much like their native DOM counterparts as possible and for the vast majority of cases they do, but you should be aware of their existence.

If we use the `onChange` synthetic event listener on our `<input>` tag we'll be able to capture its value. Then we'll set that value to a state variable.

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  return (
    <div className='App'>
      {console.log(name)}
      <form>
        <label>
          Username:
          <input type='text' onChange={event => setName(event.target.value)} />
        </label>
      </form>
    </div>
  );
}

export default App;
```

Really this isn't so different from vanilla JavaScript. We inform our `<input>` tag to listen for changes. Each change creates a synthetic event. We then pass the value of that event to our state setter and capture it in our `name` variable.

This isn't a bad start but writing our function inline like this could get messy if we ever wanted to execute more than one statement per change (firing off an animation, for example). Let's build a custom function to "handle" this for us and tuck our state setter into that.

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <div className='App'>
      {console.log(name)}
      <form>
        <label>
          Username:
          <input type='text' onChange={event => handleChange(event)} />
        </label>
      </form>
    </div>
  );
}

export default App;
```

This might seem like a little extra work but notice that within the body of our handleChange function we can now execute as many lines of code as we want without cluttering up our markup. Getting used to this pattern will save you some headaches later on.

So now that we've got the value the user typed into our `<input>` safely stored in our state what do we do with it? In real applications we'd probably be sending this information asyncronously to a server to authenticate them, but for now let's just log the user to the console. To do this we'll need a submit button, and a function to handle that submit.

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    console.log(name);
  };

  return (
    <div className='App'>
      {console.log(name)}
      <form>
        <label>
          Username:
          <input type='text' onChange={event => handleChange(event)} />
        </label>
        <button onSubmit={() => handleSubmit()}>Submit!</button>
      </form>
    </div>
  );
}

export default App;
```

Uh-oh. When we clicked our button the page refreshed. In the early days of the internet when the spec for this stuff was written that behavior was actually useful, but this is a single page application and we definitely don't want our page refreshing, it'll clear our state and cause all kinds of problems. We need to prevent the default behavior of the onSubmit listenter and to do that we'll need to grab that event object again. We'll also need to peel the submit handler off our `<button>` and put it on to the `<form>` itself. Remember when I told you that the `<form>` tag keeps track of what its children do? This is one example. If there's only one `<button>` inside a `<form>` the form will know to fire the function attached to its `onSubmit` listener. The form is also the element _causing_ the default refresh of our page and, as such, it's the only thing that is permitted to _prevent_ it so we have to grab the event object from the form. As you can hopefully see by now, part of the reason forms can be confusing in React is because the underlying HTML is complex.

Here's our updated code.

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(name);
  };

  return (
    <div className='App'>
      {console.log(name)}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Username:
          <input type='text' onChange={event => handleChange(event)} />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}

export default App
```

Nice, it logs our state to the console without refreshing the page. Let's move on.

## Handling Multiple Inputs

Right now this isn't a very useful login page as there's no field for a password. We're going to make a naive implementation first, reflect on its limitations and then try and do bettter.

```
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
```

We had to change some of our names around now that we're handling two fields instead of one but none of the underlying logic changed. Now this code works and as a wise man once said, caveman code is better than nothing as long as it works. But there's another piece of sage advice we're familiar with: don't repeat yourself, and we sure are repeating ourselves a lot here. We're keeping the information about one user in two totallys separate state variable and we've written two totally separate functions with identical logic.  We have two goals.  First, we want to store both the username and password in a single state object.  Second, we only want to write one change handler that will dynamically find the correct key in our state object to change.  To achieve these goals we need to learn about two tools provided to us by ES6: the spread operator and comuputed properties.

## The Spread Operator


