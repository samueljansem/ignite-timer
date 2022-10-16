import { Play } from 'phosphor-react';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0,
        },
    });

    function handleCreateNewCycle(data: NewCycleFormData) {}

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
                        className="bg-transparent border-b-2 border-gray-500 outline-none flex-1 focus:border-green-500"
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
                        className="bg-transparent border-b-2 w-16 border-gray-500 outline-none focus:border-green-500"
                        {...register('minutes', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </div>

                <section className="text-[160px] font-mono flex gap-4 items-center leading-[8rem]">
                    <span className="bg-gray-700 px-4 py-8 rounded-lg">0</span>
                    <span className="bg-gray-700 px-4 py-8 rounded-lg">0</span>
                    <span className="text-green-500">:</span>
                    <span className="bg-gray-700 px-4 py-8 rounded-lg">0</span>
                    <span className="bg-gray-700 px-4 py-8 rounded-lg">0</span>
                </section>

                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-full flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-green-500 cursor-pointer [&:not(:disabled)]:hover:bg-green-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <Play size={24} />
                    Começar
                </button>
            </form>
        </main>
    );
}
