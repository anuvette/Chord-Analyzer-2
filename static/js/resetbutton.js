const untickButton = document.getElementById("untickButton");
const container = document.querySelector(".container");

untickButton.addEventListener("click", function () {
    const checkboxes = container.querySelectorAll("input[type='checkbox']");


    checkboxes.forEach(checkbox => 
    {
            checkbox.checked = false;
            const radioTile = checkbox.nextElementSibling;
            radioTile.style.opacity = 0;
            

    });
    const chordOutputDiv = document.querySelector(".chordOutput");
    console.log("Prior to Cleared allChordsOutput:", UserNotesArray); // Log the uncleared array for debugging
    UserNotesArray.splice(0, UserNotesArray.length);
    chordOutputDiv.innerHTML = "";
    console.log("Cleared allChordsOutput:", UserNotesArray); // Log the cleared array for debugging

});