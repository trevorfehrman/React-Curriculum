# Module Project: Forms - Team Builder

This project allows you to practice the concepts and techniques learned in this module and apply them in a concrete project. This module explored Form management in React.  You learned about controled inputs, semantic HTML, some ES6 tools like the spread operator and computer properties, and synthetic events. In your project you will demonstrate proficiency of these subjects and principles by creating an application using each of these.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this project.**

### Commits

Commit your code regularly and meaningfully. This helps both you and your team lead in case you ever need to return to old code for any number of reasons.

### Description

In this project you'll build an app that will keep track of memebers of a team.  You'll be able to add members to this team as well as edit their details.

## Project Set Up

- [ ] Create a forked copy of this project.
- [ ] Add your team lead as collaborator on Github.
- [ ] Clone your OWN version of the repository in your terminal
- [ ] CD into the project base directory `cd american-football-scoreboard`
- [ ] Download project dependencies by running one of these two commands `yarn` or `npm install`
- [ ] Using the same command tool (yarn or npm) start up the app using `yarn start` or `npm start`
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repository). **Please don't merge your own pull request**
- [ ] Add your team lead as a reviewer on the pull-request
- [ ] Your team lead will count the project as complete by merging the branch back into master.
- [ ] Do your magic!

## Minimum Viable Product

1. Build out the `Form.js` component.  Your form should have inputs for `name`, `email` and `role` (backend engineer, frontend engineer, designer, etc.  Use your imagination).
2. Pass a setter method down to the first form component in `App.js` so that you can add team members to your state.  Remember to import `useState` and think carefully about what kind of data structure you'll need to keep track of this data.
4. Map over your data in `App.js` and render your team members to the DOM.
3. Create a method that will handle editing one or more details of a team member and pass that method down to the second form component.  Observe the power of reusability.

### STEP 1 - Setup your state

- Import the `useState` hook

- Give the state variable you just declared a default value.  You will need to keep track of a list of team members and each team member will have several key/value pairs associated with them.

### STEP 2 - Build your form.

- In `Form.js` build out your markup.
- Import the useState hook and utilize what we learned about two-way data binding.
- Pass the state setter method down from `App.js` to this form and send the form data back up to it as its argument.

### STEP 4 - Create your edit team member function.

- Create a function in `App.js` that will edit one or more of the details of a team member and pass it down to the second form component.

- You'll have to find a way to loop over the data in your state, find the specific team member you intend to edit, and finally change the details with the data sent up to you from the second form component.  `.map()` will be your friend for that task.  You'll also want to avoid directly mutating your data.  The `...` spread operator will be your friend there.

## Stretch Problems

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- Try and conditionally render the edit form when you click a button on one of your team members.

- Build another layer of your App so that you can keep track of multiple teams, each with their own ecapsulated list of team members.

- Look into the various strategies around form validation.  What happens if you try to enter a number as a team-members name?  Does your App allow for that?  Should it?  What happens if you try and enter a function as the value to one of your fields?  How could this be dangerous?  How might you prevent it?

- Style the forms.  There are some subtle browser defaults for input tags that might need to be overwritten based on their state (active, focus, hover, etc.);  Keep those CSS skill sharp.