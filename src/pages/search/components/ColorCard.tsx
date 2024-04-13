import { Box, Card, Text, useToast } from "@chakra-ui/react";

interface ColorCardProps {
  color: string;
  hex: string;
}
export default function ColorCard({ color, hex }: ColorCardProps) {
  const toast = useToast();

  const handleCopyHexToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      toast({
        title: "Copied",
        description: "Hex code copied to clipboard",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy hex code",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Card
      borderRadius={"lg"}
      bgColor={hex}
      w={200}
      h={200}
      cursor={"pointer"}
      onClick={handleCopyHexToClipboard}
    >
      <Box w={"100%"} h={"100%"} className="flex items-center justify-center">
        <Text fontSize={28} fontWeight={"bold"} color={"white"}>
          {color}
        </Text>
      </Box>
    </Card>
  );
}
