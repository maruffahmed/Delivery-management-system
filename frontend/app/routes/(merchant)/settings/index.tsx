import React from 'react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Button,
    Editable,
    EditablePreview,
    EditableInput,
    Center,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
} from '@chakra-ui/react'
import Layout from '~/components/Layout'
import { Form } from '@remix-run/react'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
    title: 'Settings',
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function Settings() {
    const [show, setShow] = React.useState(false)
    const handleShowPass = () => setShow(!show)
    return (
        <Layout>
            <Box bg="whitesmoke" minH="100vh">
                <Container maxW="container.xl" py="8">
                    <Heading
                        as="h3"
                        fontSize="3xl"
                        pb="6"
                        borderBottom="4px"
                        borderColor="primary.500"
                        display="inline-block"
                    >
                        Settings
                    </Heading>
                    <Tabs
                        isFitted
                        variant="enclosed-colored"
                        colorScheme="primary"
                        mt="12"
                        defaultIndex={1}
                    >
                        <TabList>
                            <Tab>Payment method</Tab>
                            <Tab>Password change</Tab>
                        </TabList>

                        <TabPanels mt="6">
                            <TabPanel>
                                <Heading
                                    as="h4"
                                    fontSize="2xl"
                                    pb="6"
                                    display="inline-block"
                                >
                                    Manage your payment method.
                                </Heading>
                                <Text>
                                    Update your bkash account to receive payment
                                    from Madx
                                </Text>
                                <Form>
                                    <SimpleGrid
                                        columns={{ sm: 3 }}
                                        gap="4"
                                        border="1px"
                                        borderColor="primary.500"
                                        rounded="md"
                                        mt="8"
                                        p="4"
                                    >
                                        <Center w="full">
                                            <Text>Bkash Number</Text>
                                        </Center>
                                        <Center w="full">
                                            <Editable defaultValue="01789393745">
                                                <EditablePreview />
                                                <EditableInput placeholder="do something" />
                                            </Editable>
                                        </Center>
                                        <Center w="full">
                                            <Button
                                                colorScheme="primary"
                                                type="submit"
                                                isDisabled={true}
                                            >
                                                Update
                                            </Button>
                                        </Center>
                                    </SimpleGrid>
                                </Form>
                            </TabPanel>
                            <TabPanel>
                                <Heading
                                    as="h4"
                                    fontSize="2xl"
                                    pb="6"
                                    display="inline-block"
                                >
                                    Change your password.
                                </Heading>
                                <Form>
                                    {/* Current password input field */}
                                    <SimpleGrid
                                        columns={{ base: 1, md: 2 }}
                                        spacing="4"
                                        my="6"
                                    >
                                        <FormControl
                                            isInvalid={false}
                                            isRequired
                                        >
                                            <FormLabel>
                                                Current password
                                            </FormLabel>
                                            <InputGroup size="md">
                                                <Input
                                                    type={
                                                        show
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    placeholder="Enter password"
                                                    focusBorderColor="primary.500"
                                                    aria-invalid={true}
                                                    aria-errormessage="Something is wrong"
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <Button
                                                        h="1.75rem"
                                                        size="sm"
                                                        onClick={handleShowPass}
                                                        variant="outline"
                                                        fontWeight="normal"
                                                    >
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                Something is wrong
                                            </FormErrorMessage>
                                        </FormControl>
                                    </SimpleGrid>
                                    {/* New password inpu field */}
                                    <SimpleGrid
                                        columns={{ base: 1, md: 2 }}
                                        spacing="4"
                                    >
                                        <FormControl
                                            isInvalid={false}
                                            isRequired
                                        >
                                            <FormLabel>New password</FormLabel>
                                            <InputGroup size="md">
                                                <Input
                                                    type={
                                                        show
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    placeholder="Enter password"
                                                    focusBorderColor="primary.500"
                                                    aria-invalid={true}
                                                    aria-errormessage="Something is wrong"
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <Button
                                                        h="1.75rem"
                                                        size="sm"
                                                        onClick={handleShowPass}
                                                        variant="outline"
                                                        fontWeight="normal"
                                                    >
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                Something is wrong
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl
                                            isInvalid={false}
                                            isRequired
                                        >
                                            <FormLabel>
                                                Confirm new password
                                            </FormLabel>
                                            <InputGroup size="md">
                                                <Input
                                                    type={
                                                        show
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    focusBorderColor="primary.500"
                                                    aria-invalid={true}
                                                    aria-errormessage="Something is wrong"
                                                />
                                                <InputRightElement width="4.5rem">
                                                    <Button
                                                        h="1.75rem"
                                                        size="sm"
                                                        onClick={handleShowPass}
                                                        variant="outline"
                                                        fontWeight="normal"
                                                    >
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                Something is wrong
                                            </FormErrorMessage>
                                        </FormControl>
                                        <Button colorScheme="primary">
                                            Update
                                        </Button>
                                    </SimpleGrid>
                                </Form>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            </Box>
        </Layout>
    )
}

export default Settings
