import {
  RedirectToOptions,
  RedirectToPage,
  useGetRecordId,
  useGetRecordName,
  useLinkProps,
  useRedirectLink,
} from "@react-mool/core"
import { CSSProperties, MouseEventHandler, ReactNode } from "react"

export type RecordLinkTo<TRecord = any> =
  | RedirectToPage
  | { to: RedirectToPage; options?: RedirectToOptions }
  | ((record: TRecord) => string)
  | false

export type RecordLinkProps<TRecord = any> = {
  record: TRecord
  resource?: string
  linkTo: RecordLinkTo<TRecord>
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children?: ReactNode
  lineClamp?: number | boolean
}

export const RecordLink = <TRecord extends any>(props: RecordLinkProps<TRecord>) => {
  const {
    record,
    resource,
    linkTo,
    className,
    onClick,
    children,
    lineClamp = false,
  } = props

  const getId = useGetRecordId(resource)
  const getName = useGetRecordName(resource)
  const linkProps = useLinkProps()
  const redirectLink = useRedirectLink({ resource })

  const content = children ?? getName(record)

  const lineClampStyle: CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: typeof lineClamp === "boolean" ? 1 : lineClamp,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }

  if (!linkTo) {
    return <div style={!!lineClamp ? lineClampStyle : undefined}>{content}</div>
  }

  const anchorProps =
    linkTo instanceof Function
      ? linkProps(linkTo(record))
      : typeof linkTo === "string"
      ? redirectLink(linkTo, { id: getId(record), resource })
      : redirectLink(linkTo.to, { id: getId(record), resource, ...linkTo.options })

  return (
    <a
      style={!!lineClamp ? lineClampStyle : undefined}
      {...anchorProps}
      onClick={onClick ?? anchorProps.onClick}
      className={className}
    >
      {content}
    </a>
  )
}
