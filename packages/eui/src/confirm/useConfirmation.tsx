import { EuiButtonColor, EuiConfirmModal } from "@elastic/eui"
import { useTranslate } from "@react-mool/core"
import { ReactNode, useCallback, useMemo, useState } from "react"
import { confirmable, createConfirmation, type ConfirmDialogProps } from "react-confirm"
import { useFreshRef } from "rooks"
import { t } from "../i18n"

export type ConfirmationOptions = {
  content?: ReactNode
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  defaultFocusedButton?: "confirm" | "cancel"
  buttonColor?: EuiButtonColor
  className?: string
  /**
   * Work to run once the user confirms. The dialog stays open, with the confirm button
   * loading, until it completes. If it throws, the dialog closes and the confirmation
   * promise rejects with the error.
   */
  onConfirm?: () => unknown
}

type DialogProps = {
  message: string | ReactNode
  options: ConfirmationOptions
}

const Dialog = confirmable(({ show, proceed, cancel, message, options }: ConfirmDialogProps<DialogProps, boolean>) => {
  const {
    content,
    buttonColor,
    cancelLabel,
    confirmLabel,
    defaultFocusedButton,
    className,
    onConfirm,
  } = options

  const [isLoading, setLoading] = useState(false)

  const dismiss = useCallback(() => {
    // Can't be dismissed while onConfirm is running
    if (!isLoading) {
      proceed(false)
    }
  }, [proceed, isLoading])

  const confirm = useCallback(async () => {
    if (!onConfirm) {
      proceed(true)
      return
    }
    if (isLoading) {
      return
    }
    setLoading(true)
    try {
      await onConfirm()
      proceed(true)
    } catch (err) {
      cancel(err)
    }
  }, [proceed, cancel, onConfirm, isLoading])

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
      isLoading={isLoading}
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
