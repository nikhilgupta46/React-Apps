import InteractiveShape from "../containers/InteractiveShape/InteractiveShape.tsx";
import FileFolder from "../containers/FileFolder/app.tsx";
import { AutoComplete } from "../containers/AutoComplete/AutoComplete.tsx";
import { Dummy } from "../components/Dummy.tsx";

export const RouteConfig = [
  {
    label: "Interactive Shape",
    component: InteractiveShape,
    route: "/interactiveShape",
  },

  {
    label: "Auto Complete",
    component: AutoComplete,
    route: "/autoComplete",
  },
  {
    label: "File Folder",
    component: FileFolder,
    route: "/fileFolder",
  },
  {
    label: "",
    component: Dummy,
    route: "/dummys",
  },
];
