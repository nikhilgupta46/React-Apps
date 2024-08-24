import { useEffect, useState } from "react";
import { initialData } from "./data";

export const useGetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 300);
    })
      .then(() => {
        setData(initialData as any);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  return { data, loading, setData };
};
