import { getSectionImages } from "../api/getSectionImages";
import { useEffect, useState } from "react";
import type { SectionImage } from "../api/types";

export const useSectionImages = () => {
  const [sectionImages, setSectionImages] = useState<SectionImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); 

  useEffect(() => {
    getSectionImages()
      .then((res) => {
        setSectionImages(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { sectionImages, loading, error };
};
