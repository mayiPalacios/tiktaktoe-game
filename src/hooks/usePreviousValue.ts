import { useRef, useEffect } from "react";

const usePreviousValue = <T>(data: T) => {
  const ref = useRef<T[]>([]);

  useEffect(() => {
    if (typeof data === "number") {
      if (data !== -1) {
        ref.current.unshift(data);
      }
    } else if (Array.isArray(data)) {
      ref.current.push(data);
    }
  }, [data]);
  return ref.current;
};

export default usePreviousValue;
