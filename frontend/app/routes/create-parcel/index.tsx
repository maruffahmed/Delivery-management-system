import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    Link,
    Select,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react'
import Layout from '~/components/Layout'

function CreateParcel() {
    return (
        <Layout>
            <Container maxW="container.xl" py="8">
                <Grid templateColumns="repeat(6, 1fr)" gap={5}>
                    {/* Percel input form */}
                    <GridItem colSpan={{ base: 6, lg: 4 }}>
                        <Heading size="lg" mb={5}>
                            Create new parcel
                        </Heading>

                        <Heading as="h5" fontSize="md" py={5}>
                            Customer information
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5">
                            <FormControl isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    name="fullName"
                                    placeholder="Customer name"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Phone number</FormLabel>
                                <Input
                                    type="text"
                                    name="phone"
                                    placeholder="Customer phone number"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Customer address</FormLabel>
                                <Input
                                    type="text"
                                    name="customer address"
                                    placeholder="Customer address"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Invoice Id</FormLabel>
                                <Input
                                    type="text"
                                    name="invoiceId"
                                    placeholder="Invoice Id"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>
                        </SimpleGrid>
                        <Heading as="h5" fontSize="md" my={5}>
                            Delivery information
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5">
                            <FormControl isRequired>
                                <FormLabel>Percel weight</FormLabel>
                                <Input
                                    type="text"
                                    name="percelWeight"
                                    placeholder="500gm"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Delivery area</FormLabel>
                                <Input
                                    type="text"
                                    name="deliveryArea"
                                    placeholder="Dhaka"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Cash collection ammount</FormLabel>
                                <Input
                                    type="text"
                                    name="cashCollection"
                                    placeholder="Cash collection ammount"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Percel price</FormLabel>
                                <Input
                                    type="text"
                                    name="percelPrice"
                                    placeholder="Percel price"
                                    focusBorderColor="primary.500"
                                />
                            </FormControl>

                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Select percel type</FormLabel>
                                    <Stack spacing={5} direction="row">
                                        <Checkbox colorScheme="primary">
                                            Fragile
                                        </Checkbox>
                                        <Checkbox colorScheme="primary">
                                            Liquid
                                        </Checkbox>
                                    </Stack>
                                </FormControl>
                            </Box>

                            <FormControl isRequired>
                                <FormLabel>Product category</FormLabel>
                                <Select
                                    placeholder="Choose product category"
                                    name="productCategory"
                                    focusBorderColor="primary.500"
                                >
                                    <option value="book">Book</option>
                                    <option value="electronics">
                                        Electronics
                                    </option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                        <FormControl my={5}>
                            <FormLabel>
                                Extra information (ex: Parcel details, delivery,
                                etc.)
                            </FormLabel>
                            <Textarea
                                name="extraInformation"
                                focusBorderColor="primary.500"
                                placeholder="Extra information"
                                rows={5}
                            />
                        </FormControl>
                        <Checkbox colorScheme="primary">
                            Please mention product price. If the product is lost
                            or damage the Amount of compensation will be
                            determine based on the product price.
                        </Checkbox>
                    </GridItem>

                    {/* Shops and percel information */}
                    <GridItem colSpan={{ base: 6, lg: 2 }}>
                        <Stack bg="whitesmoke" px={5} py={10} spacing={5}>
                            <Flex>
                                <Text fontWeight="bold" fontSize="lg">
                                    Maruf Fasion
                                </Text>
                                <Spacer />
                                <Link
                                    color="primary.500"
                                    _hover={{ textDecoration: 'none' }}
                                    fontWeight="bold"
                                >
                                    Change
                                </Link>
                            </Flex>
                            <FormControl isRequired>
                                <FormLabel>Pickup point</FormLabel>
                                <Select
                                    placeholder="Choose pickup point"
                                    name="pickupPoint"
                                    focusBorderColor="primary.500"
                                    bg="white"
                                >
                                    <option value="book">
                                        Uttara Sector - 10
                                    </option>
                                </Select>
                            </FormControl>
                            <Text fontWeight="bold" fontSize="lg">
                                Delivery charge
                            </Text>
                            <Stack spacing={5}>
                                <Flex>
                                    <Text>Cash collection</Text>
                                    <Spacer />
                                    <Text>50tk</Text>
                                </Flex>
                                <Flex>
                                    <Text>Delivery charge</Text>
                                    <Spacer />
                                    <Text>50tk</Text>
                                </Flex>
                                <Flex>
                                    <Text>COD charge</Text>
                                    <Spacer />
                                    <Text>50tk</Text>
                                </Flex>
                            </Stack>
                            <Divider borderColor="gray.500" />
                            <Flex>
                                <Text fontWeight="bold" fontSize="lg">
                                    Total
                                </Text>
                                <Spacer />
                                <Text>150tk</Text>
                            </Flex>
                        </Stack>
                    </GridItem>
                    {/* Action buttons */}
                    <GridItem
                        colSpan={{ base: 6, lg: 4 }}
                        display="flex"
                        py={5}
                    >
                        <Button
                            colorScheme="primary"
                            variant="outline"
                            size="lg"
                        >
                            Cancel
                        </Button>
                        <Spacer />
                        <Button
                            colorScheme="primary"
                            size="lg"
                            isDisabled={true}
                        >
                            Submit
                        </Button>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    )
}

export default CreateParcel
