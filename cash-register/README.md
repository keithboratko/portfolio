# CASH REGISTER

## Overview

The Cash Register project is a web application built using HTML, CSS, and JavaScript. It simulates a cash register system that determines whether change can be provided for a purchase based on user input for the item price and the cash given. The application outputs the status of the cash register, detailing how change is to be made using various denominations.

## Technologies Used

- **HTML**: Creates structure of the web page.
- **CSS**: Used to style the web page to enhance user experience.
- **JavaScript**: Used to construct the main core of the application, handling user inputs, calculations, error handling, and dynamic manipulation of DOM elements.

## Demo Instructions

(Insert Demo Instructions Here)

## Project Functionality

### User Inputs

The user is required to provide the following inputs:
1. **Price**: The price of the item being purchased.
2. **Cash**: The amount of cash used to pay for the item.
3. **Denominational Breakdown**: The user populates each denomination in the cash drawer, according to the total sum of that denominational count.

### Change Calculation

Upon submission, the application processes the inputs to determine whether change can be made based on the following factors:
1. **Mathematical Feasibility**: Whether the cash drawers total is sufficient to supply the total change needed.
2. **Denominational Feasibility**: Whether the denominational breakdown of the cash drawer allows for proper change to be made.

### Outputs

The application returns one of three statuses:
1. **OPEN**: Change can be made, and the register can process another transaction (total is greater than zero).
2. **CLOSED**: Change can be made, and the register cannot process another transaction (total is zero).
3. **INSUFFICIENT FUNDS**: Change cannot be made, either because of mathematical or denominational infeasibility.

Along with the status output, the application returns an array of the change made (if "OPEN" or "CLOSED"), or an array displaying the original population of the cash drawer (if "INSUFFICIENT FUNDS"). 

## Methods and Theories Employed

### JavaScript Functions

The application uses four primary functions:
1) **buttonClick()**: Processes user input data and handles user interaction.
2) **checkCashRegister(price, cash, cid)**: The main function which determines whether change can be made and returns the appropriate status response.
3) **countDrawer(cid)**: Counts total sum of cash in register.
4) **canMakeChange(change, cid)**: Determines whether the register can produce proper change given its denominational breakdown.

### Data Structures

The application utilizes a dictionary to store the cash-in-drawer (CID) breakdown, allowing for easy access and manipulation of data.

### Algorithms

The logic for making change employs algorithms that ensure proper denomination distribution and efficiency, as well as mathematical accuracy.

## Lessons Learned

- **Modular/Functional Problem-Solving**: Breaking down complex problems into more singular functions enhances readability as well as testing and debugging.
- **JavaScript Mastery**: This project imrpoved my proficiency using JavaScript, particularly in regards to data handling and DOM manipulation.
- **Error Handling**: I was able to gain applicable experience in handling various error cases with specific outputs.

## Future Optimizations

- **UI/UX Enhancement**: Implement more robust CSS stylings to improve the user experience.
- **Currency Conversion**: Go a level deeper algorithmically to be able to convert between various world currencies.
- **Error Validation**: Build error handling to ensure proper format of user inputs and handling of cases involving incompatible inputs or input types.

##Acknowledgments

This project was sourced from [FreeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register), which provided only the prompt as well as several test cases and their desired outputs.

