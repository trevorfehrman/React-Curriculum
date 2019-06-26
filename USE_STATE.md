# State

## Applications are really just two things: data and things that change that data. Whatever your application's data looks like at a given instant is its state.

**By the end of this module you should be able to**:

- Understand what state is.
- Make a React component stateful.
- Change the state of a component with a click listener.

# Learn

## What is State

You actually already know this, though you may not realize it. If you're at a soccer game and each team has 3 goals you might say that the "state" of the game is "tied." A traffic light has three possible states: red, yellow and green. Similarly our applications also have states. If you have a todo app it might be said to have a state of "three todos, none of which are completed." Upon completing one of the todos you've changed the application's state.

To see what this means concretely let's start with the simplest state possible: a boolean. We'll create an app that displays a light. The light will either be on or off.

Let's get some code on the page.

```
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {
  return (
    <div className="App">
      <img src={white} />
      <img src={yellow} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

This doesn't quite get us where we want to go.

<img src="./assets/Screen Shot 2019-06-25 at 10.10.16 PM.png" alt="drawing" width="1000px"/>

Our application has the assets we want but we only want one lightbulb image to show at a time. To achieve this we're going to have to keep track of its state.

```
import React, {useState} from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {

  const [lightOn, setLightOn ] = useState();

  return (
    <div className="App">
      <img src={white} />
      <img src={yellow} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

A couple of things have changed here. First, we're importing the `useState` hook from the React library so we can use it.

`import React, {useState} from "react";`

Second, we've got this odd bit of syntax.

`const [lightOn, setLightOn ] = useState();`

This is the `useState` hook, and it's fundamental to understanding modern React. If its syntax looks strange to you you're not alone, but we'll get back to why it looks like that later. For now what you should understand is that while the line may look strange all it's really doing is declaring two variables the way you normally might. For now it's okay to imagine that it's doing something real close to this:

```
let lightOn;
let setLightOn = (value) => {lightOn = value;};
```

(Note: ignore the discrepency between the use of `const` in the hook and `let` in my example. It's not important for now.)

The sharp eyed among you might have noticed that `lightOn` doesn't have a value.  
But as you can see if we were to invoke `setLightOn` and pass in a value as an argument, we can change the value of `lightOn`.

```
setLightOn("sup");
console.log(lightOn); // "sup"
```

But what if we don't want to have to manually assign a value to `lightOn` right away? What if we want that variable to be initialzed with a value from the get-go? We can do that.

Let's change:

`const [lightOn, setLightOn ] = useState();`

To:

`const [lightOn, setLightOn ] = useState(false);`

Now it's sort of like we're saying this:

```
let lightOn = false;
let setLightOn = (value) => {lightOn = value;};
```

In summation the `useState` hook `const [lightOn, setLightOn ] = useState(false);` works like this:

`lightOn` is a variable the value of which is whatever we passed in to `useState`. In this case it's value is the boolean primitive `false`. `setLightOn` is a function that will change the value of `lightOn`. We'll also note that I could have named `lightOn` and `setLightOn` whatever I wanted. I could've named them `peanutButter` and `jelly` if I wanted but that would've made it pretty confusing for someone reading my code to understand what they do.

### Recap

Okay, so what have we learned? We know what state is in an application. We also know how to keep track of a state variable from within a component, we know how to initilize it with a value, and we know how we can change that value. What's missing?

Well for one we still have two light bulbs. We have a state variable initialized and a way to change it but our lightbulbs don't know it exists. We have to make our lightbulbs aware of what the state is in some way so that they can know what to do when it changes. We're going to need to learn a critically important pattern to make that happen.

# Conditional Rendering

## What is Conditional Rendering?

Conditional rendering is just a fancy name for a very common pattern in React. We don't want to see both lightbulbs at once. We only want to **render** one or the other on the basis of some **condition**. In this case if the `lightOn` boolean is set to `false` we want to see the white lightbulb. If it's set to true we want to see the yellow one. This is a straightforward use-case for the ternary operator in JavaScript.

```import React, { useState } from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {
  const [lightOn, setLightOn] = useState(false);

  return (
    <div className="App">
      {lightOn === false ? <img src={white} /> : <img src={yellow} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

This is the only part that changed:

```
    <div className="App">
      {lightOn === false ? <img src={white} /> : <img src={yellow} />}
    </div>
```

A ternary operator acts as a single line `if/else` statment. This line:

`{lightOn === false ? <img src={white} /> : <img src={yellow} />}`

It's saying _"Is the `lightOn` state variable set to `false`? If so render `<img src={white} />`, otherwise render `<img src={yellow} />`_

Remember this pattern, you'll use it a lot.

So what's the result of this code?  Well let's find out.

<img src="./assets/Screen Shot 2019-06-25 at 11.18.06 PM.png" alt="drawing" width="1000px"/>

Progress.  It's only showing the white bulb.  What if we want it to show the yellow one now?  Well remember, our ternary operator is conditionally rendering one lightbulb or the other.  It's being told to show the whtie one if `lightOn` is set to false, and to show the yellow one if it's `true`.  What happens if we hard code the initial value of `lightOn` to true?

```const [lightOn, setLightOn] = useState(true);```

The result?


<img src="./assets/Screen Shot 2019-06-25 at 11.22.23 PM.png" alt="drawing" width="1000px"/>

Victory is nearly ours.  We setup up a condition on which to render one bulb or the other.  That condition was based on our application's state.  When we forced the state of the application to change what appeared on the page *reacted* to that change.  That's what React is really all about.  Your state changes and your application *reacts*.

The last step is figuring out how to change the state.

Remember our hook from earlier?

``` const [lightOn, setLightOn] = useState(false);```

You'll recall that `setLightOn` is a function that can change the value of `lightOn`.  Now we just have to find a way to invoke this function.

# Click Listeners

You've already used click listeners outside of React so we're finally going to look at something that feels familiar.  To attach a click listener to a react component we need to use this camel-casing: `onClick`.  Let's put one on our `<div>`.

Before we talk about the right way to do this, however, I want to show you a couple *wrong* ways.  I want to do this for two reasons.  1) It will help us think more critically about how React works and 2) You will almost certainly make this mistake at some point and it'll help to know what to look out for.

So again, this is wrong:

```
import React, { useState } from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {
  const [lightOn, setLightOn] = useState(true);

  return (
    <div onClick={setLightOn} className="App">
      {lightOn === false ? <img src={white} /> : <img src={yellow} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

This is the relevant line:

`<div onClick={setLightOn} className="App">`

The reason this is wrong is because `setLightOn` is expecting an argument.  Wewps!  Commong mistake.  Well, no problem we'll just pass it one like so:

`<div onClick={setLightOn(false)} className="App">`

Now our code looks like this:

``````
import React, { useState } from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {
  const [lightOn, setLightOn] = useState(true);

  return (
    <div onClick={setLightOn(false)} className="App">
      {lightOn === false ? <img src={white} /> : <img src={yellow} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
``````

Wewps.  Everything broke again.  What happened?

Essentially `<div onClick={setLightOn(false)} className="App">` is invoking `setLightOn(false)` over and over again and each invocation is triggering a rerender.  We stumbled into an infinite loop.  What we meant to write was this.

`<div onClick={ ()=> setLightOn(false) } className="App">`

See the difference?

```
// Everything is on fire
<div onClick={ setLightOn(false) } className="App">

// Everything is fine
<div onClick={ ()=> setLightOn(false) } className="App">
```

The first invokes the function every nanosecond.  The second only invokes it when you click the div.

There's one last little tweak we need to make to get our application to work.  Try to figure it out for yourselves before reading on.


## Challenge
### Make our lightbulb app work


In this case we're passing `false` as an argument to `setLightOn` every time.  That means the state will always be false which means we're only ever going to hit one of our two conditions in our render.  Instead of passing `false`, let's just pass the opposite of whatever the state is.

`<div onClick={ ()=> setLightOn(!lightOn) } className="App">`

The final code looks like this:

```import React, { useState } from "react";
import { render } from "react-dom";
import "./styles.css";

const white = "https://image.flaticon.com/icons/png/512/32/32177.png";
const yellow =
  "https://i.pinimg.com/originals/92/94/ba/9294badee7b8f3d93fa9bc6c874641b2.png";

function App() {
  const [lightOn, setLightOn] = useState(true);

  return (
    <div onClick={() => setLightOn(!lightOn)} className="App">
      {lightOn === false ? <img src={white} /> : <img src={yellow} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

And the result?


<img src="./assets/Jun-25-2019 23-51-36.gif" alt="drawing" width="1000px"/>