import { courses } from "../src/models/catalog/catalog.js";

const demo = (req, res) => {
  res.setHeader("X-Demo-Page", "true");
  res.setHeader("X-Middleware-Demo", "This is a demo header");

  const title = "Demo Page";
  const { color, food } = req.params;
  res.render("demo", { title, color, food });
};

const catalog = (req, res) => {
  const title = "Course Catalog";
  res.render("catalog", { title, courses });
};

const course = (req, res, next) => {
  const courseId = req.params.courseId;
  const course = courses[courseId];

  if (!course) {
    const err = new Error(`Course ${courseId} not found`);
    err.status = 404;
    return next(err);
  }

  const sortBy = req.query.sort || "time";
  let sortedSections = [...course.sections];

  switch (sortBy) {
    case "professor":
      sortedSections.sort((a, b) => a.professor.localeCompare(b.professor));
      break;

    case "room":
      sortedSections.sort((a, b) => a.room.localeCompare(b.room));
      break;

    case "time":
    default:
      break;
  }

  console.log(`Viewing course: ${courseId}, sorted by: ${sortBy}`);

  res.render("course", {
    title: `${course.id} - ${course.title}`,
    course: { ...course, sections: sortedSections },
    currentSort: sortBy,
  });
};

export default { demo, course, catalog };
