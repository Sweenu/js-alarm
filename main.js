function removeAlarm(alarm) {
    return function() {
        alarm.parentElement.removeChild(alarm);
    };
}

function addAlarm() {
    var alarm_list = document.querySelector('#alarm-list');
    var alarm_template = document.querySelector('#alarm');
    var alarm = document.importNode(alarm_template.content, true);

    // Insert new alarm and get a reference to it instead of just a clone
    // of the template
    alarm_list.appendChild(alarm);
    var alarm = alarm_list.lastChild;

    // Set name
    var name = `Alarm ${alarm_list.children.length}`;
    alarm.querySelector("input[type='text']").setAttribute('value', name);

    // Set event listener to checkbox
    var checkbox = alarm.querySelector('input[type=checkbox]');
    checkbox.onchange = function() {
        if (checkbox.checked) {
          alarm.style.background = 'LightBlue';
        } else {
          alarm.style.background = 'initial';
        }
    };

    // Set event listener to button
    var button = alarm.querySelector('button');
    button.onclick = function() {
        alarm.parentElement.removeChild(alarm);
    };
}

function updateClock() {
    var clock = document.getElementsByTagName('time')[0];
    var now = new Date();
    var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    clock.innerHTML = time;
}

function changeColorCheckedBox() {
    var checked_boxs = document.querySelector('.alarm-instance > input:checked');
    for(let checked_box of checked_boxs) {
        checked_box.style.background = 'blue';
    }
}

window.addEventListener('load', function () {
    var add_button = document.querySelector('#add-alarm');

    add_button.addEventListener('click', addAlarm);
    setInterval(updateClock, 1000);
});
    
