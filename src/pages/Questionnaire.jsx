import React, { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { saveMockResponse } from '../mock/mockData';

const questions = [
  "does this look good? 🌷",
  "this aint a proposal btw 😑",
  "can you answer me smt honestly?",
  "can i marry you ??? i dont need any other girls even if you reject me bcs im obsessed wt you!!! plsss sayyy yes 🙏😭, i will buy you cloaths, i will take care of you 😭🙏😏🌷🩷"
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [reason, setReason] = useState('');
  const [canProceed, setCanProceed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');
  const [hearts, setHearts] = useState([]);

  // Timer for 5-second delay (only for "No" answers on first 3 questions)
  useEffect(() => {
    if (selectedAnswer === 'no' && currentQuestion < 3) {
      setCanProceed(false);
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanProceed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else if (selectedAnswer) {
      // For "Yes" answers or last question, can proceed immediately
      setCanProceed(true);
      setCountdown(0);
    }
  }, [selectedAnswer, currentQuestion]);

  // Floating hearts animation
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2
      };
      setHearts(prev => [...prev.slice(-5), newHeart]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === 'yes') {
      setReason('');
    }
  };

  const handleNext = () => {
    const answerData = {
      question: questions[currentQuestion],
      answer: selectedAnswer,
      reason: selectedAnswer === 'no' ? reason : null
    };
    
    const newAnswers = [...answers, answerData];
    setAnswers(newAnswers);

    if (currentQuestion === 3) {
      // Last question
      if (selectedAnswer === 'yes') {
        saveMockResponse({ answers: newAnswers });
        setIsComplete(true);
        setShowFinalInput(false);
      } else {
        setShowFinalInput(true);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setReason('');
      setCanProceed(false);
    }
  };

  const handleFinalSubmit = () => {
    const finalData = {
      answers: [...answers, {
        question: questions[currentQuestion],
        answer: selectedAnswer,
        reason: selectedAnswer === 'no' ? reason : null,
        finalMessage: finalMessage
      }]
    };
    saveMockResponse(finalData);
    setIsComplete(true);
  };

  if (isComplete && !showFinalInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1591297694115-e765ee015df6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwzfHxyb21hbnRpYyUyMHJlZCUyMHR1bGlwc3xlbnwwfHx8cmVkfDE3NjE1NzkzNDR8MA&ixlib=rb-4.1.0&q=85" alt="" className="w-full h-full object-cover" />
        </div>
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-4xl animate-float"
            style={{
              left: `${heart.left}%`,
              bottom: '-50px',
              animation: `float ${heart.duration}s ease-in infinite`
            }}
          >
            💕
          </div>
        ))}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center relative z-10 border-4 border-rose-300">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className="w-24 h-24 text-red-600 fill-red-600 animate-pulse" />
              <Heart className="w-24 h-24 text-red-600 fill-red-600 animate-pulse absolute top-0 left-0 opacity-50" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-red-600 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
            come to dm fasttt 💕
          </h1>
          <p className="text-xl text-gray-700 mb-6">She said YES! 🌷✨</p>
          <div className="flex justify-center gap-4">
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🌷</span>
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌷</span>
          </div>
        </div>
      </div>
    );
  }

  if (showFinalInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1718614950998-31a641dadd45?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxyb21hbnRpYyUyMHJlZCUyMHR1bGlwc3xlbnwwfHx8cmVkfDE3NjE1NzkzNDR8MA&ixlib=rb-4.1.0&q=85" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-2xl w-full relative z-10 border-4 border-rose-300">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-red-600 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              do you have smt to say? 🌷
            </h2>
          </div>
          <Textarea
            value={finalMessage}
            onChange={(e) => setFinalMessage(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[200px] text-lg border-2 border-rose-300 focus:border-red-500 rounded-xl mb-6"
          />
          <Button
            onClick={handleFinalSubmit}
            className="w-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white text-xl py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            Submit 💕
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-red-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background tulip image */}
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1650227591646-10b25cb033a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHJlZCUyMHR1bGlwc3xlbnwwfHx8cmVkfDE3NjE1NzkzNDR8MA&ixlib=rb-4.1.0&q=85" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-4xl animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `float ${heart.duration}s ease-in infinite`
          }}
        >
          🌷
        </div>
      ))}

      {/* Question card */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-2xl w-full relative z-10 border-4 border-rose-300">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Question {currentQuestion + 1} of 4</span>
            <span className="text-sm font-semibold text-red-600">{Math.round(((currentQuestion + 1) / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-rose-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-red-600 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-red-600 fill-red-600 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 leading-relaxed" style={{ fontFamily: '"Playfair Display", serif' }}>
            {questions[currentQuestion]}
          </h2>
        </div>

        {/* Answer buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleAnswerSelect('yes')}
            className={`flex-1 py-6 px-8 rounded-2xl text-xl font-bold transition-all duration-300 ${
              selectedAnswer === 'yes'
                ? 'bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-rose-50 text-red-600 hover:bg-rose-100 border-2 border-rose-200'
            }`}
          >
            Yes 💕
          </button>
          <button
            onClick={() => handleAnswerSelect('no')}
            className={`flex-1 py-6 px-8 rounded-2xl text-xl font-bold transition-all duration-300 ${
              selectedAnswer === 'no'
                ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            No 💔
          </button>
        </div>

        {/* Reason input (only if 'no' is selected) */}
        {selectedAnswer === 'no' && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              What's the reason? 🌷
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please share your thoughts..."
              className="min-h-[120px] text-lg border-2 border-rose-300 focus:border-red-500 rounded-xl"
            />
          </div>
        )}

        {/* Next button with countdown */}
        {selectedAnswer && (
          <div className="space-y-4">
            {selectedAnswer === 'no' && currentQuestion < 3 && !canProceed && (
              <div className="text-center text-gray-600 font-medium animate-pulse">
                Please wait {countdown} second{countdown !== 1 ? 's' : ''}... ⏳
              </div>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed || (selectedAnswer === 'no' && !reason.trim())}
              className="w-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white text-xl py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              {selectedAnswer === 'no' && !canProceed && currentQuestion < 3 ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Waiting...
                </>
              ) : currentQuestion === 3 ? (
                'Submit 💕'
              ) : (
                'Next 🌷'
              )}
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Questionnaire;