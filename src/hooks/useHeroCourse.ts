import getHeroCourse from "../api/getHeroCourse";
import { useState,useEffect } from "react";
import type {  HeroCourse } from "../api/types";

const useHeroCourse = () => {
    const [heroCourse, setHeroCourse] = useState<HeroCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getHeroCourse()
          .then((res) => {
            setHeroCourse(res);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
    }, []);

    return { heroCourse, loading, error }
}

export default useHeroCourse