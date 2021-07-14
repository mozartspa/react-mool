import { Form, FormErrors } from "@mozartspa/mobx-form"
import { GetListParams, RecordID } from "../dataProvider"

export type SaveSuccessHandler<TRecord = any, TUpdate = TRecord> = (
  arg: {
    id: RecordID
    record: TRecord
    form: Form<TUpdate>
  },
  defaultHandler: () => Promise<void>
) => Promise<void> | void

export type SaveErrorHandler<TRecord = any, TUpdate = TRecord> = (
  arg: {
    id?: RecordID
    record?: TRecord
    form: Form<TUpdate>
    error: any
  },
  defaultHandler: () => Promise<void>
) => Promise<FormErrors | void> | FormErrors | void

export type LoadSuccessHandler<TRecord = any> = (arg: {
  id: RecordID
  record: TRecord
}) => void

export type LoadErrorHandler = (
  arg: {
    id: RecordID
    error: any
  },
  defaultHandler: () => void
) => void

export type LoadListSuccessHandler<TRecord = any> = (arg: {
  items: TRecord[]
  total: number
}) => void

export type LoadListErrorHandler<TFilter = any> = (
  arg: {
    error: any
    listParams: GetListParams<TFilter>
  },
  defaultHandler: () => void
) => void
