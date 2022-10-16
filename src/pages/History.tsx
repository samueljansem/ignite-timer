export function History() {
    return (
        <main className="w-full h-full p-12 flex flex-col">
            <h1 className="text-2xl">Meu histórico</h1>
            <div className="flex-1 overflow-auto">
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
                        <tr>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                Tarefa
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                20 minutos
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                Ha 2 meses
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm ">
                                <span className="flex gap-2 items-center">
                                    <i className="w-2 h-2 rounded-full bg-green-300" />
                                    Concluido
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                Tarefa
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                20 minutos
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                Ha 2 meses
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm ">
                                <span className="flex gap-2 items-center">
                                    <i className="w-2 h-2 rounded-full bg-red-500" />
                                    Interrompido
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                Tarefa
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                20 minutos
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm">
                                Ha 2 meses
                            </td>
                            <td className="bg-gray-700 border-t-4 border-gray-800 p-4 text-sm ">
                                <span className="flex gap-2 items-center">
                                    <i className="w-2 h-2 rounded-full bg-yellow-500" />
                                    Em andamento
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}
