import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";

const { img: Image, ...docsComponents } = getDocsMDXComponents({});

export const useMDXComponents: typeof getDocsMDXComponents = (components) => ({
  ...docsComponents,
  img: (props) => (
    <Image
      {...props}
      className="nextra-border rounded-xl border drop-shadow-sm"
    />
  ),
  figure: (props) => <figure className="mt-6" {...props} />,
  figcaption: (props) => (
    <figcaption className="mt-2 text-center text-sm" {...props} />
  ),
  ...components,
});
