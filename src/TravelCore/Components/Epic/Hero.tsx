import hero from '../../../../Assets/hero.webp';

export const Hero = () => {
  return (
    <section className="relative min-h-[290px] h-[60vh] w-full bg-cover bg-center" 
    style={{ backgroundImage: `url(${hero})` }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 relative h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">¡Elige tu seguro!</h1>
        <p className="text-base sm:text-lg md:text-xl">Bienvenido, selecciona según tu perfil.</p>
      </div>
    </section>
  );
};

export default Hero;