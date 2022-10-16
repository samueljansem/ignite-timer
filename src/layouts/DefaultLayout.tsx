import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function DefaultLayout() {
    return (
        <div className="max-w-6xl h-[calc(100vh-10rem)] p-10 mx-auto my-20 bg-gray-800 text-gray-100 rounded-lg flex flex-col">
            <Header />
            <Outlet />
        </div>
    );
}
