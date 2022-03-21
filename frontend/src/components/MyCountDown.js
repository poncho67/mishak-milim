import React, { useState, useRef, useEffect } from 'react'


const MyCountDown = () => {

    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00');

     // We can use useEffect so that when the component אם start as soon as possible
//    useEffect(() => {
//        clearTimer(getDeadTime());
//    }, []);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {

        setTimer('02:00');

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 120);
        return deadline;
    }

     const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    return (
        <div className="Timer">
            <button onClick={onClickReset}>התחל</button>
            <h2>{timer}</h2>
        </div>
    )
}

export default MyCountDown;