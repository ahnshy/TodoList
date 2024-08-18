import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo= {
  id: string;
  title: string;
  is_done: boolean;
  create_at: Date;
}
