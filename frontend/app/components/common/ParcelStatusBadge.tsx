import { Badge, Flex, Text, Icon } from '@chakra-ui/react'
import { CiDeliveryTruck } from 'react-icons/ci'
import { MdOutlineCancel } from 'react-icons/md'
import { CgSandClock } from 'react-icons/cg'
import { GiCardPickup, GiSandsOfTime } from 'react-icons/gi'
import { AiOutlineFieldTime } from 'react-icons/ai'

export default function ParcelStatusBadge({
    status,
}: {
    status:
        | 'pending'
        | 'cancelled'
        | 'picking-up'
        | 'delivered'
        | 'in-transit'
        | 'processing'
}) {
    const colorScheme =
        status === 'pending'
            ? 'cyan'
            : status === 'cancelled'
            ? 'red'
            : status === 'picking-up'
            ? 'green'
            : 'green'
    const title =
        status === 'pending'
            ? 'Pending'
            : status == 'cancelled'
            ? 'Cancelled'
            : status == 'picking-up'
            ? 'Picking up'
            : status == 'in-transit'
            ? 'In transit'
            : status == 'processing'
            ? 'Processing'
            : 'Delivered'

    const icon =
        status === 'pending'
            ? CgSandClock
            : status === 'cancelled'
            ? MdOutlineCancel
            : status === 'picking-up'
            ? GiCardPickup
            : status === 'in-transit'
            ? AiOutlineFieldTime
            : status === 'processing'
            ? GiSandsOfTime
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
