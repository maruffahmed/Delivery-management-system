import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import AdminLayout from '~/components/admin/AdminLayout'
import type { ApiErrorResponse, FieldPackageHandlers } from '~/types'
import { getFieldPackageHandlers } from '~/utils/admin/fieldPackageHandlers'
import { requireAdminUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => {
    return {
        title: 'Parcel Requests - Dashboard',
        description: 'Parcel Requests',
    }
}

type LoaderData = {
    error?: string
    fieldPackageHandlers: FieldPackageHandlers | null
}

export const loader: LoaderFunction = async ({ request }) => {
    await requireAdminUserId(request)
    const fieldPackageHandlers = await getFieldPackageHandlers(request)
    if (
        fieldPackageHandlers &&
        (fieldPackageHandlers as ApiErrorResponse).message
    ) {
        return {
            error: (fieldPackageHandlers as ApiErrorResponse).message,
            fieldPackageHandlers: null,
        } as LoaderData
    } else if (!fieldPackageHandlers) {
        return {
            error: 'Something went wrong',
            fieldPackageHandlers: null,
        } as LoaderData
    }
    return { fieldPackageHandlers }
}

function Packagehandlers() {
    const { fieldPackageHandlers } = useLoaderData<LoaderData>()
    return (
        <AdminLayout>
            <main className="h-full overflow-y-auto">
                <div className="container px-5 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Field package handlers
                    </h2>
                    <Table variant="striped">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Phone</Th>
                                <Th>Address</Th>
                                <Th>Role</Th>
                                <Th>Area</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {fieldPackageHandlers?.data.length
                                ? fieldPackageHandlers?.data.map(
                                      (fieldPackageHandler) => (
                                          <Tr key={fieldPackageHandler.id}>
                                              <Td>
                                                  <Link
                                                      to={`/admin/package-handlers/${fieldPackageHandler.id}`}
                                                      className="text-purple-700"
                                                  >
                                                      {' '}
                                                      {
                                                          fieldPackageHandler
                                                              .User.name
                                                      }
                                                  </Link>
                                              </Td>
                                              <Td>
                                                  {
                                                      fieldPackageHandler.User
                                                          .phone
                                                  }
                                              </Td>
                                              <Td>
                                                  {fieldPackageHandler.address}
                                              </Td>
                                              <Td>
                                                  {
                                                      fieldPackageHandler.User
                                                          .roles[0].role.name
                                                  }
                                              </Td>
                                              <Td>
                                                  {
                                                      fieldPackageHandler.area
                                                          .name
                                                  }
                                              </Td>
                                          </Tr>
                                      ),
                                  )
                                : null}
                        </Tbody>
                    </Table>
                </div>
            </main>
        </AdminLayout>
    )
}

export default Packagehandlers
