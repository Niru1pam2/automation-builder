import {
  BluetoothConnected,
  BookTemplate,
  Home,
  LogsIcon,
  Notebook,
  Settings,
  WorkflowIcon,
} from "lucide-react";

export const data = {
  user: {
    name: "Shadcn",
    email: "email@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Workflows",
      url: "/workflows",
      icon: WorkflowIcon,
    },
    {
      title: "Connections",
      url: "/connections",
      icon: BluetoothConnected,
    },
    {
      title: "Billing",
      url: "/billing",
      icon: Notebook,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: BookTemplate,
    },
    {
      title: "Logs",
      url: "/logs",
      icon: LogsIcon,
    },
  ],
};
