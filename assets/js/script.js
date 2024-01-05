$(document).ready(function() {
    // Display current day using Day.js
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));

    // Generate time blocks
    for (let hour = 9; hour <= 23; hour++) {
        const timeBlock = $('<div>').addClass('row time-block');
        const hourCol = $('<div>').addClass('col-md-1 hour').text(dayjs().hour(hour).format('hA'));
        const eventCol = $('<textarea>').addClass('col-md-10 description').attr('id', `event-${hour}`);
        eventCol.val(localStorage.getItem(`event-${hour}`) || ''); // Load saved event

        const saveBtn = $('<button>').addClass('col-md-1 saveBtn');
        saveBtn.html('<i class="fas fa-save"></i>');
        saveBtn.click(function() {
            localStorage.setItem(`event-${hour}`, eventCol.val()); // Save to local storage
        });

        // Color coding
        const currentHour = dayjs().hour();
        if (hour < currentHour) {
            eventCol.addClass('past');
        } else if (hour === currentHour) {
            eventCol.addClass('present');
        } else {
            eventCol.addClass('future');
        }

        timeBlock.append(hourCol, eventCol, saveBtn);
        $('.container').append(timeBlock);
    }
});
