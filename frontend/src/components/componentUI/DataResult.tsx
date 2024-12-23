import { Box } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../ui/data-list";

interface DataResultProps {
  course: string;
  subject: string;
  score: number;
  total: number;
}

const DataResult: React.FC<DataResultProps> = ({ course, subject, score, total }) => {
  const stats = [
    { label: "Cours :", value: course },
    { label: "Matière :", value: subject },
    { label: "Résolu en :", value: `${total} questions` },
    { label: "Erreurs :", value: `${total - score}` },
    { label: "Bonnes réponses :", value: `${score}` },
    { label: "Points obtenus :", value: `${score * 10}` }, // Exemple de calcul des points
  ];

  return (
    <Box className="flex flex-col w-[384px] h-[432px] items-start justify-between px-[23px] py-[29px] relative rounded-[30px] border-[5px] border-solid border-variable-collection-color-duplicate shadow-[0px_4px_4px_#00000040]">
      <DataListRoot orientation="horizontal">
        {stats.map((item) => (
          <DataListItem key={item.label} label={item.label} value={item.value} />
        ))}
      </DataListRoot>
    </Box>
  );
};

export default DataResult;
