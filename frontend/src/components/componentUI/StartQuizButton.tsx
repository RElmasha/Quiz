import { Box, IconButton } from "@chakra-ui/react"
import { RotateCcw } from 'lucide-react'

interface StartButtonProps {
  onClick: () => void;
  className?: string;
  colorScheme: string
IsDisabled : boolean
}

export const StartButton: React.FC<StartButtonProps> = ({ onClick, className }) => {
  return (
    <Box 
      as="button"
      onClick={onClick}
      className={`
        relative
        flex
        items-center
        justify-center
        w-[60px]
        h-[60px]
        rounded-2xl
        bg-[#FF5722]
        shadow-lg
        transition-transform
        hover:scale-105
        active:scale-95
        ${className || ''}
      `}
      _hover={{ cursor: 'pointer' }}
    >
      <RotateCcw className="w-8 h-8 text-white" />
    </Box>
  )
}

