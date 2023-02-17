import type { ReactNode } from 'react'
import {
    Text,
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
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
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

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

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box
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
                            <Stack direction="row" spacing={2}>
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
                                <HStack spacing={8} alignItems={'center'}>
                                    <Box>
                                        <Heading fontWeight="extrabold">
                                            RED
                                            <Text color="red" display="inline">
                                                X
                                            </Text>
                                        </Heading>
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
                                    {Links.map((link) => (
                                        <NavLink key={link}>{link}</NavLink>
                                    ))}
                                    <Button
                                        colorScheme="red"
                                        fontWeight="normal"
                                    >
                                        Create Parcel
                                    </Button>
                                </HStack>
                                <Button
                                    onClick={toggleColorMode}
                                    bg="transparent"
                                >
                                    {colorMode === 'light' ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )}
                                </Button>

                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}
                                    >
                                        <Avatar
                                            size={'sm'}
                                            src={
                                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                            }
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Link 1</MenuItem>
                                        <MenuItem>Link 2</MenuItem>
                                        <MenuDivider />
                                        <MenuItem>Link 3</MenuItem>
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
