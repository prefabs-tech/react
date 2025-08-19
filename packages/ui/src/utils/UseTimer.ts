import { useEffect, useState } from "react";

export const useTimer = (duration: number) => {
  const [timer, setTimer] = useState<number>(duration);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60).toString();
    const seconds = (timer % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return [timer, setTimer, formatTimer] as const;
};
