import { createFilter, Select } from 'chakra-react-select'
import { FixedSizeList as List } from 'react-window'

const height = 35
function MenuList(props: any) {
    const { options, children, maxHeight, getValue } = props
    const [value] = getValue()
    const initialOffset = options.indexOf(value) * height

    return (
        <List
            width="100%"
            height={maxHeight}
            itemCount={children.length}
            itemSize={height}
            initialScrollOffset={initialOffset}
            style={{ backgroundColor: 'white' }}
        >
            {({ index }) => <>{children[index]}</>}
        </List>
    )
}

export interface SearchableSelectOptionsType {
    label: string
    value: string
}

const SearchableSelect = ({
    options,
    name,
    defaultValue,
}: {
    options: Array<SearchableSelectOptionsType>
    name: string
    defaultValue?: SearchableSelectOptionsType
}) => {
    return (
        <Select
            filterOption={createFilter({
                ignoreAccents: false,
            })}
            components={{ MenuList }}
            options={options}
            useBasicStyles
            placeholder="Choose pickup area"
            chakraStyles={{
                placeholder: (provider) => ({
                    ...provider,
                    color: 'black',
                }),
            }}
            selectedOptionColorScheme="primary"
            focusBorderColor="primary.500"
            name={name}
            defaultValue={defaultValue}
            isRequired={true}
        />
    )
}

export default SearchableSelect
