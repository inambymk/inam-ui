import { componentsMetadata } from "@/lib/components-data";
import ClientLanding from "@/components/pages/landing";

export default function Home() {
  const featuredComponents = componentsMetadata.slice(0, 6);

  return <ClientLanding featuredComponents={featuredComponents} />;
}
