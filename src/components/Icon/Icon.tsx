import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Icon = ({ children }: Props) => (
  <div className="grid place-items-center">{children}</div>
);
