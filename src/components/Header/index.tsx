import { Logo } from '../../Logo';
import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <header className="w-full h-12 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
                <NavLink
                    to="/"
                    end
                    title="Timer"
                    className={({ isActive }) =>
                        isActive
                            ? 'p-2 text-green-500 border-b-2 border-transparent hover:border-green-500'
                            : 'p-2 border-b-2 border-transparent hover:border-green-500'
                    }
                >
                    <Timer size={24} />
                </NavLink>
                <NavLink
                    to="/history"
                    title="History"
                    className={({ isActive }) =>
                        isActive
                            ? 'p-2 text-green-500 border-b-2 border-transparent hover:border-green-500'
                            : 'p-2 border-b-2 border-transparent hover:border-green-500'
                    }
                >
                    <Scroll size={24} />
                </NavLink>
            </div>
        </header>
    );
}
