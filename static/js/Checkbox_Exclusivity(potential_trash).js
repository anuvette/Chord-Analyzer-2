var checkboxes1 = document.getElementsByName('row1');
var checkboxes2 = document.getElementsByName('row2');
var checkboxes3 = document.getElementsByName('row3');
var checkboxes4 = document.getElementsByName('row4');
var checkboxes5 = document.getElementsByName('row5');
var checkboxes6 = document.getElementsByName('row6');

function handleCheckboxChange1(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes1.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
}

checkboxes1.forEach(function (checkbox1) {
    checkbox1.addEventListener('change', handleCheckboxChange1);
});

function handleCheckboxChange2(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes2.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
} 

checkboxes2.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange2);
});

function handleCheckboxChange3(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes3.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
}

checkboxes3.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange3);
});

function handleCheckboxChange4(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes4.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
}

checkboxes4.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange4);
});

function handleCheckboxChange5(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes5.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
}

checkboxes5.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange5);
});

function handleCheckboxChange6(event) {
    var clickedCheckbox = event.target;

    if (clickedCheckbox.checked) {
        checkboxes6.forEach(function (checkbox) {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
}

checkboxes6.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange6);
});




