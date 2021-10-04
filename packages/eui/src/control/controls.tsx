import {
  NumberInput,
  PasswordInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "../input"
import { NumberValue, SelectValue, TextAreaValue, TextValue } from "../value"
import { createControl } from "./createControl"

export const TextControl = createControl(TextInput, TextValue)

export const TextAreaControl = createControl(TextAreaInput, TextAreaValue)

export const NumberControl = createControl(NumberInput, NumberValue)

export const PasswordControl = createControl(PasswordInput, TextValue)

export const SelectControl = createControl(SelectInput, SelectValue)
