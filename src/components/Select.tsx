import { SelectProps } from "@radix-ui/react-select";

import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { SelectGroupContent, SelectGroupItem } from "@/types";

interface Props extends SelectProps {
  content: (SelectGroupContent | SelectGroupItem)[];
  buttonSize?: number;
  contentSize?: number;
}

export default function Select({
  content,
  buttonSize,
  contentSize,
  ...props
}: Props) {
  const hasContentGroups = content.length && "groupKey" in content[0];

  return (
    <UISelect {...props}>
      <SelectTrigger style={{ width: `${buttonSize}px` }}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent style={{ width: `${contentSize}px` }}>
        {hasContentGroups
          ? (content as SelectGroupContent[]).map(
              ({ groupKey, groupItems }) => (
                <SelectGroup key={groupKey}>
                  {groupItems.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )
            )
          : (content as SelectGroupItem[]).map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
      </SelectContent>
    </UISelect>
  );
}
