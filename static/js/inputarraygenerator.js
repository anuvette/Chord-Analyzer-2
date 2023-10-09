var checkboxes1 = document.getElementsByName('row1');
var checkboxes2 = document.getElementsByName('row2');
var checkboxes3 = document.getElementsByName('row3');
var checkboxes4 = document.getElementsByName('row4');
var checkboxes5 = document.getElementsByName('row5');
var checkboxes6 = document.getElementsByName('row6');

var UserNotesArray = [];
function handleCheckboxChange1(event) {
    var clickedCheckbox = event.target;
    if (clickedCheckbox.checked) {
        checkboxes1.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                var radioTile = checkbox.parentNode.querySelector('.radio-tile'); // Traverse to the .radio-tile element
            radioTile.style.opacity = 0;
                checkbox.checked = false;
                

            }
        });
        UserNotesArray[5] = clickedCheckbox.value;
    } else {
        UserNotesArray[5] = null;    }

    //console.log(UserNotesArray); // Output the updated array for testing
}

function handleCheckboxChange2(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes2.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                var radioTile = checkbox.parentNode.querySelector('.radio-tile'); // Traverse to the .radio-tile element
                radioTile.style.opacity = 0;
                checkbox.checked = false;
            }
        });
        UserNotesArray[4] = clickedCheckbox.value;
    } else {
        UserNotesArray[4] = null;    }

    console.log(UserNotesArray); 
}

function handleCheckboxChange3(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes3.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                var radioTile = checkbox.parentNode.querySelector('.radio-tile'); // Traverse to the .radio-tile element
                radioTile.style.opacity = 0;
                checkbox.checked = false;
            }
        });
        UserNotesArray[3] = clickedCheckbox.value;
    } else {
        UserNotesArray[3] = null;
    }

   // console.log(UserNotesArray); 
}

function handleCheckboxChange4(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes4.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                var radioTile = checkbox.parentNode.querySelector('.radio-tile'); // Traverse to the .radio-tile element
                radioTile.style.opacity = 0;
                checkbox.checked = false;
            }
        });
        UserNotesArray[2] = clickedCheckbox.value;
    } else {
        UserNotesArray[2] = null;
    }
   // console.log(UserNotesArray);
}

function handleCheckboxChange5(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes5.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                var radioTile = checkbox.parentNode.querySelector('.radio-tile'); // Traverse to the .radio-tile element
                radioTile.style.opacity = 0;
                checkbox.checked = false;
            }
        });
        UserNotesArray[1] = clickedCheckbox.value;
    } else {
        UserNotesArray[1] = null;
    }

   // console.log(UserNotesArray); 
}



function handleCheckboxChange6(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes6.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                var radioTile = checkbox.parentNode.querySelector('.radio-tile'); // Traverse to the .radio-tile element
                radioTile.style.opacity = 0;
                checkbox.checked = false;
            }
        });
        UserNotesArray[0] = clickedCheckbox.value;
    } else {
        UserNotesArray[0] = null;
    }

 //   console.log(UserNotesArray); 
}


checkboxes1.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange1);
    
});

checkboxes2.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange2);
});

checkboxes3.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange3);
});

checkboxes4.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange4);
});

checkboxes5.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange5);
});

checkboxes6.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange6);
});



