import {
    Badge,
    Container,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import Layout from '~/components/Layout'
import { CiDeliveryTruck } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'

function ParcelList() {
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Heading as="h2" size="lg">
                    Your all parcel
                </Heading>
                <TableContainer my={10}>
                    <Table size="lg">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Creation Date</Th>
                                <Th>Pickup Name</Th>
                                <Th>ID</Th>
                                <Th>Shop</Th>
                                <Th>Customer Details</Th>
                                <Th>Status</Th>
                                <Th>Payment Info</Th>
                                <Th>More Info</Th>
                                <Th>Last Update</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Feb 12, 2023</Td>
                                <Td>Uttara Sector - 10</Td>
                                <Td>ID:23A212SUS8HFK</Td>
                                <Td>Maruf Fasion</Td>
                                <Td>
                                    <Text>Emon</Text>
                                    <Text>01789393745</Text>
                                    <Text>Hazipur-Ghaturia,</Text>
                                    <Text>MolamgariHat, Kalai,</Text>
                                    <Text>Joypurhat</Text>
                                    <Text>Kalai</Text>
                                </Td>
                                <Td>
                                    <Badge
                                        colorScheme="green"
                                        variant="outline"
                                        borderRadius={5}
                                    >
                                        <Flex align="center" gap={1}>
                                            <Icon
                                                as={CiDeliveryTruck}
                                                fontSize="lg"
                                            />
                                            <Text as="span">Delivered</Text>
                                        </Flex>
                                    </Badge>
                                </Td>
                                <Td>
                                    <Text>Tk. 130 Cash Collection</Text>
                                    <Text>Tk. 131.3 Charge</Text>
                                </Td>
                                <Td>Regular Delivery</Td>
                                <Td>Mar 05, 2023</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            colorScheme="primary"
                                        >
                                            <Icon as={BsThreeDotsVertical} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>Edit</MenuItem>
                                            <MenuItem color="red.500">
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td>Feb 12, 2023</Td>
                                <Td>Uttara Sector - 10</Td>
                                <Td>ID:23A212SUS8HFK</Td>
                                <Td>Maruf Fasion</Td>
                                <Td>
                                    <Text>Emon</Text>
                                    <Text>01789393745</Text>
                                    <Text>Hazipur-Ghaturia,</Text>
                                    <Text>MolamgariHat, Kalai,</Text>
                                    <Text>Joypurhat</Text>
                                    <Text>Kalai</Text>
                                </Td>
                                <Td>
                                    <Badge
                                        colorScheme="red"
                                        variant="outline"
                                        borderRadius={5}
                                    >
                                        <Flex align="center" gap={1}>
                                            <Icon
                                                as={MdOutlineCancel}
                                                fontSize="lg"
                                            />
                                            <Text as="span">Canceled</Text>
                                        </Flex>
                                    </Badge>
                                </Td>
                                <Td>
                                    <Text>Tk. 130 Cash Collection</Text>
                                    <Text>Tk. 131.3 Charge</Text>
                                </Td>
                                <Td>Regular Delivery</Td>
                                <Td>Mar 05, 2023</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            colorScheme="primary"
                                        >
                                            <Icon as={BsThreeDotsVertical} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>Edit</MenuItem>
                                            <MenuItem color="red.500">
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout>
    )
}

export default ParcelList
