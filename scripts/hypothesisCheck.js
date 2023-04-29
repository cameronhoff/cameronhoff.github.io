document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('#start-hypo-btn');
  const sBlockSelector = document.querySelector('#s-block-quantity');

  startBtn.addEventListener('click', () => {
    let irrPoly = document.querySelector('#irreducible-polynomial-input').value;
    let theta = document.querySelector('#formative-element-input').value;
    let initVec = document.querySelector('#vector-initial-input').value;

    createGGM(theta);

  });
  sBlockSelector.addEventListener('change', () => {
    // select s-blocks divs
    const s1Block = document.querySelector('#s1-block-div');
    const s2Block = document.querySelector('#s2-block-div');
    const s3Block = document.querySelector('#s3-block-div');
    const s4Block = document.querySelector('#s4-block-div');

    // select s-blocks inputs
    const s1Input = document.querySelector('#s1-input');
    const s2Input = document.querySelector('#s2-input');
    const s3Input = document.querySelector('#s3-input');
    const s4Input = document.querySelector('#s4-input');

    switch (sBlockSelector.value) {
      case '2':
        clearSBlocks();
        // set visibility
        s1Block.setAttribute('class', 'form-group row mb-2 visible');
        s2Block.setAttribute('class', 'form-group row mb-2 visible');
        s3Block.setAttribute('class', 'form-group row mb-2 invisible');
        s4Block.setAttribute('class', 'form-group row mb-2 invisible');
        // generate s-blocks
        let random2Binaries = generateRandomBinaries(6, 2);
        s1Input.value = random2Binaries[0];
        s2Input.value = random2Binaries[1];
        break;

      case '3':
        clearSBlocks();
        // set visibility
        s1Block.setAttribute('class', 'form-group row mb-2 visible');
        s2Block.setAttribute('class', 'form-group row mb-2 visible');
        s3Block.setAttribute('class', 'form-group row mb-2 visible');
        s4Block.setAttribute('class', 'form-group row mb-2 invisible');
        // generate s-blocks
        let random3Binaries = generateRandomBinaries(4, 3);
        s1Input.value = random3Binaries[0];
        s2Input.value = random3Binaries[1];
        s3Input.value = random3Binaries[2];
        break;
        
      case '4':
        clearSBlocks();
        // set visibility
        s1Block.setAttribute('class', 'form-group row mb-2 visible');
        s2Block.setAttribute('class', 'form-group row mb-2 visible');
        s3Block.setAttribute('class', 'form-group row mb-2 visible');
        s4Block.setAttribute('class', 'form-group row mb-2 visible');
        // generate s-blocks
        let random4Binaries = generateRandomBinaries(3, 4);
        s1Input.value = random4Binaries[0];
        s2Input.value = random4Binaries[1];
        s3Input.value = random4Binaries[2]; 
        s4Input.value = random4Binaries[3];
        break;
    }
  });
});

// Create Generalized Galois matrix
function createGGM(theta) {
  let arr = theta.split("");
  const matrix = Array.from({length: 12}, () => Array(12).fill('0'));
  matrix[11] = arr;
  for (let i = 10; i >= 0; i--) {
    arr = arr.slice(1);
    arr.push('0');
    matrix[i] = arr;
  }
  console.log(matrix);
} 

function generateRandomBinaries(N, m) {
  let binaries = new Set();
  while (binaries.size < m) {
    let binary = '';
    for (let i = 0; i < N; i++) {
      binary += Math.floor(Math.random() * 2);
    }
    binaries.add(binary);
  }
  return Array.from(binaries);
}


function clearSBlocks() {
  const s1Input = document.querySelector('#s1-input').value = '';
  const s2Input = document.querySelector('#s2-input').value = '';
  const s3Input = document.querySelector('#s3-input').value = '';
  const s4Input = document.querySelector('#s4-input').value = ''; 
}
