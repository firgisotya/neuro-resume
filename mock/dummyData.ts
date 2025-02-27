const dummyData = {
  personalInfo: {
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Anytown, USA",
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "",
    portfolio: "",
  },
  summary:
    "Experienced software engineer with a strong background in developing scalable web applications and working with cross-functional teams.",
  experiences: [
    {
      title: "Senior Software Engineer",
      companyName: "Tech Solutions Inc.",
      city: "Anytown",
      state: "USA",
      startDate: "2020-01-01",
      endDate: "",
      currentlyWorking: true,
      workSummary:
        "<ul><li>Developed and maintained web applications using React, Node.js, and TypeScript</li><li>Collaborated with product managers and designers to implement new features</li><li>Participated in code reviews and provided feedback to other team members</li></ul>",
    },
    {
      title: "Software Engineer",
      companyName: "Software Co.",
      city: "Anytown",
      state: "USA",
      startDate: "2018-01-01",
      endDate: "2019-12-31",
      currentlyWorking: false,
      workSummary:
        "<ul><li>Designed and implemented RESTful APIs using Node.js and Express</li><li>Worked on front-end development using React and Redux</li><li>Participated in daily stand-ups and sprint planning meetings</li></ul>",
    },
  ],
  educations: [
    {
      universityName: "State University",
      degree: "Bachelor of Science",
      major: "Computer Science",
      startDate: "2012-08-01",
      endDate: "2016-05-01",
      description: "<ul><li>Graduated with honors</li><li>Member of the Computer Science Club</li></ul>",
    },
    {
      universityName: "State University",
      degree: "Bachelor of Science",
      major: "Computer Science",
      startDate: "2012-08-01",
      endDate: "2016-05-01",
      description: "<ul><li>Graduated with honors</li><li>Member of the Computer Science Club</li></ul>",
    },
  ],
  skill: "JavaScript, TypeScript, React, Node.js, Express, HTML, CSS",
  projects: [
    {
      title: "Project 1",
      link: "https://www.example.com/project1",
      description: "<ul><li>Developed a web application for tracking expenses</li><li>Implemented user authentication and authorization using JWT</li></ul>",
    },
    {
      title: "Project 2",
      link: "https://www.example.com/project2",
      description: "<ul><li>Developed a web application for tracking expenses</li><li>Implemented user authentication and authorization using JWT</li></ul>",
    },
  ],
  certificates: [
    {
      title: "Certified JavaScript Developer",
      issuer: "Tech Certification Board",
      issueDate: "2020-06-01",
    },
    {
      title: "Certified React Developer",
      issuer: "Tech Certification Board",
      issueDate: "2021-01-01",
    },
  ],
  languages: [
    {
      name: "English",
      proficiency: "Native",
    },
    {
      name: "Spanish",
      proficiency: "Intermediate",
    },
  ],
};

export default dummyData;
