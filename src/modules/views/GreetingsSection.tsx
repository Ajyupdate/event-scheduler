import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { AddIcon } from "../../../node_modules/@chakra-ui/icons/dist/Add";
import { GetGreetingPeriod } from "../../components/helpers/PeriodOfTheDay";

export interface IGreetingsSection {
  handleOpenAddCard: () => void;
}
export default function GreetingsSection({
  handleOpenAddCard,
}: IGreetingsSection) {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const greetingPeriod = GetGreetingPeriod();
  return (
    <div className="bg-red mt-8">
      <Box px={{ md: 16, base: 6 }}>
        <Flex justify="space-between">
          <Box>
            <Heading
              fontWeight={{ base: 700, md: 600 }}
              fontSize={{ md: "30px", base: "24px" }}
            >
              Good {greetingPeriod}{" "}
              <span className="capitalize">{username}</span>!
            </Heading>

            <Text
              color="gray.500"
              fontWeight={{ base: 300 }}
              fontSize={{ base: "16px", md: "16" }}
            >
              You got some task to do{" "}
            </Text>
          </Box>

          <button
            onClick={handleOpenAddCard}
            className=" hidden md:block bg-blue-700 hover:bg-blue-400 text-white text-xs font-xs py-2 px-4 rounded-lg inline-flex items-center h-8"
          >
            <AddIcon marginRight={2} />
            <span>Create New Task</span>
          </button>
        </Flex>
      </Box>
    </div>
  );
}
