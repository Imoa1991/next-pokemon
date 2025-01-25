import { forwardRef } from "react";

import { ButtonProps, Button as UIButton } from "@/components/ui/button";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    return <UIButton {...props} ref={forwardedRef} />;
  }
);

Button.displayName = "Button";

export default Button;
