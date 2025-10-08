import {
  getFacultyById,
  getSortedFaculty,
} from "../../models/faculty/faculty.js";

// Route handler for the course faculty list page
const facultyPage = (req, res) => {
  const faculty = getSortedFaculty();

  const sortBy = req.query.sort || "name";
  const sortedSections = getSortedFaculty(sortBy);

  res.render("faculty/list", {
    title: `Faculty List`,
    faculty: sortedSections,
    currentSort: sortBy,
  });
};

const facultyDetailPage = (req, res, next) => {
  const facultyID = req.params.facultyID;
  const faculty = getFacultyById(facultyID);

  // If course doesn't exist, create 404 error
  if (!faculty) {
    const err = new Error(`Faculty ${facultyID} not found`);
    err.status = 404;
    return next(err);
  }

  // Handle sorting if requested
  res.render("faculty/detail", {
    title: "Faculty",
    faculty: faculty,
  });
};

export { facultyPage, facultyDetailPage };
