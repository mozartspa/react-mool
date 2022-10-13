import { DefaultItemAction, EuiBasicTableColumn } from "@elastic/eui"
import { ResourceDefinition, UseTranslateResult } from "@react-mool/core"
import get from "dlv"
import { cloneElement, SyntheticEvent } from "react"
import { getFieldLabel } from "../../helpers/useGetFieldLabel"
import { Column, ColumnElement } from "../column"
import { DatagridAction, DatagridRowClick } from "./types"

export function columnHeader(
  col: ColumnElement,
  resource: string,
  translate: UseTranslateResult
) {
  return col.props.header ?? getFieldLabel(resource, col.props.name, translate)
}

export function toEuiColumn(
  col: ColumnElement,
  resource: string,
  translate: UseTranslateResult
): EuiBasicTableColumn<any> {
  const {
    name,
    description,
    width,
    sortable,
    align,
    truncateText,
    isMobileHeader,
    mobileOptions,
    hideForMobile,
    style,
    className,
    footer,
  } = col.props

  return {
    field: name,
    name: columnHeader(col, resource, translate),
    description,
    width,
    sortable: typeof sortable === "string" ? true : sortable,
    align,
    truncateText,
    isMobileHeader,
    mobileOptions: mobileOptions
      ? {
          ...mobileOptions,
          render: (record) => {
            const value = get(record, name)
            return cloneElement(col, {
              ...col.props,
              value,
              record,
              isMobile: true,
            })
          },
        }
      : undefined,
    hideForMobile,
    style,
    className,
    footer,
    render: (value, record) => {
      return cloneElement(col, {
        ...col.props,
        value,
        record,
        isMobile: false,
      })
    },
  }
}

export function toEuiColumn2(col: ColumnElement): EuiBasicTableColumn<any> {
  const {
    name,
    description,
    width,
    sortable,
    align,
    truncateText,
    isMobileHeader,
    mobileOptions,
    hideForMobile,
    style,
    className,
    footer,
  } = col.props

  return {
    field: name,
    name: col.props.header ?? col.props.name,
    description,
    width,
    sortable: typeof sortable === "string" ? true : sortable,
    align,
    truncateText,
    isMobileHeader,
    mobileOptions: mobileOptions
      ? {
          ...mobileOptions,
          render: (record) => {
            const value = get(record, name)
            return cloneElement(col, {
              ...col.props,
              value,
              record,
              isMobile: true,
            })
          },
        }
      : undefined,
    hideForMobile,
    style,
    className,
    footer,
    render: (value, record) => {
      return cloneElement(col, {
        ...col.props,
        value,
        record,
        isMobile: false,
      })
    },
  }
}

export function guessColumns(items: any[]): ColumnElement[] {
  if (items.length === 0) {
    return []
  }

  const item = items[0]

  const render = (value: any) => {
    if (typeof value === "object") {
      return JSON.stringify(value).substring(0, 50)
    } else if (typeof value === "string" && value.length > 50) {
      return value.substring(0, 50)
    } else {
      return value
    }
  }

  return Object.keys(item).map((key) => {
    return <Column name={key} children={render} />
  })
}

export function toEuiAction(action: DatagridAction): DefaultItemAction<any> {
  const { name, run, available, color, description, enabled, icon, isPrimary } = action

  return {
    name,
    description: description ?? typeof name === "string" ? String(name) : "",
    type: "icon",
    icon: (icon ?? "empty") as any,
    color,
    available,
    enabled,
    isPrimary,
    onClick: (item: any) => {
      return run([item])
    },
  }
}

function isOrHasAncestors(
  element: Element,
  predicate: (el: Element) => boolean
): boolean {
  if (predicate(element)) {
    return true
  }

  const parent = element.parentElement

  if (!parent) {
    return false
  } else {
    return isOrHasAncestors(parent, predicate)
  }
}

export function canHandleRowClick(ev?: SyntheticEvent) {
  if (ev && ev.target) {
    const target = ev.target
    if (target instanceof Element) {
      if (
        isOrHasAncestors(target, (el) => {
          // Skip clicks on anchors, inputs and buttons,
          const tagName = el.tagName
          if (tagName === "A" || tagName === "BUTTON" || tagName === "INPUT") {
            return true
          }

          // Skip if click was inside popover
          if (el.classList.contains("euiPopover__panel")) {
            return true
          }

          // Skip if on an action cell
          if (el.classList.contains("euiTableRowCell--hasActions")) {
            return true
          }

          return false
        })
      ) {
        return false
      }
    }
  }

  if (ev && ev.isDefaultPrevented && ev.isDefaultPrevented()) {
    return false
  }

  return true
}

export function getDefaultRowClick(
  rowClick: DatagridRowClick | undefined,
  resourceDefinition: ResourceDefinition
): DatagridRowClick {
  if (rowClick == null) {
    if (resourceDefinition.detail) {
      return "detail"
    } else if (resourceDefinition.edit) {
      return "edit"
    } else {
      return "none"
    }
  } else {
    return rowClick
  }
}

export function getSortField(sortField: string, columns: ColumnElement[] | undefined) {
  const col = columns?.find((o) => o.props.name === sortField)
  if (col && col.props.sortable && typeof col.props.sortable === "string") {
    return col.props.sortable ?? sortField
  } else {
    return sortField
  }
}

export function getEuiSortField(sortField: string, columns: ColumnElement[] | undefined) {
  const col = columns?.find((o) => o.props.sortable === sortField)
  if (col) {
    return col.props.name
  } else {
    return sortField
  }
}

export function getColumnId(column: ColumnElement) {
  return column.props.id ?? column.props.name
}
