var confirm_text = "yes i am";
var prompt_text = `Are you woken up yet?
(enter "${confirm_text}" to confirm you are)`;

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
        alarm.remove();
    };
}

function updateClock() {
    var clock = document.getElementsByTagName('time')[0];
    var now = new Date();

    var hours = String(now.getHours()).padStart(2, 0);
    var minutes = String(now.getMinutes()).padStart(2, 0);
    var seconds = String(now.getSeconds()).padStart(2, 0);

    var time = `${hours}:${minutes}:${seconds}`;
    clock.innerHTML = time;
}

function changeColorCheckedBox() {
    var checked_boxs = document.querySelector('.alarm-instance > input:checked');
    for(let checked_box of checked_boxs) {
        checked_box.style.background = 'blue';
    }
}

function checkAlarms() {
    var alarm_list = document.querySelector('#alarm-list');
    for(let alarm of alarm_list.children) {
        var checkbox = alarm.querySelector('input[type=checkbox]');
        if (checkbox.checked) {
            let current_time = new Date();
            let target_time = alarm.querySelector('input[type=time]').valueAsDate;
            if (target_time.getUTCHours() === current_time.getHours() &&
                target_time.getUTCMinutes() === current_time.getMinutes() &&
                current_time.getSeconds() === 0) {
                let music = new Audio('music/' + alarm.querySelector('select').value + '.mp3');
                music.play();
                
                while (prompt(prompt_text) !== confirm_text) {
                    continue;
                }
                music.pause();
            }
        }
    }
}

window.addEventListener('load', function () {
    var add_button = document.querySelector('#add-alarm');

    add_button.addEventListener('click', addAlarm);
    setInterval(updateClock, 1000);
    setInterval(checkAlarms, 1000);
});
