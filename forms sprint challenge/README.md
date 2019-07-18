# Form Managment Sprint Challenge

1. Navigate to the BE folder in this repository from the command line and run `npm start` to spin up the server provided for you.

2. Create your React app in the Front End folder.

3. Using Formik, create a Sign Up form with two input fields, one for username nad one for password. Validate these input fields with Yup.

4. Using Axios issue a post request to `http://localhost:6000/api/register`. The post request should send an object with the following shape:

```
{
    username: "Your name",
    password: "password"
}
```

Successfully sending a post request to this url will return an object to you with this shape:

```
{
    "error": "false",
    "message": "User created successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYzNDc2NTc0LCJleHAiOjE1NjM0ODAxNzR9.pIkjFgRRbrrg8j38YGiWpMlw0wgTWRfZmIIMAeFLQcw"
}
```

You may now issue a post request to `http://localhost:6000/api/login` to recieve another token, though this is not required (see stretch).

5.  Write a custom hook that can set and retrieve this token to and from local storage.

6.  Make a get request to `http://localhost:6000/api/restricted/data` with the token you recieved attached to an authoriaztion header.

`Authoriaztion: "**your token here**"

7. Map over the array of objects you recieve and render some or all of it's information to the DOM.

STRETCH:

1. Styling! Make your form pretty. Research pseudo elements and event selectors. Try to find interesting ways to present and layout the data you recieve from the back end.

2. Make a Login form. Compuse your Formik form in such a way that it can be extracted into a component and reused for both Register and Login.

3. Deep dive into validation. Can you make your register form check to see if a password is long enough? If it has special characters? Make two password fields for register and prevent the post request if the passwords don't match.
