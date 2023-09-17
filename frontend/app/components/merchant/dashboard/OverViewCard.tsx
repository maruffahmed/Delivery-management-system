import {
    Card,
    CardBody,
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    Tooltip,
    Icon,
} from '@chakra-ui/react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import type { OrderSummary } from '~/routes/dashboard/index'

function OverViewCard({ order }: { order: (typeof OrderSummary)[0] }) {
    return (
        <Card>
            <CardBody>
                <HStack>
                    <Stat>
                        <StatNumber>{order.value}</StatNumber>
                        <StatLabel
                            mt="1"
                            display="flex"
                            alignItems="center"
                            gap={2}
                        >
                            {order.labelText}
                            <Tooltip
                                hasArrow
                                label={order.tooltipText}
                                bg="white"
                                color="black"
                                p={4}
                                rounded="base"
                                shadow="dark-lg"
                            >
                                <span>
                                    <Icon
                                        as={AiOutlineQuestionCircle}
                                        color="gray.500"
                                    />
                                </span>
                            </Tooltip>
                        </StatLabel>
                    </Stat>
                </HStack>
            </CardBody>
        </Card>
    )
}

export default OverViewCard
