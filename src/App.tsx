
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Steps } from './components/Steps';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Steps />
      <Features />
      <Stats />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;