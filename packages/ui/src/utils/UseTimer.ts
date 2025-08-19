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

  return [timer, setTimer] as const;
};
