import getCourseSinglePage from "../api/getCourseSinglePage";
import { useState,useEffect } from "react";
import type { CourseDetail } from "../api/types";


const useSinglePage = () => {
    const [singlePage, setSinglePage] = useState<CourseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getCourseSinglePage()
          .then((res) => {
            setSinglePage(res);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);  
          })
        }, [])

    return { singlePage, loading, error }
}

export default useSinglePage