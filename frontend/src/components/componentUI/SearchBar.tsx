import { InputGroup} from "../ui/input-group"
// import { InputRightAddon } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import { Search } from 'lucide-react'


interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  return (
    <InputGroup>
      <Input placeholder={placeholder} bg="gray.100" borderRadius="full" fontSize="xl" h="60px" onChange={(e) => onSearch(e.target.value)}
      />
      {/* <InputRightAddon h="60px" w="60px">
        <Search className="text-teal-500" />
      </InputRightAddon> */}
    </InputGroup>
  )
}

