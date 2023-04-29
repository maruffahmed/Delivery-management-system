import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import {
    Heading,
    SimpleGrid,
    Text,
    Button,
    Editable,
    EditablePreview,
    EditableInput,
    Center,
} from '@chakra-ui/react'
import { Form } from '@remix-run/react'
import { requireUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => ({
    title: 'Payment method - Settings',
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function PaymentMethodSettings() {
    return (
        <>
            <Heading as="h4" fontSize="2xl" pb="6" display="inline-block">
                Manage your payment method.
            </Heading>
            <Text>Update your bkash account to receive payment from DPDMS</Text>
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
        </>
    )
}

export default PaymentMethodSettings
