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

We had to change some of our names around now that we're handling two fields instead of one but none of the underlying logic changed. Now this code works and as a wise man once said, caveman code is better than nothing as long as it works. But there's another piece of sage advice we're familiar with: don't repeat yourself, and we sure are repeating ourselves a lot here. We're keeping the information about one user in two totally separate state variable and we've written two totally separate functions with identical logic. We have two goals. First, we want to store both the username and password in a single state object. Second, we only want to write one change handler that will dynamically find the correct key in our state object to change. To achieve these goals we need to learn about two tools provided to us by ES6: the spread operator and comuputed properties.

## The Spread Operator

The spread operator is a swiss army knife and we're not going to go into all its uses here, though I encourage you to look it up. For now we're going to focus on its ability to help us make copies of objects and arrays.

You might have encountered this programming gotcha before.

```
let foo = {key: "value"};

let bar = foo;

console.log(foo) //  {key: "value"}
console.log(bar) //  {key: "value"}

foo.key = "change"

console.log(foo) //  {key: "change"}
console.log(bar) //  {key: "change"}
```

This is counterintuitive. When we decalred our `bar` variable we thougtht we were making a _copy_ of `foo` but we weren't. We were merely creating two separate _references_ to the same location in memory. When we changed the data in that location and called upon their _references_ (`foo` and `bar`), they simply logged what they were told to point at. This is a little annoying but really it's the only way objects _can_ work. If objects _copied_ by default and at any point in a code base two objects refered to each other then we'd be in an infinite loop.

Okay, so creating a new binding doesn't give us a new object. How _can_ we create a new object? Well there are a few ways, but one convient and readable method is to use the `...` spread operator.

```
let foo = {key: "value"};

let bar = {...foo};

console.log(foo) //  {key: "value"}
console.log(bar) //  {key: "value"}

foo.key = "change"

console.log(foo) //  {key: "change"}
console.log(bar) //  {key: "value"}
```

