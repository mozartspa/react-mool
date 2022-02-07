import {
  CheckboxGroupInput,
  CheckboxInput,
  ComboBoxInput,
  ComboBoxResourceInput,
  ComboBoxResourceInputProps,
  DateInput,
  NumberInput,
  PasswordInput,
  RadioGroupInput,
  SelectInput,
  SelectResourceInput,
  SelectResourceInputProps,
  TextAreaInput,
  TextInput,
} from "../input"
import {
  CheckboxGroupValue,
  CheckboxValue,
  ComboBoxResourceValue,
  ComboBoxResourceValueProps,
  ComboBoxValue,
  DateValue,
  NumberValue,
  RadioGroupValue,
  SelectResourceValue,
  SelectResourceValueProps,
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

export const SelectResourceControl = createControl<
  SelectResourceInputProps<any, any>,
  SelectResourceValueProps<any>
>(SelectResourceInput, SelectResourceValue)

export const ComboBoxControl = createControl(ComboBoxInput, ComboBoxValue)

export const ComboBoxResourceControl = createControl<
  ComboBoxResourceInputProps<any, any>,
  ComboBoxResourceValueProps<any>
>(ComboBoxResourceInput, ComboBoxResourceValue)

export const CheckboxControl = createControl(CheckboxInput, CheckboxValue)

export const CheckboxGroupControl = createControl(CheckboxGroupInput, CheckboxGroupValue)

export const RadioGroupControl = createControl(RadioGroupInput, RadioGroupValue)

export const DateControl = createControl(DateInput, DateValue)
