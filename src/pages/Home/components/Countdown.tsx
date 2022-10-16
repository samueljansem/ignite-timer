import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { useCycles } from '../../../hooks/useCycles';

export function Countdown() {
    const { activeCycle, activeCycleId, finishActiveCycle, setSecondsCounter } =
        useCycles();
    const { secondsPassed } = useCycles();

    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0;

    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const diff = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                );

                if (diff >= totalSeconds) {
                    clearInterval(interval);

                    finishActiveCycle();
                }

                setSecondsCounter(diff);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCycleId]);

    useEffect(() => {
        if (activeCycle)
            document.title = `${formattedMinutes}:${formattedSeconds}`;
    }, [minutes, seconds, activeCycle]);

    return (
        <section className="text-[160px] font-mono flex gap-4 items-center leading-[8rem]">
            <span className="bg-gray-700 px-4 py-8 rounded-lg">
                {formattedMinutes[0]}
            </span>
            <span className="bg-gray-700 px-4 py-8 rounded-lg">
                {formattedMinutes[1]}
            </span>
            <span className="text-green-500">:</span>
            <span className="bg-gray-700 px-4 py-8 rounded-lg">
                {formattedSeconds[0]}
            </span>
            <span className="bg-gray-700 px-4 py-8 rounded-lg">
                {formattedSeconds[1]}
            </span>
        </section>
    );
}
