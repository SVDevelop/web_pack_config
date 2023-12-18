import { memo } from "react";
import type { FC } from "react";
import { default as ReactSelect } from "react-select";

import type { TSelectProps } from "./types";

const SelectComponent: FC<TSelectProps> = ({
  dataTestId = "uikit__select",
  defaultValue,
  getOptionLabel,
  isDisabled = false,
  isMulti = false,
  isSearchable,
  menuPlacement,
  menuPosition,
  name,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  value,
}) => {
    const colorStyles = {
        control: (styles: any) => ({ 
            ...styles, 
            padding: '5px 5px', 
            fontFamily: 'Kreon',
            width: '181px',

            fontSize: '18px',
            fontWeight: 300,
            lineHeight: '23px',
            letterSpacing: '0em',
            textAlign: 'left',

            backgroundColor: "#FFFFFF", 
            border: '1px solid #DAD6D6',
            borderRadius: '10px',
            boxShadow: '0px 4px 4px 0px #00000040',
            '&:hover': {
                border: '1px solid #DAD6D6',
            }

        }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }:{ data: any, isDisabled: any, isFocused: any, isSelected: any }) => {
        return { 
            ...styles, 
            backgroundColor:  isFocused ? '#F0EFEF' : null,
            color: data.color 
        };
        },
        multiValue: (styles: any, {data}:{ data: any }) => {
             return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
        },
        multiValueLabel: (styles: any, {data}:{ data: any }) => {
             return {
        ...styles,
        color: "#fff",
      };
        },
        multiValueRemove: (styles: any, {data}:{ data: any }) => {
            return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
        },
    }

    return (
        <ReactSelect
        components={{
            IndicatorSeparator: () => null
        }}
        data-testid={dataTestId}
        defaultValue={defaultValue}
        getOptionLabel={getOptionLabel}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={isSearchable}
        menuPlacement={menuPlacement}
        menuPosition={menuPosition}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        options={options}
        placeholder={placeholder}
        styles={colorStyles}
        value={value}
        />
    )
    
};

export const Select = memo(SelectComponent);