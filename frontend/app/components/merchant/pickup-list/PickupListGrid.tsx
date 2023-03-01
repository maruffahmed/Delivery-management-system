import React from 'react'
import type { PickupPoints } from '~/types'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Spacer,
    Text,
} from '@chakra-ui/react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { RiPencilLine } from 'react-icons/ri'
import { usePickupPoint } from '~/context/PickupPointProvider'

function PickupListGrid({
    pickupPoints,
    onOpen,
    onEditDrawerOpen,
}: {
    pickupPoints: PickupPoints
    onOpen: () => void
    onEditDrawerOpen: () => void
}) {
    const { setPickupPoint } = usePickupPoint()

    return (
        <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 4 }}
            spacingX="40px"
            spacingY="20px"
            mt="12"
        >
            <Center
                bg="gray.100"
                borderRadius="base"
                height={{ base: '200px', sm: 'auto' }}
                cursor="pointer"
                onClick={onOpen}
            >
                <Flex direction="column" align="center" gap="2">
                    <Icon
                        as={BsFillPlusCircleFill}
                        color="primary.500"
                        fontSize="2xl"
                    />
                    <Text color="primary.500">Add new pickup point</Text>
                </Flex>
            </Center>

            {pickupPoints.data.length
                ? pickupPoints.data.map((pickupPoint) => (
                      <Card
                          variant="outline"
                          key={pickupPoint.id}
                          cursor="pointer"
                          onMouseEnter={() => setPickupPoint(pickupPoint)}
                      >
                          <CardHeader>
                              <Heading size="md"> {pickupPoint.name}</Heading>
                          </CardHeader>
                          <CardBody>
                              <Text>{pickupPoint.address}</Text>
                          </CardBody>
                          <CardFooter>
                              <Spacer />
                              <Icon
                                  as={RiPencilLine}
                                  fontSize="xl"
                                  cursor="pointer"
                                  onClick={onEditDrawerOpen}
                              />
                          </CardFooter>
                      </Card>
                  ))
                : null}
        </SimpleGrid>
    )
}

export default PickupListGrid
