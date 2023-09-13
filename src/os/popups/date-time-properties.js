import query from '../../common/query.js';
import {buildList, combinedTemplate} from '../../common/template-utils.js';
import {capitalize} from '../../common/utils.js';
import {Dropdown} from '../../components/dropdown.js';
import {popup} from '../../components/popup-window.js';
import SpinBox from '../../components/spin-box.js';
import Tab from '../../components/tab.js';

const monthFormatter = new Intl.DateTimeFormat('default', {month: 'long'});

export function openDateTimeProperties() {
    const content = buildContent();
    const interval = setInterval(tick, 1000);
    const config = {
        close() {
            clearInterval(interval);
        },
        className: 'date-time-properties',
        init: tick
    };
    const {dateTimeSecond: second, timeInput} = query(content, {timeInput: '#dateTimeTime input'});

    return popup('Date/Time Properties', content, config);

    function tick() {
        const time = new Date();

        second.style.transform = `rotate(${time.getSeconds() * 6}deg)`;
        timeInput.value = time.toLocaleTimeString();
    }
}

function buildContent() {
    const month = new Dropdown({
        options: [...new Array(12)].map((v, index) => ({value: capitalize(monthFormatter.format(new Date(`2000-${index + 1}-1`)))}))
    });
    month.disabled = true;

    const year = new SpinBox();
    year.disabled = true;
    year.value = new Date().getFullYear();

    return new Tab([{
        content: combinedTemplate`
            <fieldset>
                <legend>Date</legend>
                <div id="dateCalendarWrapper">
                    ${month}
                    ${year}
                    <div id="dateCalendar">
                        <div id="dateDayNames">
                            ${buildList(['S', 'M', 'T', 'W', 'T', 'F', 'S'], day => `<span>${day}</span>`)}
                        </div>
                        <div id="dateDays">${buildDays()}</div>
                    </div>
                </div>
            </fieldset>
            <fieldset id="dateTimeTime">
                <legend>Time</legend>
                <div id="dateTimeClock">
                    <div id="dateTimeHour"></div>
                    <div id="dateTimeMinute"></div>
                    <div id="dateTimeSecond"></div>
                </div>
                <input disabled>
            </fieldset>
            <div id="dateTimeTimeZone">
                Current time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
            </div>`,
        label: 'Date & Time'
    }]);
}

function buildDays() {
    const lastDay = new Date();
    lastDay.setMonth(lastDay.getMonth() + 1, 0);

    const days = [...new Array(lastDay.getDate())].map((d, index) => {
        const span = document.createElement('span');
        span.innerHTML = `${index + 1}`;
        return span;
    });
    days[new Date().getDate() - 1].classList.add('today');

    const firstDay = new Date();
    firstDay.setDate(1);
    if (firstDay.getDay()) {
        const span = document.createElement('span');
        span.style.gridColumn = `1 / ${firstDay.getDay() + 1}`;
        days.unshift(span);
    }

    return days;
}
