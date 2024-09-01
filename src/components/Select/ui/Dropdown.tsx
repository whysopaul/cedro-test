import * as React from "react";
import DropdownList from "./DropdownList";
import { Option } from "./types";

interface IDropdownProps {
  options: Option[];
  selected: Option[];
  combobox?: string;
  visible: boolean;
  onSelect: (option: Option) => void;
  onCreate: (option: Option) => void;
  onDelete: (option: Option) => void;
  customLabel?: (option: Option) => React.JSX.Element;
  customRender?: (list?: React.JSX.Element) => React.JSX.Element;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = ({
  options,
  selected,
  combobox,
  visible,
  onSelect,
  onCreate,
  onDelete,
  customLabel,
  customRender,
}) => {
  return (
    <>
      <div
        className={
          visible && (combobox || options.length > 0)
            ? "select-dropdown"
            : "hidden"
        }
      >
        <DropdownList
          options={options}
          selected={selected}
          combobox={combobox}
          onSelect={onSelect}
          onCreate={onCreate}
          onDelete={onDelete}
          customLabel={customLabel}
          customRender={customRender}
        />
      </div>
    </>
  );
};

export default Dropdown;
