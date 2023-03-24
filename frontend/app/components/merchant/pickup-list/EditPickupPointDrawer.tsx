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
    Select,
    Spinner,
    Stack,
} from '@chakra-ui/react'
import { Form, useTransition } from '@remix-run/react'
import { usePickupPoint } from '~/context/PickupPointProvider'
import SearchableAreaSelect from '~/components/common/SearchableAreaSelect'

function EditPickupPointDrawer({
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
        transition.submission?.formData.get('_action') === 'updateShopPickup'

    React.useEffect(() => {
        if (actionData?.formSuccess?.message.length) {
            formRef.current?.reset()
            onClose()
        }
    }, [actionData, onClose])

    const { pickupPoint } = usePickupPoint()

    const defaultArea = {
        label: `${pickupPoint?.area?.district?.division?.name} - ${pickupPoint?.area?.district?.name} - ${pickupPoint?.area?.name}`,
        value: pickupPoint?.areaId.toString()!,
    }

    return (
        <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <Form method="post" ref={formRef}>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Update shop pickup point
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="4">
                            <input
                                type="hidden"
                                name="pickupId"
                                defaultValue={pickupPoint?.id}
                            />
                            <FormControl isRequired>
                                <FormLabel>Pickup name</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupName"
                                    focusBorderColor="primary.500"
                                    ref={firstField}
                                    placeholder="Enter pickup name"
                                    defaultValue={pickupPoint?.name}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Pickup address</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Enter pickup address"
                                    defaultValue={pickupPoint?.address}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Pickup area</FormLabel>
                                <SearchableAreaSelect
                                    name="pickupArea"
                                    defaultValue={defaultArea}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup phone</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupPhone"
                                    focusBorderColor="primary.500"
                                    placeholder="Pickup phone"
                                    defaultValue={pickupPoint?.phone}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup Location Status</FormLabel>
                                <Select
                                    name="pickupStatus"
                                    focusBorderColor="primary.500"
                                >
                                    <option
                                        value="active"
                                        selected={pickupPoint?.isActive}
                                    >
                                        Active
                                    </option>
                                    <option
                                        value="inactive"
                                        selected={!pickupPoint?.isActive}
                                    >
                                        Inactive
                                    </option>
                                </Select>
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
                            value="updateShopPickup"
                        >
                            {isSubmitting ? <Spinner /> : 'Save'}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Form>
        </Drawer>
    )
}

export default EditPickupPointDrawer
