import { createContext, useContext, useState } from 'react';
import { Cycle, CyclesContextData, CyclesProviderProps } from '../@types/Cycle';

const CyclesContext = createContext({} as CyclesContextData);

export function CyclesProvider({ children }: CyclesProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const activeCycle = cycles.find((item) => item.id === activeCycleId);
    const [secondsPassed, setSecondsPassed] = useState(0);

    function createNewCycle(newCycle: Cycle) {
        setCycles((state) => [newCycle, ...state]);
        setActiveCycleId(newCycle.id);
        setSecondsPassed(0);
    }

    function finishActiveCycle() {
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

    function interruptActiveCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId)
                    return {
                        ...cycle,
                        interruptedDate: new Date(),
                    };

                return cycle;
            })
        );

        setActiveCycleId(null);
    }

    function setSecondsCounter(seconds: number) {
        setSecondsPassed(seconds);
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                createNewCycle,
                activeCycle,
                activeCycleId,
                finishActiveCycle,
                interruptActiveCycle,
                secondsPassed,
                setSecondsCounter,
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}

export function useCycles() {
    const context = useContext(CyclesContext);

    return context;
}
