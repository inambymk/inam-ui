import dynamic from "next/dynamic";

export const getComponent = (slug: string) => {
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return dynamic(
    () =>
      import(`inam-ui/templates/${name}`).then((mod) => ({
        default: mod.default || mod[name],
      })),
    {
      ssr: false,
      loading: () => <div className="h-16 w-full animate-pulse bg-muted/50 rounded-lg" />,
    }
  );
};
