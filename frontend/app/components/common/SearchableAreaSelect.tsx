import { useQuery } from 'react-query'
import { getServiceAreaTree } from '~/utils/merchant/CSR_API'
import type { SearchableSelectOptionsType } from './SearchableSelectInput'
import SearchableSelect from './SearchableSelectInput'

function SearchableAreaSelect({
    name,
    defaultValue,
}: {
    name: string
    defaultValue?: SearchableSelectOptionsType
}) {
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
                        value: div.name + ' - ' + dis.name + ' - ' + area.name,
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
        />
    )
}

export default SearchableAreaSelect
