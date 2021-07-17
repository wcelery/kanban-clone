import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@chakra-ui/react";

export default function Tip({ referTo }) {
  return (
    <Box>
      Dont have account yet?{" "}
      <Link as={RouterLink} to={`/${referTo}`} color="green.500">
        {referTo} here!
      </Link>
    </Box>
  );
}
