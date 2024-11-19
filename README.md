# Responsive Visualization

**Author: Dr. Hyeok Kim**

This project demonstrates a responsive data visualization using D3.js and Bootstrap. The visualization displays the approval rates of various candidates in a bar chart format. The chart adjusts its layout and styling based on the screen size to ensure optimal readability and usability across different devices.

## Features

- **Responsive Design**: The chart adapts to different screen sizes using media queries and Bootstrap's grid system.
- **Dynamic Data**: The approval rates of candidates are dynamically rendered using D3.js.
- **Device-Specific Parameters**: The chart's dimensions, padding, font sizes, and other parameters are adjusted based on the detected device type (e.g., extra-large, large, medium, small, extra-small).

## How It Works

1. **HTML and CSS**: The page structure and styling are defined using HTML and CSS, with Bootstrap providing the responsive layout.
2. **JavaScript and D3.js**: The chart is created and rendered using D3.js. The script dynamically adjusts the chart's parameters based on the screen size.
3. **Media Queries**: CSS media queries are used to apply different styles to the header based on the screen size.

## Usage

To view the responsive visualization, simply open the `responsive-vis-ex.html` file in a web browser. The chart will automatically adjust to fit the screen size of the device.

## Dependencies

- [Bootstrap 5.3.3](https://getbootstrap.com/)
- [D3.js v7](https://d3js.org/)

## License

This project is licensed under the MIT License.
