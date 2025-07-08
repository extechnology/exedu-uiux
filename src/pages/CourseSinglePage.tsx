import CoursePara from "../components/Main/course/CoursePara";
import EnquireForm from "../components/Main/course/EnquireForm";
import KeyPoints from "../components/Main/course/KeyPoints";
import OurSpecialties from "../components/Main/course/OurSpecialties";
import Requirements from "../components/Main/course/Requirements";
import { useLocation } from "react-router-dom";

const CourseSinglePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { course?: string };
  const courseName = state?.course || "Not Available";
  
  return (
    <div>
      <EnquireForm course={courseName} />
      <CoursePara course={courseName} />
      <Requirements course={courseName} />
      <KeyPoints course={courseName} />
      <OurSpecialties course={courseName} />
    </div>
  );
};

export default CourseSinglePage;