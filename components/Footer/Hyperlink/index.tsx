import React from "react";
import { Text } from "./styles";

type HyperlinkProps = {
  name: string;
  path: string;
  blank?: boolean;
};

export const Hyperlink: React.FC<HyperlinkProps> = ({
  name,
  path,
  blank = true,
}) => (
  <Text href={path} target={blank ? "_blank" : "_self"}>
    {name}
  </Text>
);
