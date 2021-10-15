import {
  RedirectToOptions,
  RedirectToPage,
  useGetRecordId,
  useGetRecordName,
  useLinkProps,
  useRedirectLink,
} from "@react-mool/core"
import { MouseEventHandler, ReactNode } from "react"

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
}

export const RecordLink = <TRecord extends any>(props: RecordLinkProps<TRecord>) => {
  const { record, resource, linkTo, className, onClick, children } = props

  const getId = useGetRecordId(resource)
  const getName = useGetRecordName(resource)
  const linkProps = useLinkProps()
  const redirectLink = useRedirectLink({ resource })

  const content = children ?? getName(record)

  if (!linkTo) {
    return <>{content}</>
  }

  const anchorProps =
    linkTo instanceof Function
      ? linkProps(linkTo(record))
      : typeof linkTo === "string"
      ? redirectLink(linkTo, { id: getId(record), resource })
      : redirectLink(linkTo.to, { id: getId(record), resource, ...linkTo.options })

  return (
    <a {...anchorProps} className={className} onClick={onClick}>
      {content}
    </a>
  )
}
