import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import SpinnerPage from './components/SpinnerPage';
import RulesPage from './components/RulesPage';

function App() {
  const [activeTab, setActiveTab] = useState<'spinner' | 'rules'>('spinner');

  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Video_of_Oil_Tanker_Ready.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Main Content with Glass Effect */}
      <div className="relative z-10 min-h-screen">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="relative">
          {activeTab === 'spinner' ? <SpinnerPage /> : <RulesPage />}
        </main>
      </div>
      
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/30 pointer-events-none"></div>
    </div>
  );
}

export default App;