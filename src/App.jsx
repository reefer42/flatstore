import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import AppDetails from './pages/AppDetails';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#333333] text-[#f2f2f2] overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/app/:id" element={<AppDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
