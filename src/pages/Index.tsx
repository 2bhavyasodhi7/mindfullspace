
import React from 'react';
import HeroSection from '@/components/HeroSection';
import WhatIsMindfulness from '@/components/WhatIsMindfulness';
import GuruSection from '@/components/GuruSection';
import FAQSection from '@/components/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatIsMindfulness />
      <GuruSection />
      <FAQSection />
    </div>
  );
};

export default Index;
