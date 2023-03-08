import { classNames } from "@/utils/utils";
import React from "react";

const Group = ({ className = "", children, ...rest }) => {
  return (
    <div className={classNames(className, "form-group")} {...rest}>
      {children}
    </div>
  );
};

export default Group;
