import { useStorageState } from "@react-mool/core"
import { useMemo } from "react"
import { ColumnSettings } from "./types"

export type UseStoredColumnSettingsResult = {
  columnSettings: ColumnSettings
  setColumnSettings: (columnSettings: ColumnSettings | undefined) => void
}

export function useColumnSettingsStorage(
  key: string,
  storage?: Storage
): UseStoredColumnSettingsResult {
  const [columnSettings, setColumnSettings] = useStorageState<ColumnSettings | undefined>(
    key,
    undefined,
    { storage }
  )

  return useMemo(
    () => ({
      columnSettings: columnSettings ?? {},
      setColumnSettings,
    }),
    [columnSettings, setColumnSettings]
  )
}
