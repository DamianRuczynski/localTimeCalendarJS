const myCalendar = document.querySelector("#calendar")
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const actualDate = new Date();

function changeTimeZone(date, timeZone) {
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

const switchedDate = changeTimeZone(new Date(), 'America/New_York');
console.log(switchedDate); // 👉️ "Sun Jan 16 2022 01:22:07"

const nyMonth = switchedDate.getDay();
console.log(nyMonth);
console.log('---------');


console.log(actualDate);
console.log('---------');



const addDay = (day) => {
    const newDay = document.createElement('div');
    newDay.className = 'day';
    const dayNumber = day.getDate();
    newDay.textContent = dayNumber;
    myCalendar.append(newDay);


    if (dayNumber == 26) {
        newDay.className = 'paddingDay';
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



function getDaysInMonth(date) {


    const functionInDay = date.getDate();
    const functionInMonth = date.getMonth();
    const functionInYear = date.getFullYear();

    const previuiosMonth = new Date(functionInYear, functionInMonth, 0);
    const nextMonth = new Date(functionInYear, functionInMonth + 1, 1);

    let lastDayofPreviousMonth = previuiosMonth.getDate();
    let firsDayOfNextMonth = nextMonth.getDate();

    const days = [];
    while (date.getMonth() === functionInMonth) {
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
                addDay(day)
            }
        }
        countingPadiingDays += 1
    }

    fillRestOfTheMonth(firsDayOfNextMonth, lastDayIndex);

}

const fn = getDaysInMonth(actualDate)