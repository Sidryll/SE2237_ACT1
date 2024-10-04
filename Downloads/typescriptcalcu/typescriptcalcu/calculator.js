var Calculator = /** @class */ (function () {
    // Constructor initializes the calculator state
    function Calculator() {
        // Holds the current input number
        this.currentOperand = '';
        // Holds the previous input number for operations
        this.previousOperand = '';
        // Holds the current operation (e.g., +, -, *, /)
        this.operation = null;
        // Tracks if the calculator is turned off
        this.isOff = false;
        // Array of greetings in various languages
        this.greetings = [
            "Hello", "Hola", "Bonjour",
             "Kamusta", "Ciao", "Hallo"
        ];
        // Reference to the display screen element
        this.screen = document.getElementById('screen');
        // Initial update of the display
        this.updateDisplay();
    }

    // Method to clear all inputs and reset the calculator state
    Calculator.prototype.clearAll = function () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.isOff = false;
        this.updateDisplay();
    };

    // Method to delete the last digit of the current input
    Calculator.prototype.backspace = function () {
        if (this.isOff) return; // Prevent action if the calculator is off
        this.currentOperand = this.currentOperand.slice(0, -1); // Remove last character
        this.updateDisplay();
    };

    // Method to append a number to the current input
    Calculator.prototype.appendNumber = function (number) {
        if (this.isOff) return; // Prevent action if the calculator is off
        // Prevent adding multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number; // Append number to current input
        this.updateDisplay();
    };

    // Method to set the current operation
    Calculator.prototype.setOperation = function (operation) {
        if (this.isOff) return; // Prevent action if the calculator is off
        if (this.currentOperand === '') return; // Must have a number to perform operation
        // Calculate previous operation if it exists
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation; // Set the current operation
        this.previousOperand = this.currentOperand; // Store current input as previous
        this.currentOperand = ''; // Clear current input for next number
        this.updateDisplay();
    };

    // Method to perform the calculation based on the current operation
    Calculator.prototype.calculate = function () {
        if (this.isOff) return; // Prevent action if the calculator is off
        var computation; // Variable to store the result of the computation
        var prev = parseFloat(this.previousOperand); // Convert previous operand to number
        var current = parseFloat(this.currentOperand); // Convert current operand to number
        if (isNaN(prev) || isNaN(current)) return; // Ensure both operands are valid numbers
        // Perform calculation based on the operation
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return; // If no valid operation, exit
        }
        // Update the current operand with the result
        this.currentOperand = computation.toString();
        this.operation = null; // Clear the operation after calculation
        this.previousOperand = ''; // Reset previous operand
        this.updateDisplay();
    };

    // Method to display a random greeting message
    Calculator.prototype.sayHello = function () {
        var _this = this;
        if (this.isOff) return; // Prevent action if the calculator is off
        var randomGreeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
        this.screen.value = randomGreeting; // Show greeting on screen
        setTimeout(function () { return _this.updateDisplay(); }, 1000); // Clear display after 1 second
    };

    // Method to turn off the calculator and show a goodbye message
    Calculator.prototype.sayBye = function () {
        var _this = this;
        this.isOff = true; // Set calculator state to off
        this.screen.value = "Goodbye"; // Show goodbye message
        setTimeout(function () {
            _this.screen.value = ''; // Clear display after 1 second
        }, 1000);
    };

    // Method to update the display based on current state
    Calculator.prototype.updateDisplay = function () {
        if (this.isOff) {
            this.screen.value = ''; // Clear display if calculator is off
            return;
        }
        // Display the operation and operands if an operation is set
        if (this.operation != null) {
            this.screen.value = "".concat(this.previousOperand, " ").concat(this.operation, " ").concat(this.currentOperand);
        } else {
            // Otherwise, just show the current operand
            this.screen.value = this.currentOperand;
        }
    };

    return Calculator; // Return the Calculator class
}());

window.Calculator = Calculator; // Expose the Calculator class to the global scope
