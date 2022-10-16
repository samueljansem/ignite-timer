import { Router } from './Router';
import { CyclesProvider } from './hooks/useCycles';
import './styles/global.css';

export function App() {
    return (
        <CyclesProvider>
            <Router />
        </CyclesProvider>
    );
}
