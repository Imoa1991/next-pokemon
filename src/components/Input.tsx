import { Input as UIInput } from "@/components/ui/input";

export function Input({ children, ...props }: React.ComponentProps<"input">) {
  return <UIInput {...props}>{children}</UIInput>;
}
