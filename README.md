# q-calculator

This is a simple, web-based calculator for converting to and from q-format fixed point numbers. Fixed point arithmetic is often used in embedded enviroments for efficient signal processing, when the target microcontroller does not have a floating-point unit (FPU). 

[Fixed-point arithmetic on Wikipedia](https://en.wikipedia.org/wiki/Fixed-point_arithmetic)

This calculator allows the user to specify a scaling factor as a number of whole and fractional bits. Negative values are represented in twos-complement and a nagation bit is added implicitly. 

## Building

Build with `npm install && npm start`. Then run the app by opening `index.html` in the browser, either locally or remotely.