function remove_alarm(alarm) {
    return function() {
        alarm.parentElement.removeChild(alarm);
    };
}

function add_alarm() {
    var alarm_list = document.querySelector('#alarm-list');
    var alarm_template = document.querySelector('#alarm');
    var alarm = document.importNode(alarm_template.content, true);

    button = alarm.querySelector('#remove-alarm');
    alarm_list.appendChild(alarm);

    var alarm = alarm_list.lastChild;
    button.onclick = remove_alarm(alarm);

}

function update_clock() {
    var clock = document.getElementsByTagName('time')[0];
    var now = new Date();
    var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    clock.innerHTML = time;
}

window.addEventListener('load', function () {
    var add_button = document.querySelector('#add-alarm');
    var alarms = document.querySelectorAll('.alarm-instance');

    add_button.addEventListener('click', add_alarm);
    setInterval(update_clock, 1000);
});
    
