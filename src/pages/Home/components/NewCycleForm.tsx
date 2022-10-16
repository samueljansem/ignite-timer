import { useCycles } from '../../../hooks/useCycles';
import { useFormContext } from 'react-hook-form';

export function NewCycleForm() {
    const { activeCycle, cycles } = useCycles();
    const { register } = useFormContext();

    return (
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
            {cycles.length > 0 ?? (
                <datalist id="task-suggestions">
                    {cycles.map((cycle) => (
                        <option value={cycle.task} />
                    ))}
                </datalist>
            )}

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
    );
}
