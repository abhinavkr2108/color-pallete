import {
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ColorCard from "./components/ColorCard";

type Color = {
  color: string;
  value: string;
};

export default function Search() {
  // Required state variables
  const [colors, setColors] = useState<Color[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Color[]>([]);

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    // Filter colors based on search term
    const filtered = colors.filter((color) =>
      color.color.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filtered);
  }, [colors, search]);

  const fetchColors = async () => {
    const response = await axios.get("/constants/colors.json");
    setColors(response.data);
  };

  return (
    <div className="pt-12">
      <Flex w={"100%"} justifyContent={"center"}>
        <InputGroup w={{ base: "80%", md: "50%", lg: "25%" }}>
          <InputLeftElement
            pointerEvents="none"
            color={"gray.500"}
            fontWeight={600}
            fontSize={"lg"}
          >
            <CiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Container maxW={"6xl"} py={8}>
        {searchResults.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={8}
          >
            {searchResults.map((color) => (
              <ColorCard hex={color.value} color={color.color} />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontWeight={600} fontSize={"lg"} textAlign={"center"}>
            No results found
          </Text>
        )}
      </Container>
    </div>
  );
}
