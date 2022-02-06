import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  // data is loading
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <NextLink href={"/login"}>
          <Link mr={2} color="white">
            login
          </Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
  } else {
    //user is logged in
    body = (
      <Flex>
        <Box mr={2} color="white">
          {data.me.username}
        </Box>
        <Button
          isLoading={logoutFetching}
          variant={"link"}
          color="white"
          onClick={() => logout()}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="teal" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
