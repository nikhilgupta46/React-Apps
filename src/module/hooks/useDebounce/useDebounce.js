import { useCallback, useRef } from "react";
const useDebounce = ({ fn, delay, immediate }) => {
  let debRef = useRef(null);
  const debounce = useCallback(
    function () {
      const context = this;
      const args = arguments;
      const callNow = immediate && !debRef.current;
      clearTimeout(debRef.current);
      debRef.current = setTimeout(() => {
        debRef.current = null;
        if (immediate) {
          fn.apply(context, args);
        }
      }, delay);
      if (callNow) {
        fn.apply(context, args);
      }
    },
    [delay, fn, immediate]
  );
  return debounce;
};

export { useDebounce };
