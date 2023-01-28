# MY VERY OWN CODE EDITOR

## Introduction
As the name suggests, the project provides an online platform for writing code. It allows user to code in only two programming languages namely Python and javascript.
The left side of the screen is a text editor with auto-complete feature. From the top you can choose the language of your choice and on clicking on run we will see the output of our code on the right side.

## Tech stack
1. For Backend:
  - NodeJS
  - Express
2. For Frontend:
  - React

## Dependencies
- NodeJS `fs` module
- NodeJS `path` module
- NodeJS `child_process` module
- `react-ace`

## Working
- We type in the code and file extension and save it in states as strings.
- Then react makes a `post` request to our backend.
- Our backend server then uses the `fs` module to create a file of the chosen extension.
- Then with the help of `exec` function of `child_process` module we execute the file created.
- We then fetch the output and return it in our API response body.
- From there react takes the output and renders it in the output space.

## Upcomming updates
- I look forward to add a room functionality so users can code solo or collaborate on other projects.
- I look forward to increase the number of languages that the user can code in.

## Have a look at it working
![Alt text](https://github.com/kaisar12012000/my-own-code-editor/blob/master/GitHub%20video.gif)
