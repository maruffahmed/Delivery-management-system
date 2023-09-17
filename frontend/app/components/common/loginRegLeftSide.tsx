import { Box, Heading, Text } from '@chakra-ui/react'

function LoginRegLeftSide({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) {
    return (
        <Box
            className="relative overflow-hidden md:flex w-1/2 justify-around items-center hidden"
            bgGradient="linear(to-r, primary.700, primary.600)"
        >
            <div>
                <Heading className="text-white font-bold text-4xl font-sans">
                    {title}
                </Heading>
                <Text className="text-white mt-1">{subtitle}</Text>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </Box>
    )
}

export default LoginRegLeftSide
