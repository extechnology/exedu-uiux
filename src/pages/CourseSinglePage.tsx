import CoursePara from "../components/Main/course/CoursePara";
import EnquireForm from "../components/Main/course/EnquireForm";
import KeyPoints from "../components/Main/course/KeyPoints";
import OurSpecialties from "../components/Main/course/OurSpecialties";
import Requirements from "../components/Main/course/Requirements";

const CourseSinglePage = () => {
  return (
    <div>
      <EnquireForm />
      <CoursePara />
      <Requirements />
      <KeyPoints />
      <OurSpecialties />
    </div>
  );
};
export default CourseSinglePage;
