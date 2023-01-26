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
  | "utcOffset"
  | "weekLabel"
  | "yearDropdownItemNumber"
>

export type DateInputProps = InputProps & DatePickerProps

export const DateInput = (props: DateInputProps) => {
  const locale = useLocale()

  return (
    <Input {...props}>
      {(field, inputProps) => {
        const selected = moment(field.value)
        return (
          <EuiDatePicker
            {...inputProps}
            fullWidth={props.fullWidth}
            selected={selected.isValid() ? selected : null}
            onChange={(value) => field.setValue(value?.format())}
            onBlur={() => field.setTouched(true)}
            onClear={() => field.setValue(null)}
            locale={inputProps.locale ?? locale}
          />
        )
      }}
    </Input>
  )
}
