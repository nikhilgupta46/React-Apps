export const initialData = [
  {
    name: "node_modules",
    id: parseInt(new Date().getTime() * Math.random()),
  },
  {
    name: "public",
    id: parseInt(new Date().getTime() * Math.random()),
    isOpen: false,
    files: [
      {
        name: "index.html",
        isOpen: false,
        id: parseInt(new Date().getTime() * Math.random()),
      },
    ],
  },
  {
    name: "src",
    isOpen: true,
    id: parseInt(new Date().getTime() * Math.random()),
    files: [
      {
        name: "App.js",
        id: parseInt(new Date().getTime() * Math.random()),
      },
      {
        name: "components",
        isOpen: false,
        id: parseInt(new Date().getTime() * Math.random()),
        files: [
          {
            name: "File.js",
            id: parseInt(new Date().getTime() * Math.random()),
          },
        ],
      },
    ],
  },
  {
    name: "Git",
    isOpen: false,
    id: parseInt(new Date().getTime() * Math.random()),
    files: [
      {
        name: ".gitignore",
        id: parseInt(new Date().getTime() * Math.random()),
      },
      {
        name: "Commits",
        isOpen: false,
        id: parseInt(new Date().getTime() * Math.random()),
        files: [
          {
            name: "First commit",
            id: parseInt(new Date().getTime() * Math.random()),
          },
        ],
      },
    ],
  },
];
