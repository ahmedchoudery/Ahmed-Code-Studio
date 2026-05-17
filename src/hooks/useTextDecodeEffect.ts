'use client';

import { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?';

export const useTextDecodeEffect = (text: string, active: boolean = true) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      iteration += 1 / 3;

      if (iteration >= maxIterations + 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, active]);

  return displayText;
};
