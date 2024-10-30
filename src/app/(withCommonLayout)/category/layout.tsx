import { ReactNode } from "react";

const layout = ({
  children,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) => {
  return <div className="bg-red-500">{children}</div>;
};

export default layout;
