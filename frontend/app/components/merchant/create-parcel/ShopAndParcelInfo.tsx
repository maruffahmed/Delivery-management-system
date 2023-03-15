import type { FC } from 'react'
import type { CreateParcelActionData } from '~/routes/create-parcel'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Link,
    Select,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react'

interface ShopAndParcelInfoProps {
    actionData: CreateParcelActionData | undefined
}

const ShopAndParcelInfo: FC<ShopAndParcelInfoProps> = ({ actionData }) => {
    return (
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
                        <option value="book">Uttara Sector - 10</option>
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
            <Box my="5">
                {actionData?.formError ? (
                    <Alert status="error" variant="left-accent">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                            {actionData.formError}
                        </AlertDescription>
                    </Alert>
                ) : null}
                {actionData?.formSuccess?.message ? (
                    <Alert status="success" variant="left-accent">
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            {actionData.formSuccess.message}
                        </AlertDescription>
                    </Alert>
                ) : null}
            </Box>
        </GridItem>
    )
}

export default ShopAndParcelInfo
