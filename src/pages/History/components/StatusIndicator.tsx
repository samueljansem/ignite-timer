import { CycleStatus } from '../../../@types/Cycle';

interface StatusIndicatorProps {
    status: CycleStatus;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
    function getBgColor(status: CycleStatus) {
        if (status === 'active') return 'bg-yellow-500';
        if (status === 'completed') return 'bg-green-500';
        if (status === 'interrupted') return 'bg-red-500';
    }

    return <i className={`w-2 h-2 rounded-full ${getBgColor(status)}`} />;
}
