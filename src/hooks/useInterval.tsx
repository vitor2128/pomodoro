import { useEffect, useRef } from "react";

export const useInterval = <C extends CallableFunction> (callback: C, delay: number | null) => {
  const savedCallback = useRef<C>();
  
  useEffect(() => {
    savedCallback.current = callback
  },[callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current)
        savedCallback.current()
    }
    if (delay !== null)  {
      const id = setInterval(tick, delay)
      return ()  => clearInterval(id)
    }
  }, [delay])
}