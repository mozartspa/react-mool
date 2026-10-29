import {
  EuiButton,
  EuiButtonProps,
  EuiEmptyPrompt,
  EuiEmptyPromptProps,
} from "@elastic/eui"
import { useListContext, useTranslate } from "@react-mool/core"
import { t } from "../../i18n"

export type ResetFiltersButtonProps = Omit<EuiButtonProps, "onClick">

/**
 * Button that resets the filters of the current list.
 */
export const ResetFiltersButton = (props: ResetFiltersButtonProps) => {
  const { children, ...buttonProps } = props
  const { resetFilters } = useListContext()
  const translate = useTranslate()

  return (
    <EuiButton {...buttonProps} onClick={resetFilters}>
      {children ?? translate(t.eui.filter.reset_filters)}
    </EuiButton>
  )
}

export type DatagridNoResultsProps = EuiEmptyPromptProps

/**
 * Message shown by the Datagrid when there are no items because of the filters set.
 * Every prop can be overridden, eg. to change the texts or the actions.
 */
export const DatagridNoResults = (props: DatagridNoResultsProps) => {
  const translate = useTranslate()

  return (
    <EuiEmptyPrompt
      iconType="search"
      title={<h2>{translate(t.eui.grid.no_results_title)}</h2>}
      body={<p>{translate(t.eui.grid.no_results_body)}</p>}
      actions={<ResetFiltersButton />}
      {...props}
    />
  )
}
