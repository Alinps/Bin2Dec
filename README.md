# BaseBridge Converter

A lightweight browser-based number base converter built with plain HTML, CSS, and JavaScript.

## Current Support

- Binary to Decimal
- Decimal to Binary

## Planned Support

- Hexadecimal conversion
- Octal conversion

## Features

- Convert using **From** and **To** base selectors.
- Input limit up to 16 characters.
- Inline validation and clear error messages.
- Status-based output styling (success, error, neutral).
- Responsive UI optimized for desktop and mobile.

## Project Structure

```text
Bin2Dec/
├── README.md
└── src/
    ├── index.html
    ├── script.js
    └── styles.css
```

## How to Run

1. Open the project folder.
2. Open `src/index.html` in any modern browser.

No dependencies or build tools are required.

## How to Use

1. Enter a value in the input field.
2. Choose the source base from the first dropdown.
3. Choose the target base from the second dropdown.
4. Click **Convert**.

## Validation Notes

### Binary input

- Cannot be empty.
- Must contain only `0` and `1`.
- Maximum length is 16 digits.

### Decimal input

- Decimal-to-binary conversion is available.
- Additional strict validation for invalid decimal formats can be improved in future updates.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
