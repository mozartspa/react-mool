import { EuiButton, EuiButtonProps, EuiFlyout, EuiFlyoutBody } from "@elastic/eui"
import { useGetResourceLabel, useResource, useTranslate } from "@react-mool/core"
import { Create, CreateButtonProps, t } from "@react-mool/eui"
import { useState } from "react"
import { ButtonCreate } from "./ButtonForm"

const initialValues = {
  date: new Date(),
  status: "ordered",
  returned: false,
  total: 0,
}

export const CustomCreateButton = (props: CreateButtonProps) => {
  const { resource: resourceProp, children, asIcon, ...buttonProps } = props
  const [isFlayoutVisible, setIsFlyoutVisible] = useState(false)
  const resource = useResource(resourceProp)
  const getResourceLabel = useGetResourceLabel()
  const translate = useTranslate()

  const label = translate(`resources.${resource}.action.create`, {
    defaultValue: `${translate(t.eui.action.create)} ${getResourceLabel(resource)}`,
  })

  if (!isFlayoutVisible) {
    return (
      <EuiButton
        fill={true}
        iconType="plusInCircleFilled"
        {...(buttonProps as Partial<EuiButtonProps>)}
        onClick={() => setIsFlyoutVisible(true)}
      >
        {label}
      </EuiButton>
    )
  }

  return (
    <Create initialValues={initialValues}>
      <EuiFlyout
        ownFocus
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby={"flyout-id"}
      >
        <EuiFlyoutBody>
          <ButtonCreate />
        </EuiFlyoutBody>
      </EuiFlyout>
    </Create>
  )
}
