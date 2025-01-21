// Toggle between login and registration forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

// Animated background
const waves = document.querySelector('.wave');
let rotation = 0;

function createWaves() {
    const numberOfWaves = 4;
    for (let i = 0; i < numberOfWaves; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.animation = `wave ${8 + i * 2}s infinite linear`;
        wave.style.opacity = `${0.5 - (i * 0.1)}`;
        wave.style.transform = `rotate(${45 * i}deg)`;
        document.body.appendChild(wave);
    }
}

createWaves();

// Form submission handlers
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted');
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration attempted');
});
