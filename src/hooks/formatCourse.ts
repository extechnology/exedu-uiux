export const formatCourseTitle = (slug: string) => {
  return slug
    .replace(/_/g, " ") // underscores → spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
