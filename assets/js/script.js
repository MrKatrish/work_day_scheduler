document.addEventListener('DOMContentLoaded', function() {
    // Display current day
    const currentDayElement = document.getElementById('currentDay');
    currentDayElement.textContent = dayjs().format('dddd, MMMM D, YYYY');

    // Generate time blocks
    const container = document.querySelector('.container');
    for (let hour = 9; hour <= 17; hour++) {
        const timeBlock = document.createElement('div');
        timeBlock.classList.add('row', 'time-block');
        
        const hourCol = document.createElement('div');
        hourCol.classList.add('col-md-1', 'hour');
        hourCol.textContent = dayjs().hour(hour).format('hA');

        const eventCol = document.createElement('textarea');
        eventCol.classList.add('col-md-10', 'description');
        eventCol.id = `event-${hour}`;
        eventCol.value = localStorage.getItem(`event-${hour}`) || ''; // Load saved event

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('col-md-1', 'saveBtn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i>';
        saveBtn.addEventListener('click', function() {
            localStorage.setItem(`event-${hour}`, eventCol.value); // Save to local storage
        });

        // Color coding
        const currentHour = dayjs().hour();
        if (hour < currentHour) {
            eventCol.classList.add('past');
        } else if (hour === currentHour) {
            eventCol.classList.add('present');
        } else {
            eventCol.classList.add('future');
        }

        timeBlock.appendChild(hourCol);
        timeBlock.appendChild(eventCol);
        timeBlock.appendChild(saveBtn);
        container.appendChild(timeBlock);
    }
});
