import { ReactNode } from 'react';

export interface Cycle {
    id: string;
    task: string;
    minutes: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export interface CyclesContextData {
    cycles: Cycle[];
    createNewCycle: (cycle: Cycle) => void;
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    secondsPassed: number;
    setSecondsCounter: (seconds: number) => void;
    finishActiveCycle: () => void;
    interruptActiveCycle: () => void;
}

export interface CyclesProviderProps {
    children: ReactNode;
}

export type CycleStatus = 'active' | 'interrupted' | 'completed';
