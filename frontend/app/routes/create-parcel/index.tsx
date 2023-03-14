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
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useQuery } from 'react-query'
import SearchableAreaSelect from '~/components/common/SearchableAreaSelect'
import Layout from '~/components/Layout'
import { getParcelProductParentCateogires } from '~/utils/merchant/CSR_API'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
    title: 'Create new parcel',
})

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

function CreateParcel() {
    const { data: parcelProductParentCat } = useQuery({
        queryKey: 'parcelProductParentCategories',
        queryFn: () => getParcelProductParentCateogires(),
    })
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
                                <FormLabel>
                                    Invoice Id <small>(Optional)</small>
                                </FormLabel>
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
                                <FormLabel>Percel weight (gm)</FormLabel>
                                <NumberInput
                                    name="percelWeight"
                                    defaultValue="500"
                                    min={500}
                                    max={20000}
                                    step={500}
                                    focusBorderColor="primary.500"
                                >
                                    <NumberInputField
                                        placeholder="500gm"
                                        prefix="gm"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Delivery area</FormLabel>
                                <SearchableAreaSelect name="deliveryArea" />
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
                                <FormLabel>Percel product price</FormLabel>
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
                                    {parcelProductParentCat?.data.length
                                        ? parcelProductParentCat?.data.map(
                                              (cat) => (
                                                  <option
                                                      key={cat.id}
                                                      value={cat.name}
                                                  >
                                                      {cat.name}
                                                  </option>
                                              ),
                                          )
                                        : null}
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
