# What is React

## React has an intimidating reputation but this is a real shame. In this article I hope to persuade you that React dramatically simplifies the process of making a web application though it does require that we adjust our thinking.

**By the end of this module you should be able to**:

- Describe what React is and the problems it aims to solve.
- Use interpolated JavaScript to display information on a page.
- Understand the difference between imperative and declarative programming.

# Learn

## Anatomy of a React Component

```
import React from 'react';

const Intro = () => {
  return (
    <div>
      <h1>Hi Lambda!</h1>
    </div>
  );
};
```

This is a React "component". A "component" is pretty loose term to describe a discrete chunk of your site. A header could be a component for example. Or a footer. Or a hero section, etc. This one's pretty simple, all we're doing is rendering a `div` with an `h1` inside of it.

No gotchas yet. This is going to generate pretty much what you'd expect.

<img src="./assets/Screen Shot 2019-06-27 at 11.36.55 AM.png" alt="drawing" width="300px"/>

So what's so odd about this? Well we're mixing two disparate syntaxes here, right? Part of this block is a regular JavaScript Function.

```
const Intro = () => {
  return (
   ...
  );
};
```

And another part looks a lot like HTML.

```
    <div>
      <h1>Hi Lambda!</h1>
    </div>
```

That's weird. You can't do that in JavaScript so what the heck is going on here?  
We don't need to understand all the details yet, but the basic idea is that the above block only _looks_ like HTML.

Its real name is JSX and underneath its disguise it's actually just a JavaScript object. This is a simplification, but what our example above efectively translates to is something like this.

```
import React from 'react';

const Intro = () => {
  return (

      {
          type: 'div',
          props: {
              children: {
                  type: 'h1',
                  props: {
                      children: "Hi Lambda!"
                  }
              }
          }
      }

  );
};
```

So when we return what looks like HTML in a React component what we're secretly returning is a JavaScript object that describes the kind of HTML we _want_ to make. React is going to figure out how to actually make it for us later.

It's important to understand early on that a React component is _just a regular JavaScript function._ We could return an object (sort of) like the one written above and it would work, but we want to use JSX for a couple of reasons. First, it's easier to read than that big nested object. And second it's going to allow us to put our application's logic where it belongs: directly next to the thing the logic applies to.

# Interpolated JavaScript

## A brief demonstration of React's power

In the above example we've hardcoded the text of our `h1` tag to read `Hi Lambda!`. But React gives us the ability to control our app's content dynamically. Look at this:

```
import React from 'react';

const Intro = () => {
  const greeting = "Hi Lambda!";
  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
};
```

<img src="./assets/Screen Shot 2019-06-27 at 11.36.55 AM.png" alt="drawing" width="300px"/>

Our code changed, but our output is the same. Because we're just in a regular JavaScript function we're free to declare a variable the way we normally do: `const greeting = "Hi Lambda!";`

Once we're in our JSX, React gives us the power to _escape_ back into regular JavaScript and refer to that varibale by using the curly brackets `<h1>{greeting}</h1>`.

These curly brakets will evaluate _any_ valid JavaScript expression. So if we change`<h1>{greeting}</h1>` to `<h1>{2 + 2}</h1>`

We get:

<img src="./assets/Screen Shot 2019-06-27 at 12.06.05 PM.png" alt="drawing" width="300px"/>

Now you know the basic mechanism of React. We don't want to have to hardcode the content of our HTML, we want to be able to _compute_ it.

By now some of you are probably thinking, "Computing our markup, isn't that what we learned DOM manipulation for?" and it's a good question.

# React's Design Philosophy

## Why do it this way?

We're going to focus on two major pillars of React's design philosophy for now. The separation of concerns and declarative programming.

### Separation of concerns

_How can We know the dancer from the dance_

In computer programming "the spearation of concerns" refers to a design philosophy that each piece of your code should do one and only one thing. Functions with a lot of moving parts are hard to debug. One big function might be tricky to test. If we can split that function apart into smaller pieces that are easy to test individually our application will be more robust and easier to understand.

At first glance it might appear that putting our markup right next to our JavaScript is a violation of this principle but the React team thinks otherwise. They argue that we can't _truly_ separate a `<button>` tag from the function the button invokes. Separating the two, one in an HTML file and another in a JavaScript file, isn't a separation of concerns, it's cutting one concern in half and then putting one half in the bedroom and the other half in the garage. It's a headache we don't need to opt in to.

Consider the difference between this, the way you're used to doing it:

```
//HTML FILE
<button class="button"></button>

//JS FILE
let button = document.querySelector('.button');
button.addEventListener("click", (data)=>{...logic} )
```

And the React way:

```
<button onClick={ () => submitForm(data) } />
```

I would argue there are a lot more opportunities for something to go wrong in the first approach.

### Imperative Programming vs Declarative Programming

We have an array:

```
let myArray = [1,2,3,4,5];
```

And we want to iterate over it and double each number. Here's two ways we could go about it.

```
for (i = 0; i < myArray.length; i++) {
    myArray[i] = myArray[i] * 2;
}
```

Or:

```
const double =  (number) => {
    return number * 2;
}

myArray.map(double);
```

The first approach is an example of _imperative_ code, and this is the kind of approach we're most familiar with. There's nothing wrong with imperative code, it's very explicit and at a lower level _all_ code is ultimately imperative. The problem with imperative code is it's pretty abstruse and in more complex examples it can be hard to understand what the code does at a glance.

The second approach is an example of _declarative_ code. Instead of telling the computer, step by step, _how_ we want it to do something, we just tell it _what_ we want it to do.

`myArray.map(double)`

**"Map over my array and double everything inside of it."**

With practice declarative code is easier to parse. This is really important because, believe it or not, as a programmer most of your time isn't actually spent writing code. It's spent _reading other people's code and trying to understand what it does_. If you can grasp this distinction, and appreciate its value, congratulations. You now understand the basis of _functional programming_, the programming paradigm that React is modeled on.

## Summary

So now we know the very basics of what React does and why it does it this way. In the next section we're going to introduce one of the single most important concepts in programming: state.
