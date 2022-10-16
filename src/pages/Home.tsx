import { useEffect, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string;
    task: string;
    minutes: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [secondsCounter, setSecondsCounter] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0,
        },
    });

    const activeCycle = cycles.find((item) => item.id === activeCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - secondsCounter : 0;

    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const diff = differenceInSeconds(new Date(), activeCycle.start);

                if (diff >= totalSeconds) {
                    clearInterval(interval);

                    setCycles((state) =>
                        state.map((cycle) => {
                            if (cycle.id === activeCycleId)
                                return {
                                    ...cycle,
                                    finishedDate: new Date(),
                                };

                            return cycle;
                        })
                    );

                    setActiveCycleId(null);
                }

                setSecondsCounter(diff);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCycleId]);

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutes: data.minutes,
            start: new Date(),
        };

        setCycles((state) => [newCycle, ...state]);
        setActiveCycleId(newCycle.id);
        setSecondsCounter(0);

        reset();
    }

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId)
                    return { ...cycle, interruptedDate: new Date() };

                return cycle;
            })
        );

        setActiveCycleId(null);
    }

    useEffect(() => {
        if (activeCycle) document.title = `${minutes}:${seconds}`;
    }, [minutes, seconds, activeCycle]);

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <main className="w-full h-full flex flex-col justify-center items-center">
            <form
                className="flex flex-col items-center gap-14 text-gray-100"
                onSubmit={handleSubmit(handleCreateNewCycle)}
            >
                <div className="flex w-full flex-wrap gap-2 font-bold items-center justify-center">
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input
                        id="task"
                        type="text"
                        placeholder="Dê um nome para seu projeto"
                        list="task-suggestions"
                        disabled={!!activeCycle}
                        className="bg-transparent border-b-2 border-gray-500 outline-none flex-1 focus:border-green-500 disabled:cursor-not-allowed"
                        {...register('task')}
                    />
                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="minutes">durante</label>
                    <input
                        id="minutes"
                        type="number"
                        step={5}
                        min={5}
                        max={60}
                        placeholder="00"
                        disabled={!!activeCycle}
                        className="bg-transparent border-b-2 w-16 border-gray-500 outline-none focus:border-green-500 disabled:cursor-not-allowed"
                        {...register('minutes', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </div>

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

                {activeCycle ? (
                    <button
                        type="button"
                        onClick={handleInterruptCycle}
                        className="w-full flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-red-500 cursor-pointer [&:not(:disabled)]:hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <HandPalm size={24} />
                        Interromper
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        className="w-full flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-green-500 cursor-pointer [&:not(:disabled)]:hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Play size={24} />
                        Começar
                    </button>
                )}
            </form>
        </main>
    );
}
