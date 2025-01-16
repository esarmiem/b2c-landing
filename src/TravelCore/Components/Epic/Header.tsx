import { Link } from '../Raw/Link.tsx';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="text-primary font-bold text-2xl">
        <Link href="/">TravelKit</Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link href="/seguros">Seguros</Link>
        <Link href="/productos-financieros">Productos financieros</Link>
        <Link href="/blog">Blog</Link>
        <span className="text-gray-600">57 6012542586</span>
      </nav>
    </header>
  );
};