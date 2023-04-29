import type { ReactNode } from 'react'
import {
    Text,
    Box,
    Flex,
    useDisclosure,
    useColorModeValue,
    Stack,
    // useColorMode,
    Heading,
    Container,
    HStack,
    IconButton,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Link,
    Button,
    Icon,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Link as RemixLink } from '@remix-run/react'
import { BsFillTelephoneFill } from 'react-icons/bs'

const Links = ['Dashboard', 'Parcels', 'Payments', 'Coupon']

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}
    >
        {children}
    </Link>
)

export default function Navbar() {
    // const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box
                as="nav"
                bg={useColorModeValue('white', 'gray.900')}
                py={3}
                borderBottom="1px"
                borderColor="gray.200"
            >
                <Container maxW="container.xl">
                    <Flex
                        h={16}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Flex align="center">
                            <Stack
                                direction="row"
                                align="center"
                                spacing={{ md: 0, base: 2 }}
                            >
                                <IconButton
                                    variant="outline"
                                    size={'md'}
                                    icon={
                                        isOpen ? (
                                            <CloseIcon />
                                        ) : (
                                            <HamburgerIcon />
                                        )
                                    }
                                    aria-label={'Open Menu'}
                                    display={{ md: 'none' }}
                                    onClick={isOpen ? onClose : onOpen}
                                />
                                <HStack alignItems={'center'}>
                                    <Box>
                                        <Link
                                            as={RemixLink}
                                            to="/"
                                            fontWeight="extrabold"
                                            fontSize="4xl"
                                            mb="0"
                                            _hover={{ textDecoration: 'unset' }}
                                        >
                                            DPDM
                                            <Text
                                                color="primary.500"
                                                display="inline"
                                            >
                                                S
                                            </Text>
                                        </Link>
                                    </Box>
                                </HStack>
                            </Stack>
                        </Flex>

                        <Flex alignItems={'center'}>
                            <Stack direction={'row'} spacing={7}>
                                <HStack
                                    as={'nav'}
                                    spacing={4}
                                    display={{ base: 'none', md: 'flex' }}
                                    ml="auto"
                                >
                                    <Flex align="center" gap="2">
                                        <Icon
                                            as={BsFillTelephoneFill}
                                            fontSize="2xl"
                                            color="primary.500"
                                        />{' '}
                                        <Text as="span">CALL US</Text>
                                        <Link
                                            href="tel:09610007339"
                                            color="primary.500"
                                            fontWeight="bold"
                                        >
                                            09610007339
                                        </Link>
                                    </Flex>
                                    <Button
                                        colorScheme="primary"
                                        fontWeight="normal"
                                        variant="outline"
                                        px="8"
                                        size="lg"
                                        as={RemixLink}
                                        to="/login"
                                    >
                                        Log in
                                    </Button>
                                </HStack>
                                {/* <Button
                                    onClick={toggleColorMode}
                                    bg="transparent"
                                >
                                    {colorMode === 'light' ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )}
                                </Button> */}
                            </Stack>
                        </Flex>
                    </Flex>
                </Container>
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Box>
                                <Heading fontWeight="extrabold">
                                    RED
                                    <Text color="red" display="inline">
                                        X
                                    </Text>
                                </Heading>
                            </Box>
                        </DrawerHeader>

                        <DrawerBody>
                            <Stack as={'nav'} spacing={4}>
                                {Links.map((link) => (
                                    <NavLink key={link}>{link}</NavLink>
                                ))}
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </>
    )
}
