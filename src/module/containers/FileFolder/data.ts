export const initialData = [
  {
    name: "node_modules",
    id: parseInt((new Date().getTime() * Math.random()) as unknown as string),
  },
  {
    name: "public",
    id: parseInt((new Date().getTime() * Math.random()) as unknown as string),
    isOpen: false,
    files: [
      {
        name: "index.html",
        isOpen: false,
        id: parseInt(
          (new Date().getTime() * Math.random()) as unknown as string
        ),
      },
    ],
  },
  {
    name: "src",
    isOpen: true,
    id: parseInt((new Date().getTime() * Math.random()) as unknown as string),
    files: [
      {
        name: "App.js",
        id: parseInt(
          (new Date().getTime() * Math.random()) as unknown as string
        ),
      },
      {
        name: "components",
        isOpen: false,
        id: parseInt(
          (new Date().getTime() * Math.random()) as unknown as string
        ),
        files: [
          {
            name: "File.js",
            id: parseInt(
              (new Date().getTime() * Math.random()) as unknown as string
            ),
          },
        ],
      },
    ],
  },
  {
    name: "Git",
    isOpen: false,
    id: parseInt((new Date().getTime() * Math.random()) as unknown as string),
    files: [
      {
        name: ".gitignore",
        id: parseInt(
          (new Date().getTime() * Math.random()) as unknown as string
        ),
      },
      {
        name: "Commits",
        isOpen: false,
        id: parseInt(
          (new Date().getTime() * Math.random()) as unknown as string
        ),
        files: [
          {
            name: "First commit",
            id: parseInt(
              (new Date().getTime() * Math.random()) as unknown as string
            ),
          },
        ],
      },
    ],
  },
];
