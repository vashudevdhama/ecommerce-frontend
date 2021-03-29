import React from 'react';
import './App.css';
import Footer from './components/PageLayouts/Footer';
import MainContent from './components/PageLayouts/MainContent';
import Navbar from './components/PageLayouts/Navbar';

function App() {
  return (
    <div className="App">
     <Navbar />
     <MainContent />
     <Footer />
    </div>
  );
}

export default App;
