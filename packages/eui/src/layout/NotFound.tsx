import { EuiButtonEmpty, EuiEmptyPrompt, EuiFlexGroup, EuiFlexItem } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { t } from "../i18n"

function goBack() {
  window.history.go(-1)
}

export const NotFound = () => {
  const translate = useTranslate()

  return (
    <EuiFlexGroup alignItems="center" className="eui-fullHeight">
      <EuiFlexItem>
        <EuiEmptyPrompt
          iconType="faceSad"
          title={<h2>{translate(t.eui.error.notfound_title)}</h2>}
          body={
            <>
              <p>{translate(t.eui.error.notfound_message)}</p>
              <p>
                <EuiButtonEmpty onClick={goBack}>
                  {translate(t.eui.action.goBack)}
                </EuiButtonEmpty>
              </p>
            </>
          }
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
