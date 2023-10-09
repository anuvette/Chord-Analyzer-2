function playCheckedSounds() {
    const checkboxes = document.querySelectorAll(".container input[type='checkbox']");
    const frequencies = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const frequency = parseFloat(checkbox.dataset.frequency);
            if (!isNaN(frequency)) {
                frequencies.push(frequency);
            }
        }
    });

    const reversedFrequencies = frequencies.reverse(); // Reverse the frequencies array

    reversedFrequencies.forEach((frequency, index) => {
        setTimeout(() => {
            playAudio(frequency);
        }, index * 500); // 500 milliseconds (0.5 seconds) delay between each sound
    });
}

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", playCheckedSounds);
