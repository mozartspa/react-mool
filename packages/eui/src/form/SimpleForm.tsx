import { FormConfig } from "@mozartspa/mobx-form"
import { observer } from "mobx-react-lite"
import { ReactNode } from "react"

export type SimpleFormProps = Omit<FormConfig, "onSubmit"> & {
  children: ReactNode
}

export const SimpleForm = observer(() => {
  return null
})
