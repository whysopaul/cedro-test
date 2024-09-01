import * as React from "react";
import CheckIcon from "../assets/CheckIcon";
import ClearIcon from "../assets/ClearIcon";
import PlusIcon from "../assets/PlusIcon";
import DropdownLabel from "./DropdownLabel";
import { Option } from "./types";

interface IDropdownListProps {
  options: Option[];
  selected: Option[];
  combobox?: string;
  onSelect: (option: Option) => void;
  onCreate: (option: Option) => void;
  onDelete: (option: Option) => void;
  customLabel?: (option: Option) => React.JSX.Element;
  customRender?: (list?: React.JSX.Element) => React.JSX.Element;
}

const createNewOption = (label: string): Option => {
  return {
    value: Date.now() + "",
    label,
  };
};

const DropdownList: React.FunctionComponent<IDropdownListProps> = ({
  options,
  selected,
  combobox,
  onSelect,
  onCreate,
  onDelete,
  customLabel,
  customRender,
}) => {
  if (customRender) {
    const renderCustomList = customRender(
      <DropdownList
        options={options}
        selected={selected}
        combobox={combobox}
        onSelect={onSelect}
        onCreate={onCreate}
        onDelete={onDelete}
        customLabel={customLabel}
      />
    );

    return renderCustomList;
  }

  return (
    <>
      <div className="select-dropdown-list">
        {combobox &&
          !options
            .map((opt) => opt?.label?.toLocaleLowerCase())
            .includes(combobox.toLocaleLowerCase()) && (
            <div
              className="select-dropdown-create-item"
              onClick={() => onCreate(createNewOption(combobox))}
            >
              <span className="select-dropdown-create-item-icon">
                <PlusIcon />
              </span>
              <span className="select-dropdown-create-item-text">
                Создать «{combobox}»
              </span>
            </div>
          )}
        {options.map((opt) => {
          const isSelected = selected.map((s) => s.value).includes(opt.value);
          return (
            <div
              className={
                isSelected
                  ? "select-dropdown-item select-dropdown-item__selected"
                  : "select-dropdown-item"
              }
              onClick={() => (isSelected ? onDelete(opt) : onSelect(opt))}
              key={opt.value}
            >
              <DropdownLabel option={opt} customRender={customLabel} />
              {isSelected && (
                <div className="select-dropdown-item-icons">
                  <div className="select-dropdown-item-active">
                    <span>
                      <CheckIcon />
                    </span>
                  </div>
                  <div className="select-dropdown-item-active select-dropdown-item-active__hover">
                    <span>
                      <ClearIcon />
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DropdownList;
