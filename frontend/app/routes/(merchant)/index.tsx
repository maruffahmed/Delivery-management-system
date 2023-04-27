import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import Layout from '~/components/Layout'
import { getUserId } from '~/utils/session.server'

export const meta: MetaFunction = () => {
    return {
        title: 'Home',
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request)
    if (userId) {
        return redirect('/dashboard')
    }
    return null
}

function Home() {
    return (
        <>
            <Layout>
                <Box
                    bgImage="url(/img/delivery.jpg)"
                    bgPos="bottom"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    minH="600px"
                    h="600px"
                    pos="relative"
                >
                    <Box
                        pos="absolute"
                        inset="0"
                        bgColor="blackAlpha.700"
                        zIndex="0"
                    ></Box>
                    <Container
                        maxW="container.xl"
                        pos="relative"
                        zIndex="10"
                        h="100%"
                    >
                        <Flex alignItems="center" h="100%">
                            <Box>
                                <Heading color="white" lineHeight="base">
                                    দেশজুড়ে দ্রুততম ডেলিভারি <br /> সেবা পেতে
                                    MADX <br /> কুরিয়ারের সাথে থাকুন!
                                </Heading>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
                <Box bgColor="black" py="8">
                    <Container
                        maxW="container.xl"
                        pos="relative"
                        zIndex="10"
                        h="100%"
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Text color="white" lineHeight="base">
                                    আমাদের অনলাইন ট্র্যাকিং সার্ভিস দিয়ে
                                    কুরিয়ার ট্র্যাক করুন
                                </Text>
                            </Box>
                            <Box>
                                <Form method="get" action="/parcel-tracking">
                                    <Flex>
                                        <Input
                                            type="text"
                                            name="parcelNumber"
                                            placeholder="Parcel Number"
                                            roundedRight="none"
                                            bgColor="white"
                                            size="lg"
                                            required
                                        />
                                        <Button
                                            type="submit"
                                            name="_action"
                                            value="track"
                                            colorScheme="primary"
                                            roundedLeft="none"
                                            size="lg"
                                        >
                                            Track
                                        </Button>
                                    </Flex>
                                </Form>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default Home
