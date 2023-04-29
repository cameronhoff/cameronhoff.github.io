document.addEventListener('DOMContentLoaded', () => {
    const calcPcBtn = document.querySelector('#calc-pc-btn');
    const polynomInput = document.querySelector('#polynomial-input');

    polynomInput.addEventListener('input', () => {
        let degree = polynomInput.value.length;
        document.getElementById("polynomialDegree").innerHTML = `Степінь полінома = ${degree}`;
    })

    calcPcBtn.addEventListener('click', () => {
        const rwebResults = document.querySelector('#rweb-results');
        rwebResults.innerHTML = '';
        calculate_rweb(polynomInput.value);
    })
});

function calc_mod(step) {
  step = step.toString(2);
  let factor = parseInt(step, 2);
  let arr_factor = step.split("").reverse();
  let arr_res = [];
  for (let i = 0; i < arr_factor.length; i++) {
    arr_res = [...arr_res, (factor * parseInt(arr_factor[i], 2)) << i];
  }
  let x = 0;
  for (let i = 0; i < arr_res.length; i++) {
    x ^= arr_res[i];
  }
  return (x >>> 0).toString(2) + "0";
}

function calc_step(step, degree, polinom_int) {
  if (step.toString(2).length >= degree) {
    let diff = step.toString(2).length - (degree + 1);
    let pol_step = polinom_int * 2 ** diff;
    step = step ^ pol_step;
    step = calc_step(step, degree, polinom_int);
  }
  return step;
}

function calculate_rweb(pol) {
  try {
    let polinom_bin = pol;
    let res_steps = [2];
    let step = 2;
    let polinom_int = parseInt(polinom_bin, 2);
    let degree = polinom_int.toString(2).length - 1;
    for (let i = 1; i < 255; i++) {
      // Step > polinom length
      if (calc_mod(step).length < degree + 1) {
        step = parseInt(calc_mod(step), 2);
        res_steps = [...res_steps, step];
        if (step == 1) {
          return;
        }
      }
      // Step < polinom length
      else {
        step = parseInt(calc_mod(step), 2);
        step = calc_step(step, degree, polinom_int);
        res_steps = [...res_steps, step];
        if (
          [1, 2, 8, 128, 32768, 2147483648].includes(step) &&
          res_steps.includes(parseInt(calc_mod(step), 2))
        ) {
          break;
        }
      }
    }
    res_steps = res_steps.map((x) => (x >>> 0).toString(2));
    const rwebResults = document.querySelector('#rweb-results');
    for (let listStep = 0; listStep < res_steps.length; ++listStep) {
      let el = document.createElement('li');
      el.setAttribute('class', 'list-group-item');
      el.innerHTML = res_steps[listStep];
      rwebResults.appendChild(el);
    }
    //console.log(res_steps);
  } catch (e) {
    console.log(e);
    console.log("Перевірте правильність введених даних.");
  }
}