import * as React from "react";
import type {
    ClearIndicatorProps,
    DropdownIndicatorProps,
    MenuListProps,
    MenuProps,
    MultiValueRemoveProps,
    OptionProps,
    Props,
} from "react-select";
import { components } from "react-select";
import {
    CaretSortIcon,
    CheckIcon,
    Cross2Icon as CloseIcon,
} from "@radix-ui/react-icons";
import { FixedSizeList as List } from "react-window";
import CreatableSelect from "react-select/creatable";
import { defaultClassNames, defaultStyles } from "@/lib/utils";

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
        <components.DropdownIndicator {...props}>
            <CaretSortIcon className={"h-4 w-4 opacity-50"} />
        </components.DropdownIndicator>
    );
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
    return (
        <components.ClearIndicator {...props}>
            <CloseIcon className={"h-3.5 w-3.5 opacity-50"} />
        </components.ClearIndicator>
    );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
    return (
        <components.MultiValueRemove {...props}>
            <CloseIcon className={"h-3 w-3 opacity-50"} />
        </components.MultiValueRemove>
    );
};

export const Option = (props: OptionProps) => {
    return (
        <components.Option {...props}>
            <div className="flex items-center justify-between">
                {/* TODO: Figure out the type */}
                <div>{(props.data as { label: string }).label}</div>
                {props.isSelected && <CheckIcon />}
            </div>
        </components.Option>
    );
};

// Using Menu and MenuList fixes the scrolling behavior
export const Menu = (props: MenuProps) => {
    return <components.Menu {...props}>{props.children}</components.Menu>;
};

export const MenuList = (props: MenuListProps) => {
    const { children, maxHeight } = props;

    const childrenArray = React.Children.toArray(children);

    const calculateHeight = () => {
        // When using children it resizes correctly
        const totalHeight = childrenArray.length * 35; // Adjust item height if different
        return totalHeight < maxHeight ? totalHeight : maxHeight;
    };

    const height = calculateHeight();

    // Ensure childrenArray has length. Even when childrenArray is empty there is one element left
    if (!childrenArray || childrenArray.length - 1 === 0) {
        return <components.MenuList {...props} />;
    }
    return (
        <List
            height={height}
            itemCount={childrenArray.length}
            itemSize={35} // Adjust item height if different
            width="100%"
        >
            {({ index, style }) => <div style={style}>{childrenArray[index]}</div>}
        </List>
    );
};

const Creatable = React.forwardRef<
    React.ElementRef<typeof CreatableSelect>,
    React.ComponentPropsWithoutRef<typeof CreatableSelect>
>((props: Props, ref) => {
    const {
        value,
        onChange,
        options = [],
        styles = defaultStyles,
        classNames = defaultClassNames,
        components = {},
        ...rest
    } = props;

    const id = React.useId();

    return (
        <CreatableSelect
            instanceId={id}
            ref={ref}
            value={value}
            onChange={onChange}
            options={options}
            unstyled
            components={{
                DropdownIndicator,
                ClearIndicator,
                MultiValueRemove,
                Option,
                Menu,
                MenuList,
                ...components,
            }}
            styles={styles}
            classNames={classNames}
            {...rest}
        />
    );
});
Creatable.displayName = "Creatable";
export default Creatable;