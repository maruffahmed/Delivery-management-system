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
import { useShopProvider } from '~/context/ShopProvider'

function PickupListGrid({
    pickupPoints,
    onOpen,
}: {
    pickupPoints: PickupPoints
    onOpen: () => void
}) {
    const { activeShop, chnageActiveShop } = useShopProvider()
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
                    <Text color="primary.500">Add new shop</Text>
                </Flex>
            </Center>

            {pickupPoints.data.length
                ? pickupPoints.data.map((pickupPoint) => (
                      <Card
                          variant="outline"
                          key={pickupPoint.id}
                          //   borderColor={
                          //       activeShop?.id === pickupPoint.id
                          //           ? 'primary.500'
                          //           : 'gray.200'
                          //   }
                          cursor="pointer"
                          //   onClick={() => chnageActiveShop(shop)}
                      >
                          <CardHeader>
                              <Heading size="md"> {pickupPoint.name}</Heading>
                          </CardHeader>
                          <CardBody>
                              <Text>{pickupPoint.address}</Text>
                              {/* <Text>+8801789393745</Text> */}
                          </CardBody>
                          <CardFooter>
                              <Spacer />
                              <Icon
                                  as={RiPencilLine}
                                  fontSize="xl"
                                  cursor="pointer"
                              />
                          </CardFooter>
                      </Card>
                  ))
                : null}
        </SimpleGrid>
    )
}

export default PickupListGrid
