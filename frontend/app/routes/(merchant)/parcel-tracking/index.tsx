import { CheckIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Container,
    Flex,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import moment from 'moment'
import Layout from '~/components/Layout'
import type { ApiErrorResponse, ParcelTimeline } from '~/types'
import { getParcelTimelineByParcelNumber } from '~/utils/merchant/parcels'

export type LoaderData = {
    parcelTimeline: ParcelTimeline | null
    error?: string
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
    const parcelNumber = url.searchParams.get('parcelNumber')
    const parcelTimeline = await getParcelTimelineByParcelNumber(
        request,
        parcelNumber,
    )
    if (parcelTimeline && (parcelTimeline as ApiErrorResponse).message) {
        return {
            error: (parcelTimeline as ApiErrorResponse).message,
            parcelTimeline: null,
        } as LoaderData
    } else if (!parcelTimeline) {
        return {
            error: 'Something is wrong. Please reload the browser.',
            parcelTimeline: null,
        } as LoaderData
    }
    return { parcelTimeline }
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
        title: `Parcel timeline - ${data.parcelTimeline?.parcelNumber}}`,
    }
}

function ParcelTracking() {
    const { parcelTimeline, error } = useLoaderData<LoaderData>()
    return (
        <>
            <Layout>
                <Container maxW="container.xl" py="8">
                    <Heading
                        as="h3"
                        fontSize="3xl"
                        pb="6"
                        borderBottom="4px"
                        borderColor="primary.500"
                        display="inline-block"
                    >
                        Track parcel
                    </Heading>
                    {error ? (
                        <Box mt="12">
                            <Alert status="error">
                                <AlertIcon />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </Box>
                    ) : (
                        <Flex mt="12">
                            {/* Left */}
                            <Box w="70%">
                                <VStack
                                    pos="relative"
                                    alignItems="start"
                                    spacing="12"
                                    _after={{
                                        content: '""',
                                        position: 'absolute',
                                        insetY: '0',
                                        left: '2.5%',
                                        translateX: '-50%',
                                        width: '1px',
                                        bgColor: 'green.500',
                                        zIndex: '0',
                                    }}
                                >
                                    {parcelTimeline?.ParcelTimeline?.length
                                        ? parcelTimeline.ParcelTimeline.map(
                                              (timeline) => (
                                                  <Flex
                                                      gap="4"
                                                      key={timeline.id}
                                                  >
                                                      <Box>
                                                          <Flex
                                                              p="4"
                                                              w="12"
                                                              h="12"
                                                              border="1px"
                                                              borderColor="green.500"
                                                              rounded="full"
                                                              alignItems="center"
                                                              justifyContent="center"
                                                              bgColor="white"
                                                              pos="relative"
                                                              zIndex="10"
                                                          >
                                                              <CheckIcon color="green.500" />
                                                          </Flex>
                                                      </Box>
                                                      <Box>
                                                          <VStack
                                                              spacing="2"
                                                              alignItems="start"
                                                          >
                                                              <Text fontWeight="bold">
                                                                  {
                                                                      timeline.message
                                                                  }
                                                              </Text>
                                                              <Text fontSize="xs">
                                                                  {moment(
                                                                      timeline.createdAt,
                                                                  ).format(
                                                                      'MMMM Do YYYY, h:mm a',
                                                                  )}
                                                              </Text>
                                                          </VStack>
                                                      </Box>
                                                  </Flex>
                                              ),
                                          )
                                        : null}
                                </VStack>
                            </Box>
                            {/* Right */}
                            <Box w="30%" bgColor="blackAlpha.50" p="8">
                                <Heading
                                    as="h4"
                                    fontSize="lg"
                                    pb="6"
                                    borderBottom="4px"
                                    borderColor="primary.500"
                                    display="inline-block"
                                >
                                    Customer and order details
                                </Heading>
                                <VStack spacing="6" alignItems="start" mt="8">
                                    <Box>
                                        <Text>Parcel ID</Text>
                                        <Text fontWeight="bold">
                                            {parcelTimeline?.parcelNumber}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text>Customer Name</Text>
                                        <Text fontWeight="bold">
                                            {parcelTimeline?.customerName}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text>Area</Text>
                                        <Text fontWeight="bold">
                                            {
                                                parcelTimeline
                                                    ?.parcelDeliveryArea?.name
                                            }
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text>Placed At</Text>
                                        <Text fontWeight="bold">
                                            {moment(
                                                parcelTimeline?.createdAt,
                                            ).format('MMMM Do YYYY, h:mm a')}
                                        </Text>
                                    </Box>
                                </VStack>
                            </Box>
                        </Flex>
                    )}
                </Container>
            </Layout>
        </>
    )
}

export default ParcelTracking
