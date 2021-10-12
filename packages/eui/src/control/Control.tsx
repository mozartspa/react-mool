import { useCrudMode } from "@react-mool/core"
import { ReactElement } from "react"

export type ControlProps = {
  input: ReactElement | null
  value: ReactElement | null
}

export const Control = (props: ControlProps) => {
  const { input, value } = props

  const mode = useCrudMode()

  if (mode === "create" || mode === "edit") {
    return input
  } else {
    return value
  }
}
