const header = document.querySelector('.displayDate')
const slider = document.querySelector(".switch input");
const calendarSection = document.querySelector('.calendarSection')
const myCalendar = document.querySelector("#calendar");
const dateDisplay = document.querySelector(".currentDate");
const monthDisplay = document.querySelector('.showMonth')
const ulList = document.querySelector('.time ul')

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const changeTimeZone = (date, timeZone) => {
    if (typeof date === 'string') {
        return new Date(
            new Date(date).toLocaleString('en-US', {
                timeZone,
            }),
        );
    }

    return new Date(
        date.toLocaleString('en-US', {
            timeZone,
        }),
    );
}

const actualDate = new Date();

//'December 17, 1995 03:44:00'
const switchedDate = changeTimeZone(new Date(), 'America/New_York');


const addDay = (day, actualDay) => {
    const newDay = document.createElement('div');
    newDay.className = 'day';
    const dayNumber = day.getDate();
    newDay.textContent = dayNumber;
    myCalendar.append(newDay);


    if (dayNumber == actualDay) {
        newDay.className = 'actual';
    }
}

const fillRestOfTheMonth = (firsDayOfNextMonth, lastDayIndex) => {
    for (let index of weekdays) {
        if (lastDayIndex < weekdays.indexOf(index)) {
            const nextDay = document.createElement('div');
            nextDay.className = 'paddingDay';
            nextDay.textContent = firsDayOfNextMonth;
            myCalendar.append(nextDay);
            firsDayOfNextMonth += 1;
        }
    }
}

const generateHours = (currentDate) => {
    ulList.textContent = '';
    const time = currentDate.toLocaleTimeString('en-US').split(':')
    const hour = time[0];
    const minutes = time[1];
    const timeAdv = time[2].split(' ')[1];
    for (let i = 1; i <= 12; i++) {
        for (let min = 0; min <= 30; min += 30) {
            min === 0 ? min = '00' : min = '30';
            const hourLi = document.createElement('li');
            hourLi.textContent = `${i}:${min} ${timeAdv}`;
            if (i == hour) {
                const customLi = document.createElement('li');
                customLi.textContent = `${i}:00 ${timeAdv}`;
                ulList.appendChild(customLi);
                const customLi2 = document.createElement('li');
                customLi2.textContent = `${i}:30 ${timeAdv}`;
                ulList.appendChild(customLi2);
                if (+minutes < 30) {
                    customLi.className = 'actual';
                    customLi.id = 'actualId';
                } else {
                    customLi2.className = 'actual';
                    customLi2.id = 'actualId';
                }
                break;
            }
            ulList.append(hourLi);
        }

    }
    location.href = "#actualId";
}

const showDayInHeader = (currentDate) => {
    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()]
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString('en-US').split(':')
    const hour = time[0];
    const minutes = time[1];
    const timeAdv = time[2].split(' ')[1];
    const timeDisplay = hour + ':' + minutes + ' ' + timeAdv
    dateDisplay.textContent = `${month.slice(0, 3)} ${day} ${year}, ${timeDisplay}`
}




const getDaysInMonth = (passedDate) => {
    myCalendar.textContent = '';
    showDayInHeader(passedDate)

    const actualDay = passedDate.getDate();
    const month = passedDate.getMonth();
    const year = passedDate.getFullYear();
    const date = new Date(year, month, 1);
    const previuiosMonth = new Date(year, month, 0);
    const nextMonth = new Date(year, month + 1, 1);

    monthDisplay.textContent = `${monthNames[month]}   ${actualDay}`

    let lastDayofPreviousMonth = previuiosMonth.getDate();
    let firsDayOfNextMonth = nextMonth.getDate();

    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    let firstDayIndex = days[0].getDay()
    let lastDayIndex = days[days.length - 1].getDay()
    let countingPadiingDays = 0;

    for (let index of weekdays) {
        if (weekdays.indexOf(index) == firstDayIndex) {
            lastDayofPreviousMonth -= countingPadiingDays - 1
            for (let i = 0; i < countingPadiingDays; i++) {
                const paddingDay = document.createElement('div');
                paddingDay.className = 'paddingDay';
                paddingDay.textContent = lastDayofPreviousMonth;
                myCalendar.append(paddingDay);
                lastDayofPreviousMonth += 1
            }
            for (let day of days) {
                addDay(day, actualDay)
            }
        }
        countingPadiingDays += 1
    }

    fillRestOfTheMonth(firsDayOfNextMonth, lastDayIndex);

}


const switchTimezone = () => {
    if (slider.checked == 1) {
        generateHours(switchedDate);
        showDayInHeader(switchedDate);
        getDaysInMonth(switchedDate);
    } else {
        generateHours(actualDate);
        showDayInHeader(actualDate);
        getDaysInMonth(actualDate);
    }
}



window.onload = getDaysInMonth(actualDate), generateHours(actualDate);
header.addEventListener('click', () => calendarSection.style.display = 'flex');
calendarSection.addEventListener('click', () => calendarSection.style.display = 'none');
