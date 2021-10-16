import { EuiIcon, EuiSpacer, EuiTextColor } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { CheckboxGroupOption } from "../input"
import { Value, ValueProps } from "./Value"

export type CheckboxGroupValueProps = ValueProps & {
  options: CheckboxGroupOption[]
}

export const CheckboxGroupValue = (props: CheckboxGroupValueProps) => {
  const { options } = props

  const translate = useTranslate()

  return (
    <Value {...props}>
      {({ value }) => {
        const values = Array.isArray(value) ? value : [value]

        return options.map((opt, i) => {
          const isSelected = values.includes(opt.value)
          const label = translate(opt.label)

          return (
            <div key={i}>
              {isSelected ? (
                <>
                  <EuiIcon type="checkInCircleFilled" color="success" /> {label}
                </>
              ) : (
                <EuiTextColor color="subdued">
                  <EuiIcon type="cross" /> {label}
                </EuiTextColor>
              )}
              <EuiSpacer size="xs" />
            </div>
          )
        })
      }}
    </Value>
  )
}
