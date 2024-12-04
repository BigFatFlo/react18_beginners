import React, { useState } from "react";
import Button from "./Button/Button";

interface ExpandableTextProps {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: ExpandableTextProps) => {
  const [isExpanded, setisExpanded] = useState(false);

  return (
    <div>
      {children.length <= maxChars || isExpanded
        ? children
        : children.slice(0, maxChars) + "..."}
      {children.length > maxChars ? (
        <Button onClick={() => setisExpanded(!isExpanded)}>
          {isExpanded ? "less" : "more"}
        </Button>
      ) : null}
    </div>
  );
};

export default ExpandableText;
