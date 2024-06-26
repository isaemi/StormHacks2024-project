'use client'; // This directive makes the component a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../../components/Button';

const TIMER_DURATION = 10; // Set the timer duration in seconds (10 seconds for testing)

const encouragementAudios = [
  '/assets/static_audio/encouragement1.mp3',
  '/assets/static_audio/encouragement2.mp3',
  '/assets/static_audio/encouragement3.mp3'
];

const Page5 = ({ exercise, onComplete }) => {
  const [time, setTime] = useState(TIMER_DURATION); // Set initial time to exercise duration
  const [isActive, setIsActive] = useState(true);
  const [hasPlayedHalfwayAudio, setHasPlayedHalfwayAudio] = useState(false);

  useEffect(() => {
    setTime(TIMER_DURATION); // Reset timer whenever a new exercise is received
    setIsActive(true);
    setHasPlayedHalfwayAudio(false);
  }, [exercise]);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      onComplete(); // Move to next exercise when timer reaches 0
    }

    if (time === Math.floor(TIMER_DURATION / 2) && !hasPlayedHalfwayAudio) {
      const randomAudio = encouragementAudios[Math.floor(Math.random() * encouragementAudios.length)];
      const audio = new Audio(randomAudio);
      audio.play().catch(error => {
        console.error('Error playing encouragement audio:', error);
      });
      setHasPlayedHalfwayAudio(true);
    }

    return () => clearInterval(interval);
  }, [isActive, time, onComplete, hasPlayedHalfwayAudio]);

  const handleStop = () => {
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/assets/images/Background.svg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      {/* Logo */}
      <div className="absolute top-0 left-0 m-4">
        <Image
          src="/assets/images/Logo.svg"
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex p-20">
        <div className="flex flex-col items-start justify-center w-1/3">
          <div>
            <Image
              style={{ border: '2px solid #c0c0c0', borderRadius: '10%' }}
              src={`/assets/images/yoga_images/${exercise.exercise}.png`}
              alt="Yoga Photo"
              width={400}
              height={400}
            />
            <p className="text-center text-3xl font-bold pt-5">{exercise.name} 1 Mins</p>
          </div>
        </div>
        <div className="flex flex-col justify-center pl-2">
          <div className="mb-20 pb-4 bg-pink-100 rounded-xl">
            <span className="countdown text-4xl font-bold text-9xl ml-16">
              {formatTime(time)}
            </span>
          </div>
          <div>
            <Button
              onClick={handleStop}
              className="px-16 py-8 bg-pink-100 text-gray-800 text-3xl font-bold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Stop
            </Button>
            <Button
              onClick={handleResume}
              className="px-16 py-8 ml-12 bg-pink-100 text-gray-800 text-3xl font-bold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Resume
            </Button>
          </div>
        </div>
      </div>
      {/* Main Page Cat */}
      <div className="absolute bottom-0 right-0 mb-8 mr-8">
        <Image
          src="/assets/images/Page5Cat.png"
          alt="Page5 Cat"
          width={400}
          height={400}
        />
      </div>
      {/* Encouragement Message */}
      <div className="absolute bottom-[3vh] left-[7vw] bg-white w-2/3 h-32 rounded-md">
        <p className="text-4xl text-center py-10 font-bold">You can do it! Keep it up!</p>
      </div>
    </div>
  );
};

export default Page5;
