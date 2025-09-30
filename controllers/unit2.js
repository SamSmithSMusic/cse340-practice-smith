const demo = (req, res) => {
    const title = 'Demo Page' ;
    const { color, food } = req.params;
    res.render('demo',{title, color, food});
};

//Databaase Sim
const courses = {

    'CS121': {

        id: 'CS121',

        title: 'Introduction to Programming',

        description: 'Learn programming fundamentals using JavaScript and basic web development concepts.',

        credits: 3,

        sections: [

            { time: '9:00 AM', room: 'STC 392', professor: 'Brother Jack' },

            { time: '2:00 PM', room: 'STC 394', professor: 'Sister Enkey' },

            { time: '11:00 AM', room: 'STC 390', professor: 'Brother Keers' }

        ]

    },

    'MATH110': {

        id: 'MATH110',

        title: 'College Algebra',

        description: 'Fundamental algebraic concepts including functions, graphing, and problem solving.',

        credits: 4,

        sections: [

            { time: '8:00 AM', room: 'MC 301', professor: 'Sister Anderson' },

            { time: '1:00 PM', room: 'MC 305', professor: 'Brother Miller' },

            { time: '3:00 PM', room: 'MC 307', professor: 'Brother Thompson' }

        ]

    },

    'ENG101': {

        id: 'ENG101',

        title: 'Academic Writing',

        description: 'Develop writing skills for academic and professional communication.',

        credits: 3,

        sections: [

            { time: '10:00 AM', room: 'GEB 201', professor: 'Sister Anderson' },

            { time: '12:00 PM', room: 'GEB 205', professor: 'Brother Davis' },

            { time: '4:00 PM', room: 'GEB 203', professor: 'Sister Enkey' }

        ]

    }

};
const catalog = (req, res) => {
    const title = 'Course Catalog';
    res.render('catalog', { title, courses });
}

const course = (req, res, next) => {

    const courseId = req.params.courseId;
    const course = courses[courseId];

    if (!course) {
        const err = new Error(`Course ${courseId} not found`);
        err.status = 404;
        return next(err);
    }

    const sortBy = req.query.sort || 'time';
    let sortedSections = [...course.sections];

    switch (sortBy) {

        case 'professor':
            sortedSections.sort((a, b) => a.professor.localeCompare(b.professor));
            break;

        case 'room':
            sortedSections.sort((a, b) => a.room.localeCompare(b.room));
            break;

        case 'time':
        default:
            break;
    }

    console.log(`Viewing course: ${courseId}, sorted by: ${sortBy}`);

    res.render('course', {
        title: `${course.id} - ${course.title}`,
        course: { ...course, sections: sortedSections },
        currentSort: sortBy
    });
};

export default {demo, course, catalog};