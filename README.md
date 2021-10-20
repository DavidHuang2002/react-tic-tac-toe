# react-tic-tac-toe

In this repo I follow through the react tutorial found in [here](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)

I first only followed through part of the tutorial and decided to try to implement the rest on my own and got the basic functionality done. [Here is my version](tic-tac-toe/src/MyGame.js).

Then, after reading the tutorial, I recreated the program. The implementation is not entirely the same but is similarly enough (though in my not so humble opinion mine is better in one or two details). [Here is my recreation of the tutorial](tic-tac-toe/src/TutorialGame.js).

## Reflection & Notes

### Track the state in one place

The biggest mistake I made in my initial implementation is having Square and Board each keeps track of a state. This makes the problem a bit harder when developing checkWinning and makes the programmer harder to refactor and debug.

The tutorial chooses to __lift the state up__. It only lets the component on the highest level keep track of state and passes the needed info through props, making Square and Board __controlled components__

__Lesson__: If possible, keep track of the state only in the highest level component. __The more concentrated the state info, the easier to debug and expand based on it__

### Immutability is important

Even with mutables like Array, Set, its important to __create copy__ of them when modifying and treat them like immutables for the following reasons:

- it will make implementing features like history/undo a lot easier
- It makes it easier to detect changes since copies are referenced differently
- Helps in building pure components, which helps react decide which component need re-rendering.

### Function component

A simple way to write component that only has render method

### Helper function

The tutorial puts helper function outside of the component class. In my implementation, I chose to put helper function as a method of the class. But in reflection, I thought putting it outside and making the component minimal would be better.

## Other concepts

### const keywords

I originally thought vars declared with const can't be changed. However, const vars can be mutated; they just cant be reassigned. Ex: const a = Array(9); a[0] = 1; is acceptable

### Optimization

I ran into [this article](https://medium.com/@ryanflorence/react-inline-functions-and-performance-bdff784f5578) recently.

Parts of the article was too advanced for me to understand, but an idea it mentions stroke me as interesting: __Avoid premature optimization__. And this quote:

> If you aren’t measuring, you can’t even know if your optimizations are better, and you certainly won’t know if they make things worse!

Although I have almost literally no experience with optimization so far, I does find myself worrying about stuffs like "will doing this create a copy" or "should I try passing in by reference". Well, this idea gives me more reason to focus on the readability of my code and on __how to implement a feature in the most intuitive, easily-understandable way instead of taking tortuous routes for the imagined sake of better performance.__

## Unanswered question

### this.state undefine and arrow function

In the time travel section, the tutorial has the onClick as a normal method but when I do the same thing I found myself running into the error of 'this.state' being undefined.

I have run into the same error before. Its caused by Javascript's confusing behavior with "this" and the solution is to change the method into an arrow function( more detail on [this StackOverflow question](https://stackoverflow.com/questions/45998744/react-this-state-is-undefined))

So I am confused: why does his code works fine(and it works fine on codepen) but mine doesn't? I really can't wrap my head around it
