import getCertificate from "../api/getCertificate";
import { useState,useEffect } from "react";
import type { Certificate } from "../api/types";


const useCertificate = () => {
    const [ certificate, setCertificate ] = useState<Certificate | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<Error | null>(null);

    useEffect(() => {
        getCertificate()
          .then((res) => {
            setCertificate(res);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
    }, []);

    return { certificate, loading, error };
}

export default useCertificate
