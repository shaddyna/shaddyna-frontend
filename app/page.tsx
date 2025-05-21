// pages/index.tsx
import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
     
      <main>

        <Navbar />
        <LuxuryFooter />
      
      </main>
    
    </div>
  );
}

