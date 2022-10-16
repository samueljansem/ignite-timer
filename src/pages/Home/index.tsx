import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useCycles } from '../../hooks/useCycles';
import { Cycle } from '../../@types/Cycle';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const { activeCycle, interruptActiveCycle, createNewCycle } = useCycles();

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0,
        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutes: data.minutes,
            startDate: new Date(),
        };

        createNewCycle(newCycle);

        reset();
    }

    function handleInterruptCycle() {
        interruptActiveCycle();
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <main className="w-full h-full flex flex-col justify-center items-center">
            <form
                className="flex flex-col items-center gap-14 text-gray-100"
                onSubmit={handleSubmit(handleCreateNewCycle)}
            >
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <Countdown />

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
