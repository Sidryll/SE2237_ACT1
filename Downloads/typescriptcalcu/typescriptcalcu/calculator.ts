class Calculators {
    // Reference to the display screen element
    private screen: HTMLInputElement;
    // Holds the current input number as a string
    private currentOperand: string = '';
    // Holds the previous input number for operations
    private previousOperand: string = '';
    // Holds the current operation (e.g., +, -, *, /)
    private operation: string | null = null;
    // Tracks if the calculator is turned off
    private isOff: boolean = false;

    // Array of greetings in various languages
    private greetings: string[] = [
        "Hello", "Hola", "Bonjour", "Kamusta", "Ciao", "Hallo",
    ];

    // Constructor initializes the calculator state and updates the display
    constructor() {
        this.screen = document.getElementById('screen') as HTMLInputElement; // Get the screen element
        this.updateDisplay(); // Initial display update
    }

    // Method to clear all inputs and reset the calculator state
    clearAll(): void {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.isOff = false;
        this.updateDisplay(); // Update display after clearing
    }

    // Method to delete the last digit of the current input
    backspace(): void {
        if (this.isOff) return; // Prevent action if the calculator is off
        this.currentOperand = this.currentOperand.slice(0, -1); // Remove last character
        this.updateDisplay(); // Update display after backspace
    }

    // Method to append a number to the current input
    appendNumber(number: string): void {
        if (this.isOff) return; // Prevent action if the calculator is off
        // Prevent adding multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number; // Append number to current input
        this.updateDisplay(); // Update display after appending
    }

    // Method to set the current operation
    setOperation(operation: string): void {
        if (this.isOff) return; // Prevent action if the calculator is off
        if (this.currentOperand === '') return; // Must have a number to perform operation
        // Calculate previous operation if it exists
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation; // Set the current operation
        this.previousOperand = this.currentOperand; // Store current input as previous
        this.currentOperand = ''; // Clear current input for next number
        this.updateDisplay(); // Update display to reflect new state
    }

    // Method to perform the calculation based on the current operation
    calculate(): void {
        if (this.isOff) return; // Prevent action if the calculator is off
        let computation: number; // Variable to store the result of the computation
        const prev = parseFloat(this.previousOperand); // Convert previous operand to number
        const current = parseFloat(this.currentOperand); // Convert current operand to number
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

        // Update the current operand with the result of the calculation
        this.currentOperand = computation.toString();
        this.operation = null; // Clear the operation after calculation
        this.previousOperand = ''; // Reset previous operand
        this.updateDisplay(); // Update display to show the result
    }

    // Method to display a random greeting message
    sayHello(): void {
        if (this.isOff) return; // Prevent action if the calculator is off
        const randomGreeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
        this.screen.value = randomGreeting; // Show greeting on screen
        setTimeout(() => this.updateDisplay(), 1000); // Clear display after 1 second
    }

    // Method to turn off the calculator and show a goodbye message
    sayBye(): void {
        this.isOff = true; // Set calculator state to off
        this.screen.value = "Goodbye"; // Show goodbye message
        setTimeout(() => {
            this.screen.value = ''; // Clear display after 1 second
        }, 1000);
    }

    // Private method to update the display based on the current state
    private updateDisplay(): void {
        if (this.isOff) {
            this.screen.value = ''; // Clear display if calculator is off
            return;
        }
        // Display the operation and operands if an operation is set
        if (this.operation != null) {
            this.screen.value = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
        } else {
            // Otherwise, just show the current operand
            this.screen.value = this.currentOperand;
        }
    }
}

// Instantiate the calculator class
const calculator = new Calculators();
