import { Fieldset, CheckboxGroup, VStack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "../ui/radio"
import { Checkbox } from "../ui//checkbox";
import { ListProps } from "../../Types/ListProps";

export function CoursePopu () {
  return (
             <Fieldset.Root>
         <CheckboxGroup defaultValue={["Français"]} name="cours">
           <Fieldset.Content>
             <Checkbox value="Français">Français</Checkbox>
             <Checkbox value="Anglais">Anglais</Checkbox>
             <Checkbox value="Latin">Latin</Checkbox>
             <Checkbox value="Didactiaue">Didactiaue</Checkbox>
           </Fieldset.Content>
         </CheckboxGroup>
       </Fieldset.Root>
  )
}

export function CourList(props: ListProps) {
  return (
    <RadioGroup defaultValue={props.value[0].name} name={props.name}>
      <VStack className="flex flex-col gap-2"> {/* VStack remplace HStack */}
        {props.value.map((cours) => (
          <Radio key={cours.index} value={cours.name}>
            {cours.name}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  );
}
