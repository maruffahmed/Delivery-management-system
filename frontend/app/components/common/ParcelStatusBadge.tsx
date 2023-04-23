import { Badge, Flex, Text, Icon } from '@chakra-ui/react'
import { CiDeliveryTruck } from 'react-icons/ci'
import { MdOutlineCancel } from 'react-icons/md'
import { CgSandClock } from 'react-icons/cg'
import { GiCardPickup } from 'react-icons/gi'

export default function ParcelStatusBadge({
    status,
}: {
    status: 'pending' | 'canceled' | 'picked-up' | 'delivered'
}) {
    const colorScheme =
        status === 'pending'
            ? 'cyan'
            : status === 'canceled'
            ? 'red'
            : status === 'picked-up'
            ? 'green'
            : 'green'
    const title =
        status === 'pending'
            ? 'Pending'
            : status == 'canceled'
            ? 'Canceled'
            : status == 'picked-up'
            ? 'Picked up'
            : 'Delivered'

    const icon =
        status === 'pending'
            ? CgSandClock
            : status === 'canceled'
            ? MdOutlineCancel
            : status === 'picked-up'
            ? GiCardPickup
            : CiDeliveryTruck
    return (
        <Badge
            colorScheme={colorScheme}
            variant="outline"
            borderRadius={5}
            p="2"
        >
            <Flex align="center" gap={1}>
                <Icon as={icon} fontSize="lg" />
                <Text as="span">{title}</Text>
            </Flex>
        </Badge>
    )
}
