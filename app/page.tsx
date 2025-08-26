import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Programs from '@/components/sections/Programs';
import Impact from '@/components/sections/Impact';
import News from '@/components/sections/News';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        <Hero />
        <Mission />
        <Programs />
        <News />
      </main>
      <Footer />
    </>
  );
}