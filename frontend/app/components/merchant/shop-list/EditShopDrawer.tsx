import type { ActionData } from '~/routes/(merchant)/shop-list/index'
import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    SimpleGrid,
    Spinner,
} from '@chakra-ui/react'
import { Form, useTransition } from '@remix-run/react'
import { Link as RemixLink } from '@remix-run/react'
import { useShopProvider } from '~/context/ShopProvider'

function EditShopDrawer({
    onClose,
    isOpen,
    actionData,
}: {
    onClose: () => void
    isOpen: boolean
    actionData: ActionData | undefined
}) {
    const formRef = React.useRef<HTMLFormElement>(null)
    const firstField = React.useRef<HTMLInputElement>(null)
    const { activeShop, chnageActiveShop } = useShopProvider()

    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'editShop'

    React.useEffect(() => {
        if (actionData?.formSuccess?.message.length) {
            chnageActiveShop(actionData?.formSuccess?.shop)
            formRef.current?.reset()
            onClose()
        }
    }, [actionData, onClose, chnageActiveShop])
    return (
        <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <Form method="post" ref={formRef}>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Edit shop
                    </DrawerHeader>

                    <DrawerBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
                            <input
                                type="hidden"
                                name="updateShopId"
                                value={activeShop?.id}
                            />
                            <FormControl isRequired>
                                <FormLabel>Shop name</FormLabel>
                                <Input
                                    type="text"
                                    name="updateShopName"
                                    focusBorderColor="primary.500"
                                    ref={firstField}
                                    placeholder="Shop name"
                                    defaultValue={activeShop?.name}
                                />
                            </FormControl>

                            <FormControl
                                isInvalid={
                                    actionData?.fieldErrors?.updateShopEmail
                                        ?.length
                                        ? true
                                        : false
                                }
                                isRequired
                            >
                                <FormLabel>Shop email</FormLabel>
                                <Input
                                    type="email"
                                    name="updateShopEmail"
                                    placeholder="Email address"
                                    focusBorderColor="primary.500"
                                    defaultValue={
                                        actionData?.fields?.updateShopEmail
                                            ? actionData.fields.updateShopEmail
                                            : activeShop?.email
                                    }
                                    aria-errormessage={
                                        actionData?.fieldErrors?.updateShopEmail
                                            ? 'email-error'
                                            : undefined
                                    }
                                />
                                <FormErrorMessage>
                                    {actionData?.fieldErrors?.updateShopEmail
                                        ? actionData.fieldErrors.updateShopEmail
                                        : null}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Shop address</FormLabel>
                                <Input
                                    type="text"
                                    name="updateShopAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Shop address"
                                    defaultValue={activeShop?.address}
                                />
                            </FormControl>
                        </SimpleGrid>
                        <Alert status="warning" mt="10">
                            <AlertIcon />
                            {/* <AlertTitle>Your browser is outdated!</AlertTitle> */}
                            <AlertDescription>
                                Pickup locations for this shop cannot be edited
                                here Go to{' '}
                                <Link
                                    as={RemixLink}
                                    to="/pickup-list"
                                    color="primary.500"
                                >
                                    Pickup Location
                                </Link>
                            </AlertDescription>
                        </Alert>

                        {actionData?.formError?.length ? (
                            <Alert status="error" mt="4">
                                <AlertIcon />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    {actionData.formError}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={onClose}
                            type="reset"
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="primary"
                            type="submit"
                            name="_action"
                            value="editShop"
                        >
                            {isSubmitting ? <Spinner /> : 'Save'}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Form>
        </Drawer>
    )
}

export default EditShopDrawer
