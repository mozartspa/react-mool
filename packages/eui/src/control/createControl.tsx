import React from "react"
import { ControlContextValue, useControlContext } from "./controlContext"

export function createControl<TInputProps, TValueProps>(
  InputComp: React.ComponentType<TInputProps>,
  ValueComp: React.ComponentType<TValueProps>,
  options: {
    defaultInputProps?: Partial<TInputProps>
    defaultValueProps?: Partial<TValueProps>
  } = {}
) {
  type MoreProps = {
    mode?: ControlContextValue
    inputProps?: Partial<TInputProps>
    valueProps?: Partial<TValueProps>
  }

  const ControlComp = (props: TInputProps & TValueProps & MoreProps) => {
    const controlContext = useControlContext()

    const { inputProps, valueProps, mode = controlContext, ...commonProps } = props

    if (mode === "input") {
      return (
        <InputComp
          {...options.defaultInputProps}
          {...commonProps}
          {...(inputProps as TInputProps)}
        />
      )
    } else {
      return (
        <ValueComp
          {...options.defaultValueProps}
          {...commonProps}
          {...(valueProps as TValueProps)}
        />
      )
    }
  }

  return ControlComp
}
