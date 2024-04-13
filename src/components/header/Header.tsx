import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
  ];
  return (
    <Box
      w={"100vw"}
      h={"50px"}
      bgColor={"gray.200"}
      px={16}
      className="fixed top-0 w-full z-10"
    >
      <Flex alignItems={"center"} h={"100%"}>
        <Box p={4} color={"black"}>
          Color-Pallete
        </Box>
        <Spacer />

        <Box
          px={4}
          color={"black"}
          display={{ base: "none", md: "flex" }}
          flexDirection="row"
          alignItems="center"
        >
          {navItems.map((item) => (
            <Box
              key={item.name}
              className="cursor-pointer flex items-center"
              mr={4}
            >
              <Link to={item.link}>{item.name}</Link>
            </Box>
          ))}
        </Box>
        <Spacer />
        <Link to="/search">
          <Button colorScheme="blue">Search</Button>
        </Link>
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          icon={<GiHamburgerMenu />}
          size="lg"
          aria-label="Menu"
          ml={4}
          display={{ base: "flex", md: "none" }}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Color-Pallete</DrawerHeader>

          <DrawerBody>
            {navItems.map((item) => (
              <List>
                <ListItem key={item.name} onClick={onClose}>
                  <Link to={item.link}>{item.name}</Link>
                </ListItem>
              </List>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Link to="/search">
              <Button colorScheme="blue" onClick={onClose}>
                Search
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
