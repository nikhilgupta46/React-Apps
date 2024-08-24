import { useCallback, useRef } from "react";
const useDebounce = ({
  fn,
  delay,
  immediate,
}: {
  fn: any;
  delay: any;
  immediate: any;
}) => {
  let debRef: any = useRef(null);
  const debounce = useCallback(
    function () {
      // @ts-ignore
      const context: any = this;
      const args = arguments;
      const callNow = immediate && !debRef.current;
      clearTimeout(debRef.current as any);
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
