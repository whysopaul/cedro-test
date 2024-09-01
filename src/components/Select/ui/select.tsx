import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import CaretIcon from "../assets/CaretIcon";
import ClearIcon from "../assets/ClearIcon";
import { useOnClickOutside } from "../lib/useOnClickOutside";
import Dropdown from "./Dropdown";
import "./select.scss";
import { Option } from "./types";

interface ISelectProps {
  options: Option[];
  multiple?: boolean;
  combobox?: boolean;
  disabled?: boolean;
  /**
   * Handle select changes
   * @param state - Current state
   * @example <Select handleChange={(state) => console.log(state)} />
   */
  handleChange?: (state: Option[]) => void;
  /**
   *
   * @param option - Option
   * @returns Custom label
   * @example <Select customLabel={(option) => <span>{option.label}{' '}<b>Custom label</b></span>} />
   */
  customLabel?: (option: Option) => React.JSX.Element;
  /**
   *
   * @param list - List of options.
   * @returns Custom dropdown.
   * @example <Select customDropdown={(list) => <div>{list}<p>Text</p></div>} />
   */
  customDropdown?: (list?: React.JSX.Element) => React.JSX.Element;
}

const Select: React.FunctionComponent<ISelectProps> = ({
  options,
  multiple,
  combobox,
  disabled,
  handleChange,
  customLabel,
  customDropdown,
}) => {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  const [optionsState, setOptionsState] = useState(options);
  const [selected, setSelected] = useState<Option[]>([]);

  const matchingOptions = useMemo(
    () =>
      optionsState.filter((opt) =>
        opt.label.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ),
    [search, optionsState]
  );
  const isError = useMemo(() => {
    if (combobox) return false;

    return optionsState.length > 0 && matchingOptions.length === 0;
  }, [matchingOptions]);

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHiddenRef = useRef<HTMLSpanElement>(null);

  const onDivClick = () => {
    if (dropdown) {
      setDropdown(false);
      return;
    }

    inputRef.current?.focus();
    setDropdown(true);
  };

  const onInputFocus = () => {
    setFocused(true);
  };

  const onInputBlur = () => {
    setFocused(false);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSelect = (option: Option) => {
    setSelected((prev) => (multiple ? [...prev, option] : [option]));
    setSearch("");

    if (multiple) return;

    setDropdown(false);
  };

  const onCreate = (option: Option) => {
    setOptionsState((prev) => [option, ...prev]);
  };

  const onClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
  };

  const onDelete = (option: Option) => {
    setSelected(selected.filter((opt) => opt.value !== option.value));
  };

  useEffect(() => {
    if (!inputHiddenRef.current) return;

    setInputWidth(inputHiddenRef.current.clientWidth);
  }, [search]);

  useEffect(() => {
    if (!handleChange) return;

    handleChange(selected);
  }, [selected]);

  const getBorderStyle = () => {
    if (!focused && !isError) return "select-input";

    if (isError) return "select-input select-input__error";

    return "select-input select-input__focused";
  };

  const getPlaceholderStyle = () => {
    if (search) return "hidden";

    if (selected.length > 0)
      return "select-input-placeholder select-input-placeholder__selected";

    return "select-input-placeholder";
  };

  // Close dropdown on click outside the component
  useOnClickOutside(selectRef, () => setDropdown(false));

  return (
    <>
      <div
        className={disabled ? "select select__disabled" : "select"}
        ref={selectRef}
      >
        <div
          className={
            multiple && selected.length > 0
              ? getBorderStyle() + " select-input-multiple"
              : getBorderStyle()
          }
          onClick={onDivClick}
        >
          {multiple && selected.length > 0 && (
            <>
              {selected.map((opt) => (
                <div className="select-input-tag" key={opt.value}>
                  <span>{opt.label}</span>
                  <button
                    className="select-input-tag-button"
                    onClick={() => onDelete(opt)}
                  >
                    <ClearIcon />
                  </button>
                </div>
              ))}
            </>
          )}
          <input
            type="text"
            style={
              multiple && selected.length > 0 ? { width: inputWidth + 10 } : {}
            }
            value={search}
            onChange={onSearch}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            {...(disabled && { tabIndex: -1 })}
            ref={inputRef}
          />
          {multiple && selected.length > 0 && (
            <span className="select-input-hidden" ref={inputHiddenRef}>
              {search}
            </span>
          )}
          {(!multiple || selected.length === 0) && (
            <span className={getPlaceholderStyle()}>
              {selected[0]?.label ?? "Placeholder"}
            </span>
          )}
          <span
            className={
              dropdown
                ? "select-input-icon select-input-icon__rotated"
                : "select-input-icon"
            }
          >
            <CaretIcon />
          </span>
          {selected.length > 0 && (
            <span
              className="select-input-icon select-input-icon-clear"
              onClick={onClear}
            >
              <ClearIcon />
            </span>
          )}
        </div>
        {!disabled && (
          <Dropdown
            options={matchingOptions}
            selected={selected}
            combobox={combobox ? search : ""}
            visible={dropdown}
            onSelect={onSelect}
            onCreate={onCreate}
            onDelete={onDelete}
            customLabel={customLabel}
            customRender={customDropdown}
          />
        )}
      </div>
    </>
  );
};

export default Select;