This time when we declare `bar` we take all the key/value paris insdie foo (in this case there's only one) and "spread" them out (copy them) insdie a new object literal. This gets us the behavior we expected to get in the first place.

So what does this have to do with React? Two things. Remember back to the useState module when we talked about React's namesake? When the state changes your view layer _reacts_ to the change and updates. To get a little more technical, something in our state changes and React triggers a rerender of every component that's using that data. If react doesn't think the state has changed, it won't trigger a rerender. Remember that our first goal was to keep the username and the password in a single state object instead repeating ourselves with two useStates. We might think that we could accomplish that like so:

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ name: '', password: '' });

  const handleNameChange = event => {
    setUser({ name: event.target.value });
  };

  const handlePasswordChange = event => {
    setUser({ password: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(user.name);
    console.log(user.password);
  };

  return (
    <div className='App'>
      {console.log(user)}
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

But we screwed up. All we wanted to do was update one of the keys on our state object, instead we're replacing the entire object. If we type a letter in the `Username` field we'll have changed the value of `user` from `{name: '', password: ''}` to `{name: [whatever the user types]}`. Then if we type something in the `Password` field we'll have changed the value of `user` _again_ to `{password: [whatever the user types]}`. Our log to the console can help demonstrate:

<img src="./assets/Screen Shot 2019-06-30 at 1.51.04 PM.png" alt="drawing" width="600px"/>

This is definitely not what we want. Thankfully our trusty spread operator can save us. Let's change those handlers to this:

```
  const handleNameChange = event => {
    setUser({ ...user, name: event.target.value });
  };

  const handlePasswordChange = event => {
    setUser({ ...user, password: event.target.value });
  };
```

Here our spread operators are telling react "Please copy all the keys and values in the user object into this new object literal, then overwrite the name and password keys repsectively with the specified value." The result?

<img src="./assets/Screen Shot 2019-06-30 at 1.53.43 PM.png" alt="drawing" width="600px"/>

There we go.

Alright, so we've condensed our state into a single object, but we still have two change handlers with identical logic. This form only has two fields, imagine if it had 10, or 100. Our change handlers would grow unwieldy very quickly. To make our form code DRY-er we need to take a look at computed properties.

## Computed properties

Another extremely useful tool from ES6, computed properties let us... well... _compute_ the proerties of objects. Take a look at this.

```
let myObject = {firstProperty: "Hi Lambda!"};
```

We know that JavaScript provides us with two ways to access this property: dot notation and bracket notation.

```
myObject.firstProperty; //"Hi Lambda!"
myObject["firstProperty"]; //"Hi Lambda!"
```

Take a look at the bracket notation. Have you ever stopped to wonder why you have to surround the key you're trying to access in quotes? Well, under the hood all object properties are strings (you'll dive deeper into the reason why in the CS module); The dot notation is a bit easier to type but sometimes it's not legal to use it; when our property has a special character or starts with a number for example.

```
let myOtherObject = {"3": "totally legal key/value pair"};
myObject.3; // JavaScript freaks out at you.
myObject."3"; // JavaScript freaks out at you.
myObject[3]; // JavaScript is pleased.  It will implicitly coerce this integer to a string.
```

Incidentally this is why we access elements in arrays with bracket notation. Arrays are secretely just objects whose keys are hardcoded as strings of consecutive integers.

But this brings us back to `myObject["firstProperty"]; //"Hi Lambda!"`. Why can't we just write `myObject[firstProperty]; //"Hi Lambda!"` without the quotes around `firstProperty`?

The reason is if you put quotes around `firstProperty` JavaScript will atttempt to look that string up in the object. If you don't include the quotes JavaScript is going to attempt to evaluate what you wrote as a _variable_. Really let this sink in. This is a powerful tool. Now instead of referring to our object properties with a hardcoded string, we can attempt to look one up on the basis of an evaluated expression.

```
let myThirdObject = {1: "sup", 2: "hey"};

let computedProperty = 1;

myThirdObject[computedProperty]; // "sup";
myThirdObject[1 + 1]; //"hey";
```

So how does this tool help us handle multiple inputs with one function? The final piece of the puzzle take us back to our form element. Recall that the `<form>` tag keeps track of some of its own state, making its implementation in React sometimes awkward. Well this time we're going to use that to our advantage. By including a `name` attribute on our inputs we can attach a new `name` property to the `event.target` object.

```import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleNameChange = event => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = event => {
    setUser({ ...user, password: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(user.name);
    console.log(user.password);
  };

  return (
    <div className='App'>
      {console.log(user)}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Username:
          <input type='text' name='username' onChange={event => handleNameChange(event)} />
        </label>
        <label>
          Password:
          <input type='text' name='password' onChange={event => handlePasswordChange(event)} />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}

export default App;
```

Using our knowledge of computed properties, we can now rewrite our handler functions like this:

```const handleNameChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handlePasswordChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
```

And now that these functions are literally the same letter-for-letter there's truly no reason to have two of them.

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(user.username);
    console.log(user.password);
  };

  return (
    <div className='App'>
      {console.log(user)}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Username:
          <input type='text' name='username' onChange={event => handleChange(event)} />
        </label>
        <label>
          Password:
          <input type='text' name='password' onChange={event => handleChange(event)} />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}

export default App;
```

You could add as many inputs to this app as you like and so long as each had a `name` attribute that corresponded to a property in the state object our sole change handler would manage them all.

That was a lot to get two input fields working but the things we learned about React and JavaScript to accomplish this will pay off over and over again in other ways down the line. Great job making it this far, but there's one last thing to discuss.

## Two way data binding

We've made it so that our inputs can update our state so that we can push that state to our backend (or in our case the console) but some of you might have noticed this is a bit of an anti-pattern in react. React is supposed to have a "unidirectional dataflow" or "a single source of truth" as is sometimes said. This means that the parent stateful components control the presentational child components. In our case however our child components are dictating our state, which is fine that's what we want, but our state can't in turn control its children. In addition to the input fields telling our state what data it needs to keep track of, we want our appliation to have the power to dicate what kinds of values our inputs are permitted to have. There are a myriad of reasons why we want this power from form validation to styling but in this case let's say that when the user clicks submit we want to be able to automatically clear the input fields. For that we'll need to bind the value of the inputs to the state. To do _that_ we'll add another attribute to our `<input>`'s, the `value` attribute.

```
<input value="Hi Lambda!">`
```

Using the `value` attribute forces the text inside the input field to correspond to the string assigned to it, in this case "Hi Lambda!". Hardcoding it like this makes the input rather useless because now the user can't change the text. But what if, instead of hardcoding the value attribute, we passed it a dynamic value from our state.

```
import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
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
```

Now when the user types something into an input field it updates our state. React notices our state has changed so it triggers a rerender. When it evaluates what text should go in the input fields by looking at the `value` attribute. It notices it should put the data in its state into those fields and the elements render with the users input.

Why, oh why, would we go to such lenghts to be able to dictate the text of an input field? Well, the truth is, sometimes you don't need to. It's a point of philosophical preference for some, keeping the unidirectional data flow as unidirectional as possible, but in our case we want to clear the input fields when we hit submit. And for that our inputs need to do what their parent tells them to do. Because we've attached the inputs value attributes to our state, we can now do exactly that.

```
  const handleSubmit = event => {
    event.preventDefault();
    setUser({ username: '', password: '' });
  };
```

Now when the user clicks submit the state will be reset with empty strings. And since the value of the input fields is now dictated by the state they'll be emptied as well.

Forms. They're no joke.
