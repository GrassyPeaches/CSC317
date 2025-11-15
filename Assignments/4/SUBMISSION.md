Student Name and ID: [Graciela Ramirez 925009719]

GitHub Repository Link: https://github.com/GrassyPeaches/CSC317

GitHub Pages Link: https://grassypeaches.github.io/CSC317/Assignments/4/index.html#

Description of Implementation:
I built a calculator that could handle both the mouse and keyboard inputs. I started with my keyparts in my html for the calculator, like '.calculator', '.calculator__keys' and '.calculator__display'. Then I wrote the main click event listener for all the buttons in the html. 

I discovered that it is important to keep track of what is being entered. So I kept track of the first number, second number and the operator by storing them in calculator.dataset. This let me manage things like pressing multiple operators in a row or using “=” repeatedly, which also solved one of the outlier/errors.

For the actual math, I wrote a helper function called calculate() that takes two numbers and an operator (add, subtract, multiply, divide) and returns the result.I also added a round() function to clean up floating-point issues so results don’t show long decimals.

Later, I made sure to handle special cases that were mentioned in the instructions like division by zero, AC (all clear) and CE (clear entry), and the negative sign.

Finally, at the end I added keyboard support by listening for keydown events on the document.
When the user presses keys like numbers, +, -, *, /, or Enter, my code finds the corresponding calculator button and 'clicks' it programmatically speaking. That way, both keyboard and mouse inputs work exactly the same, reusing my existing logic so that I did not have to do it from scratch.

Overcoming Challenges: 
When I first started building my calculator, I honestly had no idea where to begin. JavaScript felt very overwhelming. I knew what I wanted the calculator to do, but not how to make it happen. I began by watching and reading through tutorials to understand the basic structure, and that gave me a rough roadmap. From there, I spent hours scouring Stack Overflow, documentations, our lectures and reading through other people’s code, and piecing together different solutions to issues I ran into. And I ran into a lot! Such as handling decimals, dealing with errors, managing multiple operations, and keeping the display accurate. I also revisited my lecture notes to connect what I was learning in theory to what I was actually coding. Over time, I began to slowly see how the DOM, event listeners, and functions all work together, however, I feel I still have a long way to go! It was frustrating at first, but by researching, experimenting, and fixing one problem at a time, I turned confusion into a learning excercise (although painful at times) I was able to put together a working calculator.

Additional Features:
I added a fun dice button that shows a random number between 1–9. I did this mainly to solve the uneven number of buttons and I thought it was cute!

Unfortunately, I was not able to get around to adding a them switcher for my calculator. Although I definately plan to keep working on refining my portfolio assignments, inlcuding this calculator assignmnet. 

Acknowledgments:
I would like to acknowledge the internet first and foremost! I did a lot of reading and watching of videos. Some of the most helpful sites were:
-W3 Schools
-zellwk.com
-freecodecamp.org
-freshman.tech
-stackoverflow.com
I would not have been able to do it without learning from these sites and of course I also referenced the lectures as well as asking chatgpt many follow up questions to specific details. 
