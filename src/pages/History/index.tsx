import { Cycle, CycleStatus } from '../../@types/Cycle';
import { useCycles } from '../../hooks/useCycles';
import { StatusIndicator } from './components/StatusIndicator';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function History() {
    const { cycles } = useCycles();

    function getCycleStatus(cycle: Cycle): CycleStatus {
        if (cycle.finishedDate) return 'completed';
        if (cycle.interruptedDate) return 'interrupted';

        return 'active';
    }

    function getCycleStatusDescription(cycle: Cycle) {
        if (cycle.finishedDate) return 'Completo';
        if (cycle.interruptedDate) return 'Interrompido';

        return 'Ativo';
    }

    return (
        <main className="w-full h-full p-12 flex flex-col">
            <h1 className="text-2xl">Meu histórico</h1>
            <div className="flex-1 overflow-auto mt-4">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        <tr>
                            <th className="bg-gray-600 p-4 text-left text-gray-100 text-sm rounded-tl-lg">
                                Tarefa
                            </th>
                            <th className="bg-gray-600 p-4 text-left text-gray-100 text-sm">
                                Duração
                            </th>
                            <th className="bg-gray-600 p-4 text-left text-gray-100 text-sm">
                                Início
                            </th>
                            <th className="bg-gray-600 p-4 text-left text-gray-100 text-sm rounded-tr-lg">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => (
                            <tr key={cycle.id}>
                                <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                    {cycle.task}
                                </td>
                                <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                    {cycle.minutes} minutos
                                </td>
                                <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                    {formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}
                                </td>
                                <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm ">
                                    {cycle.finishedDate && (
                                        <span className="flex gap-2 items-center">
                                            <StatusIndicator status="completed" />
                                            Completo
                                        </span>
                                    )}
                                    {cycle.interruptedDate && (
                                        <span className="flex gap-2 items-center">
                                            <StatusIndicator status="interrupted" />
                                            Interrompido
                                        </span>
                                    )}
                                    {!cycle.finishedDate &&
                                        !cycle.interruptedDate && (
                                            <span className="flex gap-2 items-center">
                                                <StatusIndicator status="active" />
                                                Em andamento
                                            </span>
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
