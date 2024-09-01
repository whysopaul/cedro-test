import * as React from "react";
import { Option } from "./types";

interface IDropdownLabelProps {
  option: Option;
  customRender?: (option: Option) => React.JSX.Element;
}

const DropdownLabel: React.FunctionComponent<IDropdownLabelProps> = ({
  option,
  customRender,
}) => {
  if (customRender) {
    const renderCustomLabel = (
      <div className="select-dropdown-item-custom-label">
        {customRender(option)}
      </div>
    );

    return renderCustomLabel;
  }

  return (
    <>
      <span>{option.label}</span>
    </>
  );
};

export default DropdownLabel;
