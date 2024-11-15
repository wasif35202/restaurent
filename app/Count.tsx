'use client'
import React, { useState, useEffect } from "react";

const Count: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const targetDate = new Date('2024-12-30T00:00:00'); // Set your target date

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer); // Clear timer when countdown is finished
        return; // Exit the function
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000); // Initialize the timer

    // Initial calculation
    const initialCalculation = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return; // Exit the function
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    // Perform the initial calculation
    initialCalculation();

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []); // Empty dependency array ensures this runs only once

  if (!timeLeft) {
    return null; // Or a loading state if you prefer
  }

  return (
    <span className="">
      {timeLeft.days} D:{String(timeLeft.hours).padStart(2, '0')} H:
      {String(timeLeft.minutes).padStart(2, '0')} M:
      {String(timeLeft.seconds).padStart(2, '0')} S
    </span>
  );
};

export default Count;
