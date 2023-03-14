import type { PickupPointActionData } from '~/routes/pickup-list'
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
    FormLabel,
    Input,
    Spinner,
    Stack,
} from '@chakra-ui/react'
import { Form, useTransition } from '@remix-run/react'
import SearchableAreaSelect from '~/components/common/SearchableAreaSelect'

function AddPickupPointDrawer({
    onClose,
    isOpen,
    actionData,
}: {
    onClose: () => void
    isOpen: boolean
    actionData: PickupPointActionData | undefined
}) {
    const formRef = React.useRef<HTMLFormElement>(null)
    const firstField = React.useRef<HTMLInputElement>(null)
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'addShopPickup'

    React.useEffect(() => {
        if (actionData?.formSuccess?.message.length) {
            formRef.current?.reset()
            onClose()
        }
    }, [actionData, onClose])
    return (
        <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <Form method="post" ref={formRef}>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Add new shop pickup point
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="4">
                            <FormControl isRequired>
                                <FormLabel>Pickup name</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupName"
                                    focusBorderColor="primary.500"
                                    ref={firstField}
                                    placeholder="Enter pickup name"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Pickup address</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Enter pickup address"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Pickup area</FormLabel>
                                <SearchableAreaSelect name="pickupArea" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup phone</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupPhone"
                                    focusBorderColor="primary.500"
                                    placeholder="Pickup phone"
                                />
                            </FormControl>
                        </Stack>

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
                            value="addShopPickup"
                        >
                            {isSubmitting ? <Spinner /> : 'Save'}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Form>
        </Drawer>
    )
}

export default AddPickupPointDrawer
