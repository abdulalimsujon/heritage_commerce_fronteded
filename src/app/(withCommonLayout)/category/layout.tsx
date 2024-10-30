import { ReactNode } from "react";

const layout = ({
  children,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) => {
  return <div>{children}</div>;
};

export default layout;
