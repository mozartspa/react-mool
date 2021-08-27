import { useCrudMode } from "@react-mool/core"
import React from "react"

export function createControl<TInputProps, TValueProps>(
  InputComp: React.ComponentType<TInputProps>,
  ValueComp: React.ComponentType<TValueProps>,
  options: {
    defaultInputProps?: Partial<TInputProps>
    defaultValueProps?: Partial<TValueProps>
  } = {}
) {
  type MoreProps = {
    inputProps?: Partial<TInputProps>
    valueProps?: Partial<TValueProps>
  }

  const ControlComp = (props: TInputProps & TValueProps & MoreProps) => {
    const mode = useCrudMode()

    const { inputProps, valueProps, ...commonProps } = props

    if (mode === "create" || mode === "edit") {
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
