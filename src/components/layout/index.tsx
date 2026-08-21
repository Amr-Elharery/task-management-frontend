import { Outlet } from 'react-router';
import Footer from './footer';
import Header from './header';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
