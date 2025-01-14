
import { Header } from './TravelCore/Components/Header';
import { Hero } from './TravelCore/Components/Hero';
import { Steps } from './TravelCore/Components/Steps';
import { Features } from './TravelCore/Components/Features';
import { Stats } from './TravelCore/Components/Stats';
import { Footer } from './TravelCore/Components/Footer';
import { WhatsAppButton } from './TravelCore/Components/WhatsAppButton';

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