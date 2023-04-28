import React from 'react'
import AdminLayout from '~/components/admin/AdminLayout'
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
    Form,
    useActionData,
    useLoaderData,
    useTransition,
} from '@remix-run/react'
import { badRequest, validateEmail, validatePassword } from '~/utils'
import { requireAdminUserId } from '~/utils/session.server'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Select,
} from '@chakra-ui/react'
import SearchableAreaSelect from '~/components/common/SearchableAreaSelect'
import { getUserRoles } from '~/utils/admin/roles'
import type { ApiErrorResponse, FieldPackageHandler, UserRole } from '~/types'
import {
    getFieldPackageHandlerById,
    updateFieldPackageHandler,
} from '~/utils/admin/fieldPackageHandlers'

export type ActionData = {
    formError?: string
    formSuccess?: {
        message: string
    }
    fieldErrors?: {
        email?: string | undefined
        password?: string | undefined
    }
    fields?: {
        name?: string
        email?: string
        phone?: string
        password?: string
        address?: string
        areaId?: number
        roleId?: number
    }
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    const name = form.get('name')
    const email = form.get('email')
    const phone = form.get('phone')
    const password = form.get('password')
    const address = form.get('address')
    const areaId = form.get('areaId')
    const roleId = form.get('roleId')

    // const files = form.get("files")
    if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof phone !== 'string' ||
        typeof password !== 'string' ||
        typeof address !== 'string' ||
        typeof areaId !== 'string' ||
        typeof roleId !== 'string'
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        name,
        email,
        phone,
        password,
        address,
        areaId,
        roleId,
    }
    const fieldErrors = {
        email: validateEmail(email),
        password: validatePassword(password),
    }

    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdPackageHandler = await updateFieldPackageHandler(
            request,
            params.handlerId,
            {
                name,
                email,
                phone,
                password,
                address,
                areaId: Number(areaId),
                roleId: Number(roleId),
            },
        )
        return redirect(`/admin/package-handlers/list`)
    } catch (error) {
        return badRequest({
            formError: error,
        })
    }
}

type LoaderData = {
    error?: string
    fieldPackageHandler: FieldPackageHandler | null
    userRoles: { data: UserRole[] } | null
}

export const loader: LoaderFunction = async ({ params, request }) => {
    await requireAdminUserId(request)
    const fieldPackageHandler = await getFieldPackageHandlerById(
        request,
        params.handlerId,
    )
    if (
        fieldPackageHandler &&
        (fieldPackageHandler as ApiErrorResponse).message
    ) {
        return {
            error: (fieldPackageHandler as ApiErrorResponse).message,
            fieldPackageHandler: null,
        } as LoaderData
    } else if (!fieldPackageHandler) {
        return {
            error: 'Something went wrong',
            fieldPackageHandler: null,
        } as LoaderData
    }

    const userRoles = await getUserRoles(request)
    if (userRoles && (userRoles as ApiErrorResponse).message) {
        return {
            error: (userRoles as ApiErrorResponse).message,
            userRoles: null,
        } as LoaderData
    } else if (!userRoles) {
        return {
            error: 'Something went wrong',
            userRoles: null,
        } as LoaderData
    }

    return { fieldPackageHandler, userRoles }
}

export const meta: MetaFunction = ({
    data,
}: {
    data: LoaderData | undefined
}) => {
    if (!data) {
        return {
            title: 'Wrong path',
        }
    }
    return {
        title: `${data.fieldPackageHandler?.User.name}`,
    }
}

function SingleFieldPackageHandler() {
    const { fieldPackageHandler, userRoles } = useLoaderData<LoaderData>()
    const actionData = useActionData<ActionData>()
    const transition = useTransition()
    const isSubmitting =
        transition.state === 'submitting' &&
        transition.submission?.formData.get('_action') ===
            'updatePackageHandler'

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const defaultArea = {
        label: `${fieldPackageHandler?.area?.district?.division?.name} - ${fieldPackageHandler?.area?.district?.name} - ${fieldPackageHandler?.area?.name}`,
        value: fieldPackageHandler?.areaId.toString()!,
    }
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Modify {fieldPackageHandler?.User.name}'s information
                    </h2>

                    <Box id="form-error-message" mb="5">
                        {actionData?.formError ? (
                            <Alert status="error" variant="left-accent">
                                <AlertIcon />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    {actionData.formError}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                    </Box>
                    <Form method="post" className="flex flex-col gap-5">
                        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        fieldPackageHandler?.User.name
                                    }
                                />
                            </FormControl>

                            <FormControl
                                isInvalid={
                                    actionData?.fieldErrors?.email?.length
                                        ? true
                                        : false
                                }
                                isRequired
                                mb="4"
                            >
                                <FormLabel className="dark:text-white">
                                    Email
                                </FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        fieldPackageHandler?.User.email
                                    }
                                    aria-errormessage={
                                        actionData?.fieldErrors?.email
                                            ? 'email-error'
                                            : undefined
                                    }
                                />
                                <FormErrorMessage>
                                    {actionData?.fieldErrors?.email ? (
                                        <>{actionData.fieldErrors.email}</>
                                    ) : null}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Phone
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        fieldPackageHandler?.User.phone
                                    }
                                />
                            </FormControl>

                            <FormControl
                                isInvalid={
                                    actionData?.fieldErrors?.password?.length
                                        ? true
                                        : false
                                }
                                isRequired
                                mb="4"
                            >
                                <FormLabel className="dark:text-white">
                                    Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter password"
                                        focusBorderColor="primary.500"
                                        aria-invalid={
                                            Boolean(
                                                actionData?.fieldErrors
                                                    ?.password,
                                            ) || undefined
                                        }
                                        aria-errormessage={
                                            actionData?.fieldErrors?.password
                                                ? 'password-error'
                                                : undefined
                                        }
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleClick}
                                            variant="outline"
                                            fontWeight="normal"
                                        >
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {actionData?.fieldErrors?.password ? (
                                        <>{actionData.fieldErrors.password}</>
                                    ) : null}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel className="dark:text-white">
                                    Address
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={fieldPackageHandler?.address}
                                />
                            </FormControl>
                            <FormControl isRequired mb="4">
                                <FormLabel>Area</FormLabel>
                                <SearchableAreaSelect
                                    name="areaId"
                                    defaultValue={defaultArea}
                                />
                            </FormControl>

                            <FormControl isRequired mb="4">
                                <FormLabel>Role</FormLabel>
                                <Select
                                    name="roleId"
                                    placeholder="Select role"
                                    focusBorderColor="primary.500"
                                    className="dark:text-white"
                                    defaultValue={
                                        fieldPackageHandler?.User?.roles[0]
                                            ?.role?.id
                                    }
                                >
                                    {userRoles?.data.length
                                        ? userRoles?.data?.map((role) => (
                                              <option
                                                  key={role.id}
                                                  value={role.id}
                                              >
                                                  {role.name}
                                              </option>
                                          ))
                                        : null}
                                </Select>
                            </FormControl>
                        </div>

                        <Button
                            type="submit"
                            name="_action"
                            value="updatePackageHandler"
                            colorScheme="purple"
                            isLoading={isSubmitting}
                            alignSelf="flex-start"
                            mb="4"
                        >
                            Update
                        </Button>
                    </Form>
                </div>
            </main>
        </AdminLayout>
    )
}

export default SingleFieldPackageHandler

// export function ErrorBoundary() {
//     const { handlerId } = useParams()
//     return (
//         <div className="error-container">{`Something is wrong to load ${handlerId} this ID's field package handler. Sorry.`}</div>
//     )
// }
