import Menu from "../components/Menu";
import { Outlet } from 'react-router';

function Layout() {

    return (
        <>
            <aside>
                <Menu />
            </aside>

            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;