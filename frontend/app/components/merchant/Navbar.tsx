import type { ReactNode } from 'react'
import {
    Text,
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
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
    MenuGroup,
    Input,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Form, Link as RemixLink } from '@remix-run/react'
import { useShopProvider } from '~/context/ShopProvider'

const Links = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Parcels', href: '/parcel-list' },
    { title: 'Payments', href: '/payments-list' },
]

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
    <Link
        as={RemixLink}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        to={href}
    >
        {children}
    </Link>
)

export default function MerchantNav() {
    const { activeShop, resetShopProvider } = useShopProvider()
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
                                <HStack alignItems={'center'} spacing="4">
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
                                    <Form
                                        method="get"
                                        action="/parcel-tracking"
                                    >
                                        <Flex>
                                            <Input
                                                type="text"
                                                name="parcelNumber"
                                                placeholder="Parcel Number"
                                                roundedRight="none"
                                                bgColor="white"
                                                size="md"
                                                required
                                            />
                                            <Button
                                                type="submit"
                                                name="_action"
                                                value="track"
                                                colorScheme="primary"
                                                roundedLeft="none"
                                                size="md"
                                                px="8"
                                            >
                                                Track
                                            </Button>
                                        </Flex>
                                    </Form>
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
                                    {Links.map((link) => (
                                        <NavLink
                                            key={link.title}
                                            href={link.href}
                                        >
                                            {link.title}
                                        </NavLink>
                                    ))}
                                    <Button
                                        colorScheme="primary"
                                        fontWeight="normal"
                                        as={RemixLink}
                                        to="/create-parcel"
                                    >
                                        Create Parcel
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

                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}
                                    >
                                        {activeShop ? (
                                            <Avatar
                                                size={'sm'}
                                                name={activeShop.name}
                                            />
                                        ) : (
                                            <Avatar size={'sm'} />
                                        )}
                                    </MenuButton>
                                    <MenuList>
                                        <MenuGroup title="Profile">
                                            <MenuItem
                                                _focus={{ bg: 'primary.50' }}
                                                as={RemixLink}
                                                to="/shop-list"
                                            >
                                                My Shops
                                            </MenuItem>
                                            <MenuItem
                                                _focus={{ bg: 'primary.50' }}
                                                as={RemixLink}
                                                to="/pickup-list"
                                            >
                                                Manage Pickup Location
                                            </MenuItem>
                                            <MenuItem
                                                _focus={{ bg: 'primary.50' }}
                                                as={RemixLink}
                                                to="/settings/password"
                                            >
                                                Shop Settings
                                            </MenuItem>
                                        </MenuGroup>

                                        <MenuDivider />
                                        <MenuGroup>
                                            <Link
                                                as={RemixLink}
                                                to="/logout"
                                                _hover={{
                                                    textDecoration: 'unset',
                                                }}
                                                onClick={resetShopProvider}
                                            >
                                                <MenuItem
                                                    _focus={{
                                                        bg: 'primary.50',
                                                    }}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </Link>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>
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
                                    <Text color="primary.500" display="inline">
                                        X
                                    </Text>
                                </Heading>
                            </Box>
                        </DrawerHeader>

                        <DrawerBody>
                            <Stack as={'nav'} spacing={4}>
                                {Links.map((link) => (
                                    <NavLink key={link.title} href={link.href}>
                                        {link.title}
                                    </NavLink>
                                ))}
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </>
    )
}
