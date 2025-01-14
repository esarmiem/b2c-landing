import { Link } from './Link.tsx';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">TravelKit</h3>
          <p className="text-gray-400">
            Contigo hasta que vuelvas
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Productos</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/seguros">Seguros de viaje</Link></li>
            <li><Link href="/asistencia">Asistencia médica</Link></li>
            <li><Link href="/cancelacion">Cancelación de viaje</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Compañía</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/nosotros">Sobre nosotros</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/privacidad">Política de privacidad</Link></li>
            <li><Link href="/terminos">Términos y condiciones</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} TravelKit. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};