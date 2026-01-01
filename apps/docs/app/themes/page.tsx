import ThemesPage from "@/components/pages/ThemesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Configuration | Inam UI",
  description:
    "Learn how to configure themes and customize colors in Inam UI using Tailwind CSS v3 and v4.",
};

export default function Page() {
  return <ThemesPage />;
}
