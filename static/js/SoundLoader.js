const soundButtons = document.querySelectorAll(".container");

function playAudio(frequency) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();

    oscillator.type = "sine"; // You can use different oscillator types like 'sine', 'square', 'sawtooth', or 'triangle'.
    oscillator.frequency.value = frequency;

    oscillator.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 1);
}

function handleButtonClick(event) {
    const checkbox = event.target;
    const frequency = parseFloat(checkbox.dataset.frequency);
    if (!isNaN(frequency)) {

        if (checkbox.checked) {
            playAudio(frequency);
        }
    }
}


soundButtons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});
