import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

import ShowDateInfoModal from "./ShowDateInfoModal";

const weekNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function App() {
    const [days, setDays] = useState([])
    const [dayInfo, setDayInfo] = useState({});
    const [monthName, setMonthName] = useState('');
    const [show, setShow] = useState(false);

    const handleShow = item => {
        setShow(true);
        // console.log(item)
        setDayInfo({
            month: new Date(item.year, (+item.month) - 1, item.day).toLocaleString('default', {month: 'long'}),
            day: item.day,
            color: item.color
        })
    }
    const handleClose = () => setShow(false);

    const daysInMonth = data => {
        let _days = []
        const dates = data.date.split('.')
        const month = dates[0]
        const year = dates[1]
        setMonthName(new Date(year, (+month) - 1).toLocaleString('default', {month: 'long'}))
        const _date = new Date(year, month, 0).getDate();
        for (let day = 1; day <= _date; day++) {
            const _dateByDay = new Date(year, (+month) - 1, day).getDay();

            let color = getColorName('', day, data.green, 'green')
            color = getColorName(color, day, data.yellow, 'yellow')
            color = getColorName(color, day, data.grey, 'grey')

            _days.push(
                {
                    day: day,
                    color: color,
                    dayOfWeek: _dateByDay,
                    isHoliday: _dateByDay === 6 || _dateByDay === 0,
                    year: year,
                    month: month
                })
        }
        const previousDays = []
        const startWeekDay = new Date(year, (+month) - 1, 1).getDay(); //current month start week day
        for (let day = 1; day < (startWeekDay === 0 ? 7 : startWeekDay); day++) {
            previousDays.push({day: ''})
        }
        setDays([...previousDays, ..._days])

        console.log(_days)
    }

    const getColorName = (currentDayColor, day, colorDays, type) => {
        if (currentDayColor) return currentDayColor
        if (colorDays && colorDays.find(_item => day === +_item)) {
            return type
        }
        return ''
    }

    useEffect(() => {
        axios.get('/data.json')
            .then(res => {
                daysInMonth(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <div className="content">
            <h2>{monthName}</h2>
            <div className="calendar">
                <div className="week-names">
                    {weekNames.map((item, index) => (
                        <div key={index} className="week-names-item">{item}</div>
                    ))}
                </div>

                {(days || []).map((item, index) =>
                    item.day ? (
                        <div key={index}
                             className={`${item.color} ${item.isHoliday ? 'calendar-item holiday' : 'calendar-item'}`}
                             onClick={() => handleShow(item)}
                        >
                            <p>{item.day}</p>
                        </div>
                    ) : (<div key={index} className="calendar-item none"/>)
                )}
            </div>
            <ShowDateInfoModal show={show} handleShow={handleShow} handleClose={handleClose} dayInfo={dayInfo}/>
        </div>
    );
}

export default App;
