import React from 'react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Box, Container, Heading, Flex } from '@chakra-ui/react'
import Layout from '~/components/Layout'
import { Outlet, useNavigate } from '@remix-run/react'
import { requireUserId } from '~/utils/session.server'
import { NavLink } from '@remix-run/react'

export const meta: MetaFunction = () => ({
    title: 'Settings',
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function Settings() {
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
                    <Box mt="8">
                        <Flex gap="8" overflowX="auto" mb="8">
                            <NavLink
                                to="/settings"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? 'p-5 text-white text-center w-full bg-red-500'
                                        : 'p-5 text-gray-900 text-center w-full bg-white'
                                }
                            >
                                Payment method
                            </NavLink>

                            <NavLink
                                to="/settings/password"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'p-5 text-white text-center w-full bg-red-500'
                                        : 'p-5 text-gray-900 text-center w-full bg-white'
                                }
                            >
                                Password change
                            </NavLink>
                        </Flex>
                    </Box>
                    {/* Render children */}
                    <Outlet />
                </Container>
            </Box>
        </Layout>
    )
}

export default Settings
