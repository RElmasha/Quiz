import { Play} from 'lucide-react';

interface viewResultProps {
  onClick: () => void;
}
function ButtonPlay({onClick}: viewResultProps) {
    return (
        <div className="h-7 px-2.5 py-1 bg-[#007aff] rounded-[40px] justify-center items-center gap-[3px] inline-flex" onClick={onClick}>
        <Play className="w-[20px] h-[20px] text-white" />
        <div className="text-white text-[15px] font-normal font-['SF Pro'] leading-tight">Play</div>      
      </div>

      )
}

export default ButtonPlay;