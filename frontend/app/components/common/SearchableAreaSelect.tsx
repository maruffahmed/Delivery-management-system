import { useQuery } from 'react-query'
import { getServiceAreaTree } from '~/utils/merchant/CSR_API'
import type { SearchableSelectOptionsType } from './SearchableSelectInput'
import SearchableSelect from './SearchableSelectInput'
import type { SingleValue } from 'chakra-react-select'

type SearchableAreaSelectProps = {
    name: string | undefined
    defaultValue?: SearchableSelectOptionsType
    onChange?: (e: SingleValue<SearchableSelectOptionsType>) => void
}

function SearchableAreaSelect({
    name,
    defaultValue,
    onChange,
}: SearchableAreaSelectProps) {
    // Service area
    const { data: serviceArea, isLoading } = useQuery({
        queryKey: 'serviceArea',
        queryFn: () => getServiceAreaTree(),
    })

    const pickupAreaOptions = [] as Array<SearchableSelectOptionsType>

    if (!isLoading) {
        serviceArea?.data?.divisions.forEach((div) => {
            div?.districts?.forEach((dis) => {
                dis?.areas?.forEach((area) => {
                    pickupAreaOptions.push({
                        label: div.name + ' - ' + dis.name + ' - ' + area.name,
                        value: area.id.toString(),
                        area: area.name,
                        zoneId: area.zonesId,
                    })
                })
            })
        })
    }
    return (
        <SearchableSelect
            options={pickupAreaOptions}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    )
}

export default SearchableAreaSelect
