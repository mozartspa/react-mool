import { EuiDatePicker, EuiDatePickerProps } from "@elastic/eui"
import { useLocale } from "@react-mool/core"
import moment from "moment"
import { Input, InputProps } from "./Input"

type DatePickerProps = Pick<
  EuiDatePickerProps,
  | "className"
  | "aria-label"
  | "dayClassName"
  | "inputRef"
  | "isLoading"
  | "openToDate"
  | "placeholder"
  | "shadow"
  | "showIcon"
  | "iconType"
  | "popoverPlacement"
  | "title"
  | "autoFocus"
  | "disabled"
  | "inline"
  | "autoComplete"
  | "readOnly"
  | "adjustDateOnChange"
  | "accessibleMode"
  | "allowSameDay"
  | "calendarClassName"
  | "dateFormat"
  | "dateFormatCalendar"
  | "endDate"
  | "excludeDates"
  | "excludeTimes"
  | "filterDate"
  | "forceShowMonthNavigation"
  | "formatWeekNumber"
  | "highlightDates"
  | "includeDates"
  | "includeTimes"
  | "injectTimes"
  | "locale"
  | "maxDate"
  | "maxTime"
  | "minDate"
  | "minTime"
  | "onClickOutside"
  | "onMonthChange"
  | "onWeekSelect"
  | "onYearChange"
  | "peekNextMonth"
  | "placeholderText"
  | "popperClassName"
  | "preventOpenOnFocus"
  | "scrollableMonthYearDropdown"
  | "scrollableYearDropdown"
  | "selectsEnd"
  | "selectsStart"
  | "shouldCloseOnSelect"
  | "showDisabledMonthNavigation"
  | "showMonthDropdown"
  | "showTimeSelect"
  | "showTimeSelectOnly"
  | "showYearDropdown"
  | "startDate"
  | "startOpen"
  | "strictParsing"
  | "timeFormat"
  | "timeIntervals"
  | "useWeekdaysShort"
  | "weekLabel"
  | "yearDropdownItemNumber"
>

export type DateInputProps = InputProps &
  DatePickerProps & {
    utc?: boolean
    allowClear?: boolean
  }

export const DateInput = (props: DateInputProps) => {
  const locale = useLocale()

  return (
    <Input {...props}>
      {(field, inputProps) => {
        const defaultUtc =
          inputProps.showTimeSelect || inputProps.showTimeSelectOnly ? false : true

        const {
          utc = defaultUtc,
          allowClear: allowClearProp,
          ...datePickerProps
        } = inputProps

        const value = moment(field.value).utc(false)
        const selected = utc ? value : value.local(false)

        const defaultAllowClear =
          datePickerProps.readOnly || datePickerProps.disabled ? false : true
        const allowClear = allowClearProp ?? defaultAllowClear

        return (
          <EuiDatePicker
            {...datePickerProps}
            fullWidth={props.fullWidth}
            selected={selected.isValid() ? selected : null}
            onChange={(value) => {
              const next = utc ? value : value?.local(true)
              field.setValue(next?.format())
            }}
            onBlur={() => field.setTouched(true)}
            onClear={allowClear ? () => field.setValue(null) : undefined}
            locale={inputProps.locale ?? locale}
            utcOffset={utc ? 0 : undefined}
          />
        )
      }}
    </Input>
  )
}
