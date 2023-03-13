import type { ActionData } from '~/routes/shop-list/index'
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
    Select,
    SimpleGrid,
    Spinner,
} from '@chakra-ui/react'
import { Form, useTransition } from '@remix-run/react'
import { useQuery } from 'react-query'
import type { ProductChildCategories } from '~/types'
import SearchableSelect from '~/components/common/SearchableSelectInput'
import {
    getServiceAreaTree,
    getShopParentCategories,
} from '~/utils/merchant/CSR_API'

function AddShopDrawer({
    onClose,
    isOpen,
    actionData,
    access_token,
}: {
    onClose: () => void
    isOpen: boolean
    actionData: ActionData | undefined
    access_token: string
}) {
    const formRef = React.useRef<HTMLFormElement>(null)
    const firstField = React.useRef<HTMLInputElement>(null)
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') === 'addShop'

    React.useEffect(() => {
        // Clear form data on success and close drawer
        if (actionData?.formSuccess?.message.length) {
            formRef.current?.reset()
            onClose()
        }
    }, [actionData, onClose])

    // Product categories state
    const [productChildCat, setProductChildCat] =
        React.useState<ProductChildCategories>()

    const { data: productParentCategories } = useQuery({
        queryKey: 'shopProductParentCat',
        queryFn: () => getShopParentCategories(access_token),
    })

    const handleProductChildCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCat = productParentCategories?.data.find(
            (cat) => cat.name === e.target.value,
        )
        setProductChildCat({
            data: selectedCat?.childs,
        })
    }

    // Service area
    const { data: serviceArea, isLoading } = useQuery({
        queryKey: 'serviceArea',
        queryFn: () => getServiceAreaTree(access_token),
    })

    const pickupAreaOptions = [] as { label: string; value: string }[]

    if (!isLoading) {
        serviceArea?.data?.divisions.forEach((div) => {
            div?.districts?.forEach((dis) => {
                dis?.areas?.forEach((area) => {
                    pickupAreaOptions.push({
                        label: div.name + ' - ' + dis.name + ' - ' + area.name,
                        value: div.name + ' - ' + dis.name + ' - ' + area.name,
                    })
                })
            })
        })
    }

    return (
        <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <Form method="post" ref={formRef}>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Add new shop
                    </DrawerHeader>

                    <DrawerBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4">
                            <FormControl isRequired>
                                <FormLabel>Shop name</FormLabel>
                                <Input
                                    type="text"
                                    name="shopName"
                                    focusBorderColor="primary.500"
                                    ref={firstField}
                                    placeholder="Shop name"
                                />
                            </FormControl>

                            <FormControl
                                isInvalid={
                                    actionData?.fieldErrors?.shopEmail?.length
                                        ? true
                                        : false
                                }
                                isRequired
                            >
                                <FormLabel>Shop email</FormLabel>
                                <Input
                                    type="email"
                                    name="shopEmail"
                                    placeholder="Email address"
                                    focusBorderColor="primary.500"
                                    defaultValue={actionData?.fields?.shopEmail}
                                    aria-errormessage={
                                        actionData?.fieldErrors?.shopEmail
                                            ? 'email-error'
                                            : undefined
                                    }
                                />
                                <FormErrorMessage>
                                    {actionData?.fieldErrors?.shopEmail ? (
                                        <>{actionData.fieldErrors.shopEmail}</>
                                    ) : null}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Shop address</FormLabel>
                                <Input
                                    type="text"
                                    name="shopAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Shop address"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup address</FormLabel>
                                <Input
                                    type="text"
                                    name="pickupAddress"
                                    focusBorderColor="primary.500"
                                    placeholder="Pickup address"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Pickup area</FormLabel>
                                <SearchableSelect options={pickupAreaOptions} />
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
                            <FormControl isRequired>
                                <FormLabel>Product Type</FormLabel>
                                <Select
                                    placeholder="Choose product type"
                                    name="productType"
                                    focusBorderColor="primary.500"
                                    onChange={handleProductChildCat}
                                >
                                    {productParentCategories?.data.length
                                        ? productParentCategories?.data.map(
                                              (cat) => {
                                                  return (
                                                      <option
                                                          value={cat.name}
                                                          key={cat.id}
                                                      >
                                                          {cat.name}
                                                      </option>
                                                  )
                                              },
                                          )
                                        : null}
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Product Sub Category Type</FormLabel>
                                <Select
                                    placeholder="Choose sub Category type"
                                    name="subProductType"
                                    focusBorderColor="primary.500"
                                    defaultValue="history"
                                >
                                    {productChildCat?.data?.length
                                        ? productChildCat?.data.map((cat) => {
                                              return (
                                                  <option
                                                      value={cat.name}
                                                      key={cat.id}
                                                  >
                                                      {cat.name}
                                                  </option>
                                              )
                                          })
                                        : null}
                                </Select>
                            </FormControl>
                        </SimpleGrid>

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
                            value="addShop"
                        >
                            {isSubmitting ? <Spinner /> : 'Save'}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Form>
        </Drawer>
    )
}

export default AddShopDrawer
