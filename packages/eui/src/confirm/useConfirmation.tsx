import { ButtonColor, EuiConfirmModal } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useCallback, useMemo } from "react"
import { confirmable, createConfirmation } from "react-confirm"
import { useFreshRef } from "rooks"
import { t } from "../i18n"

export type ConfirmationOptions = {
  content?: ReactNode
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  defaultFocusedButton?: "confirm" | "cancel"
  buttonColor?: ButtonColor
  className?: string
}

type DialogProps = {
  show: boolean
  proceed: (value: any) => void
  message: string | ReactNode
  options: ConfirmationOptions
}

const Dialog = confirmable(({ show, proceed, message, options }: DialogProps) => {
  const {
    content,
    buttonColor,
    cancelLabel,
    confirmLabel,
    defaultFocusedButton,
    className,
  } = options

  const dismiss = useCallback(() => proceed(false), [proceed])
  const confirm = useCallback(() => proceed(true), [proceed])

  if (!show) {
    return null
  }

  return (
    <EuiConfirmModal
      title={message}
      onCancel={dismiss}
      onConfirm={confirm}
      cancelButtonText={cancelLabel}
      confirmButtonText={confirmLabel}
      buttonColor={buttonColor}
      defaultFocusedButton={defaultFocusedButton}
      className={className}
    >
      {content}
    </EuiConfirmModal>
  )
})

export function useConfirmation(defaults: ConfirmationOptions = {}) {
  const defaultsRef = useFreshRef(defaults)
  const translate = useTranslate()

  const translateOptions = useCallback(
    (options: ConfirmationOptions) => {
      return {
        ...options,
        cancelLabel: translate(options.cancelLabel),
        confirmLabel: translate(options.confirmLabel),
        content: translate(options.content),
      }
    },
    [translate]
  )

  const confirmation = useMemo(() => {
    const confirm = createConfirmation(Dialog)
    return (message: string | ReactNode, options: ConfirmationOptions = {}) => {
      const opts: ConfirmationOptions = {
        cancelLabel: t.eui.confirm.cancel,
        confirmLabel: t.eui.confirm.ok,
        ...defaultsRef.current,
        ...options,
      }
      return confirm({
        message: translate(message),
        options: translateOptions(opts),
      }).then((result) => Boolean(result))
    }
  }, [defaultsRef, translate, translateOptions])

  return confirmation
}
