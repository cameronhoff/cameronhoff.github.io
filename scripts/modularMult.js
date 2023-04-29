document.addEventListener('DOMContentLoaded', () => {
  // function to enable/disable calculate button based on selected radix
  function updateCalcMmBtn() {
    const radix = document.querySelector('#radix-selector').value;
    if (radix === "Вибрати") {
      calcMmBtn.setAttribute('class', 'btn btn-primary disabled');
    } else {
      calcMmBtn.setAttribute('class', 'btn btn-primary'); 
    }
  }

  // select calculate button
  const calcMmBtn = document.querySelector('#modularMultCalcBtn');

  // call the function once to initialize the button state
  updateCalcMmBtn();

  // add event listener to update button state every time the selector changes
  document.querySelector('#radix-selector').addEventListener('change', updateCalcMmBtn);

  calcMmBtn.addEventListener('click', () => {
    // read first multiplier
    const m1 = document.querySelector('#multiplier1-input').value;
    // read second multiplier 
    const m2 = document.querySelector('#multiplier2-input').value;
    
    // read radix
    const radix = document.querySelector('#radix-selector').value;
    // calculate
    calculateMult(m1, m2, radix);
  })
});

function calculateMult(m1, m2, radix) {
    // convert m1 from string to integer in the given radix
    m1 = parseInt(m1, parseInt(radix));
    // reverse the digits of m2
    m2 = m2.split('').reverse().join('');
    // create an empty array called res
    const res = [];
    // iterate through the digits of m2
    for (let i = 0; i < m2.length; i++) {
        // convert the i-th digit of m2 from string to integer in the given radix
        const digit = parseInt(m2[i], parseInt(radix));
        // if the digit is not zero, push m1 times 2 to the power of i to the res array
        if (digit !== 0) {
            res.push(m1 * 2 ** i);
        }
    }
    // initialize x to zero
    let x = 0;
    // iterate through the elements of res
    for (let i = 0; i < res.length; i++) {
        // calculate the XOR of x and the i-th element of res and assign it to x
        x ^= res[i];
    }
    // if radix is equal to '2', set the value of the mult-result-input element to x in binary
    if (radix === '2') {
        document.getElementById('mult-result-input').value = x.toString(2);
    } else {
        document.getElementById('mult-result-input').value = decToBase(x, parseInt(radix));
    }
}

function decToBase(num, radix) {
    // create a string of digits that correspond to the given radix
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // initialize res to an empty string
    let res = '';
    
    while (num > 0) {
        // calculate the remainder of num divided by radix and assign it to digit
        const digit = num % radix;
        // add the digit-th character of digits to the beginning of res
        res = digits[digit] + res;
        // divide num by radix and round down to the nearest integer
        num = Math.floor(num / radix);
    }
    return res;
}
