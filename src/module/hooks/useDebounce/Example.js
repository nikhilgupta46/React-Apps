import { useEffect } from "react";
import { useDebounce } from "./useDebounce";
import "./Debounce.css";

const Debounce = () => {
  const debounce = useDebounce({
    fn: function () {
      console.log("ran clicked");
    },
    delay: 1000,
    immediate: true,
  });
  useEffect(() => {
    window.addEventListener("mousemove", debounce);
    return () => {
      window.removeEventListener("mousemove", debounce);
    };
  }, [debounce]);
  return <div className="container">Debounce</div>;
};

export default Debounce;
