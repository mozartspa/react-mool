import {
  CheckboxGroupInput,
  CheckboxInput,
  ComboBoxInput,
  ComboBoxResourceInput,
  NumberInput,
  PasswordInput,
  SelectInput,
  SelectResourceInput,
  TextAreaInput,
  TextInput,
} from "../input"
import {
  CheckboxGroupValue,
  CheckboxValue,
  ComboBoxResourceValue,
  ComboBoxValue,
  NumberValue,
  SelectResourceValue,
  SelectValue,
  TextAreaValue,
  TextValue,
} from "../value"
import { createControl } from "./createControl"

export const TextControl = createControl(TextInput, TextValue)

export const TextAreaControl = createControl(TextAreaInput, TextAreaValue)

export const NumberControl = createControl(NumberInput, NumberValue)

export const PasswordControl = createControl(PasswordInput, TextValue)

export const SelectControl = createControl(SelectInput, SelectValue)

export const SelectResourceControl = createControl(
  SelectResourceInput,
  SelectResourceValue
)

export const ComboBoxControl = createControl(ComboBoxInput, ComboBoxValue)

export const ComboBoxResourceControl = createControl(
  ComboBoxResourceInput,
  ComboBoxResourceValue
)

export const CheckboxControl = createControl(CheckboxInput, CheckboxValue)

export const CheckboxGroupControl = createControl(CheckboxGroupInput, CheckboxGroupValue)
