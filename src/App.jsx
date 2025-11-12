import React, { useEffect, useState } from 'react'
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';

const App = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);


  useEffect(() => {
    let interval;

    if(isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          if(prev <= 1) {
            setIsRunning(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [isRunning, totalSeconds]);


  useEffect(() => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }, [totalSeconds]);



  const handleStart = () => {
    const totalSecs = hours * 3600 + minutes * 60 + seconds;

    if(totalSecs > 0) {
      setTotalSeconds(totalSecs);
      setIsRunning(!isRunning);
    }
  }

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
        {/* Logo - Top Left Corner */}
        <div className="absolute top-6 left-6 z-20">
          <img 
            src="/logo.svg" 
            alt="Countdown Timer Logo" 
            className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(168,85,247,0.7)] hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        {/* Floating Circles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-3000"></div>

        <div className='relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl z-10'>

          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-purple-300" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Countdown Timer</h1>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4 py-8">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
              className="w-20 md:w-24 text-4xl md:text-5xl font-bold text-center bg-white/5 backdrop-blur border-2 border-white/20 rounded-2xl py-4 text-white focus:outline-none focus:border-purple-400 transition-all"
            />
            <span className='text-3xl md:text-5xl text-purple-300 font-light'>:</span>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
              className="w-20 md:w-24 text-4xl md:text-5xl font-bold text-center bg-white/5 backdrop-blur border-2 border-white/20 rounded-2xl py-4 text-white focus:outline-none focus:border-purple-400 transition-all"
            />
            <span className='text-3xl md:text-5xl text-purple-300 font-light'>:</span>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
              className="w-20 md:w-24 text-4xl md:text-5xl font-bold text-center bg-white/5 backdrop-blur border-2 border-white/20 rounded-2xl py-4 text-white focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            <span className="w-20 md:w-28 text-center text-xs md:text-sm text-purple-300 uppercase tracking-wider">Hours</span>
            <span className="w-2"></span>
            <span className="w-20 md:w-28 text-center text-xs md:text-sm text-purple-300 uppercase tracking-wider">Minutes</span>
            <span className="w-2"></span>
            <span className="w-20 md:w-28 text-center text-xs md:text-sm text-purple-300 uppercase tracking-wider">Seconds</span>
          </div>

          <div className="flex gap-4 justify-center mt-10">
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App