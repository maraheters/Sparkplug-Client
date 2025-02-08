import { ActionMeta, GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import Select from "react-select";

import defaultStyles from './CustomSelect.module.scss';

export interface Props {

    options?: OptionsOrGroups<{ value: string; label: string; }, 
                GroupBase<{ value: string; label: string; }>> | undefined,

    onChange: ((
        newValue: SingleValue<{ value: string; label: string; }>, 
        actionMeta: ActionMeta<{ value: string; label: string; }>)  => void),

    placeholder?: string,
    key?: string,
    styles?: CSSModuleClasses
}

function CustomSelect( {key, options, onChange, placeholder, styles: stylesProp }: Props ) {

    const styles = stylesProp ? stylesProp : defaultStyles;

    return(
        <Select 
        unstyled
        options={ options }
        onChange={ onChange }
        classNames={{
            container: (state) => ( state.isFocused ? styles.containerFocused : styles.container),
            control: () => (styles.control),
            valueContainer: () => (styles.valueContainer),
            option: () => (styles.option),
            noOptionsMessage: () => (styles.noOptionsMessage),
            menu: () => (styles.menu),
            menuList: () => (styles.menuList),
            placeholder: () => (styles.placeholder)
        }}
        {...(placeholder ? { placeholder } : {})}
        {...(key ? { key } : {})}
        />
    )
}

export default CustomSelect;