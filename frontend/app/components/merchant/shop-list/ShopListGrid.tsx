import type { Shops } from '~/types'
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

function ShopListGrid({
    shops,
    onAddShopDrawerOpen,
    onEditDrawerOpen,
}: {
    shops: Shops
    onAddShopDrawerOpen: () => void
    onEditDrawerOpen: () => void
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
                onClick={onAddShopDrawerOpen}
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

            {shops.data.length
                ? shops.data.map((shop) => (
                      <Card
                          variant="outline"
                          key={shop.id}
                          borderColor={
                              activeShop?.id === shop.id
                                  ? 'primary.500'
                                  : 'gray.200'
                          }
                          cursor="pointer"
                          onClick={() => chnageActiveShop(shop)}
                      >
                          <CardHeader>
                              <Heading size="md"> {shop.name}</Heading>
                          </CardHeader>
                          <CardBody>
                              <Text>{shop.address}</Text>
                              {/* <Text>+8801789393745</Text> */}
                          </CardBody>
                          <CardFooter>
                              <Spacer />
                              <Icon
                                  as={RiPencilLine}
                                  fontSize="xl"
                                  cursor="pointer"
                                  onClick={() => onEditDrawerOpen()}
                              />
                          </CardFooter>
                      </Card>
                  ))
                : null}
        </SimpleGrid>
    )
}

export default ShopListGrid
