export const euiTokens = {
  euiAccordion: {
    isLoading: "Loading",
  },
  euiBasicTable: {
    noItemsMessage: "No items found",
    tableCaptionWithPagination: "{tableCaption}; Page {page} of {pageCount}.",
    tableAutoCaptionWithPagination:
      "This table contains {itemCount} rows out of {totalItemCount} rows; Page {page} of {pageCount}.",
    tableSimpleAutoCaptionWithPagination:
      "This table contains {itemCount} rows; Page {page} of {pageCount}.",
    tableAutoCaptionWithoutPagination: "This table contains {itemCount} rows.",
    selectAllRows: "Select all rows",
    selectThisRow: "Select this row",
    tablePagination: "Pagination for table: {tableCaption}",
  },
  euiCollapsedItemActions: {
    allActions: "All actions",
  },
  euiBottomBar: {
    screenReaderHeading: "Page level controls",
    customScreenReaderAnnouncement:
      "There is a new region landmark called {landmarkHeading} with page level controls at the end of the document.",
    screenReaderAnnouncement:
      "There is a new region landmark with page level controls at the end of the document.",
  },
  euiBreadcrumb: {
    collapsedBadge: {
      ariaLabel: "See collapsed breadcrumbs",
    },
  },
  euiBreadcrumbs: {
    nav: {
      ariaLabel: "Breadcrumbs",
    },
  },
  euiCardSelect: {
    selected: "Selected",
    unavailable: "Unavailable",
    select: "Select",
  },
  euiCodeBlockCopy: {
    copy: "Copy",
  },
  euiCodeBlockFullScreen: {
    fullscreenCollapse: "Collapse",
    fullscreenExpand: "Expand",
  },
  euiColorPickerSwatch: {
    ariaLabel: "Select {color} as the color",
  },
  euiColorPicker: {
    popoverLabel: "Color selection dialog",
    colorLabel: "Color value",
    colorErrorMessage: "Invalid color value",
    transparent: "Transparent",
    alphaLabel: "Alpha channel (opacity) value",
    openLabel: "Press the escape key to close the popover",
    closeLabel: "Press the down key to open a popover containing color options",
  },
  euiColorStopThumb: {
    buttonAriaLabel:
      "Press the Enter key to modify this stop. Press Escape to focus the group",
    buttonTitle: "Click to edit, drag to reposition",
    screenReaderAnnouncement:
      "A popup with a color stop edit form opened.\n            Tab forward to cycle through form controls or press\n            escape to close this popup.",
    stopLabel: "Stop value",
    stopErrorMessage: "Value is out of range",
    removeLabel: "Remove this stop",
  },
  euiColorStops: {
    screenReaderAnnouncement:
      "{label}: {readOnly} {disabled} Color stop picker. Each stop consists of a number and corresponding color value. Use the Down and Up arrow keys to select individual stops. Press the Enter key to create a new stop.",
  },
  euiHue: {
    label: "Select the HSV color mode 'hue' value",
  },
  euiSaturation: {
    ariaLabel: "HSV color mode saturation and value 2-axis slider",
    screenReaderInstructions:
      "Arrow keys to navigate the square color gradient. Coordinates will be used to calculate HSV color mode 'saturation' and 'value' numbers, in the range of 0 to 1. Left and right to change the saturation. Up and down change the value.",
  },
  euiComboBoxPill: {
    removeSelection: "Remove {children} from selection in this group",
  },
  euiComboBoxOptionsList: {
    loadingOptions: "Loading options",
    delimiterMessage: "Add each item separated by {delimiter}",
    alreadyAdded: "{label} has already been added",
    createCustomOption: "Add {searchValue} as a custom option",
    noMatchingOptions: "{searchValue} doesn't match any options",
    noAvailableOptions: "There aren't any options available",
    allOptionsSelected: "You've selected all available options",
  },
  euiComboBox: {
    listboxAriaLabel: "Choose from the following options",
  },
  euiControlBar: {
    screenReaderHeading: "Page level controls",
    customScreenReaderAnnouncement:
      "There is a new region landmark called {landmarkHeading} with page level controls at the end of the document.",
    screenReaderAnnouncement:
      "There is a new region landmark with page level controls at the end of the document.",
  },
  euiDataGridCellActions: {
    expandButtonTitle: "Click or hit enter to interact with cell content",
  },
  euiDataGridCell: {
    position: "{columnId}, column {col}, row {row}",
  },
  euiColumnActions: {
    hideColumn: "Hide column",
    moveLeft: "Move left",
    moveRight: "Move right",
    sort: "Sort {schemaLabel}",
  },
  euiDataGridHeaderCell: {
    headerActions: "Click to view column header actions",
    sortedByAscendingSingle: "Sorted ascending",
    sortedByDescendingSingle: "Sorted descending",
    sortedByAscendingFirst: "Sorted by {columnId}, ascending",
    sortedByDescendingFirst: "Sorted by {columnId}, descending",
    sortedByAscendingMultiple: ", then sorted by {columnId}, ascending",
    sortedByDescendingMultiple: ", then sorted by {columnId}, descending",
    actionsPopoverScreenReaderText:
      "To navigate through the list of column actions, press the Tab or Up and Down arrow keys.",
  },
  euiColumnSelector: {
    button: "Columns",
    buttonActiveSingular: "{numberOfHiddenFields} column hidden",
    buttonActivePlural: "{numberOfHiddenFields} columns hidden",
    search: "Search",
    searchcolumns: "Search columns",
    selectAll: "Show all",
    hideAll: "Hide all",
  },
  euiColumnSortingDraggable: {
    defaultSortAsc: "A-Z",
    defaultSortDesc: "Z-A",
    dragHandleAriaLabel: "Drag handle",
    activeSortLabel: "{display} is sorting this data grid",
    removeSortLabel: "Remove {display} from data grid sort",
    toggleLegend: "Select sorting method for {display}",
  },
  euiColumnSorting: {
    button: "Sort fields",
    buttonActive:
      "({\n  numberOfSortedFields\n}) => `${numberOfSortedFields} field${numberOfSortedFields === 1 ? '' : 's'} sorted`;",
    emptySorting: "Currently no fields are sorted",
    pickFields: "Pick fields to sort by",
    sortFieldAriaLabel: "Sort by: ",
    clearAll: "Clear sorting",
  },
  euiDisplaySelector: {
    buttonText: "Display options",
    resetButtonText: "Reset to default",
    densityLabel: "Density",
    labelCompact: "Compact",
    labelNormal: "Normal",
    labelExpanded: "Expanded",
    rowHeightLabel: "Row height",
    labelSingle: "Single",
    labelAuto: "Auto fit",
    labelCustom: "Custom",
    lineCountLabel: "Lines per row",
  },
  euiFullscreenSelector: {
    fullscreenButton: "Enter fullscreen",
    fullscreenButtonActive: "Exit fullscreen",
  },
  euiDataGrid: {
    ariaLabel: "{label}; Page {page} of {pageCount}.",
    ariaLabelledBy: "Page {page} of {pageCount}.",
    screenReaderNotice: "Cell contains interactive content.",
  },
  euiDataGridPagination: {
    detailedPaginationLabel: "Pagination for preceding grid: {label}",
    paginationLabel: "Pagination for preceding grid",
  },
  euiDataGridSchema: {
    booleanSortTextAsc: "False-True",
    booleanSortTextDesc: "True-False",
    currencySortTextAsc: "Low-High",
    currencySortTextDesc: "High-Low",
    dateSortTextAsc: "Old-New",
    dateSortTextDesc: "New-Old",
    numberSortTextAsc: "Low-High",
    numberSortTextDesc: "High-Low",
    jsonSortTextAsc: "Small-Large",
    jsonSortTextDesc: "Large-Small",
  },
  euiAutoRefresh: {
    autoRefreshLabel: "Auto refresh",
    buttonLabelOff: "Auto refresh is off",
    buttonLabelOn: "Auto refresh is on and set to {prettyInterval}",
  },
  euiRefreshInterval: {
    fullDescriptionOff: "Refresh is off, interval set to {optionValue} {optionText}.",
    fullDescriptionOn: "Refresh is on, interval set to {optionValue} {optionText}.",
    legend: "Refresh every",
  },
  euiAbsoluteTab: {
    dateFormatError: "Expected format: {dateFormat}",
  },
  euiDatePopoverButton: {
    invalidTitle: "Invalid date: {title}",
    outdatedTitle: "Update needed: {title}",
  },
  euiDatePopoverContent: {
    startDateLabel: "Start date",
    endDateLabel: "End date",
    absoluteTabLabel: "Absolute",
    relativeTabLabel: "Relative",
    nowTabLabel: "Now",
    nowTabContent:
      'Setting the time to "now" means that on every refresh this\n            time will be set to the time of the refresh.',
    nowTabButtonStart: "Set start date and time to now",
    nowTabButtonEnd: "Set end date and time to now",
  },
  euiRelativeTab: {
    numberInputError: "Must be >= 0",
    numberInputLabel: "Time span amount",
    dateInputError: "Must be a valid range",
    unitInputLabel: "Relative time span",
    fullDescription: "The unit is changeable. Currently set to {unit}.",
  },
  euiPrettyDuration: {
    lastDurationSeconds:
      "({\n  duration\n}) => `Last ${duration} second${duration === 1 ? '' : 's'}`;",
    nextDurationSeconds:
      "({\n  duration\n}) => `Next ${duration} second${duration === 1 ? '' : 's'}`;",
    lastDurationMinutes:
      "({\n  duration\n}) => `Last ${duration} minute${duration === 1 ? '' : 's'}`;",
    nextDurationMinutes:
      "({\n  duration\n}) => `Next ${duration} minute${duration === 1 ? '' : 's'}`;",
    lastDurationHours:
      "({\n  duration\n}) => `Last ${duration} hour${duration === 1 ? '' : 's'}`;",
    nextDurationHours:
      "({\n  duration\n}) => `Next ${duration} hour${duration === 1 ? '' : 's'}`;",
    lastDurationDays:
      "({\n  duration\n}) => `Last ${duration} day${duration === 1 ? '' : 's'}`;",
    nexttDurationDays:
      "({\n  duration\n}) => `Next ${duration} day${duration === 1 ? '' : 's'}`;",
    lastDurationWeeks:
      "({\n  duration\n}) => `Last ${duration} week${duration === 1 ? '' : 's'}`;",
    nextDurationWeeks:
      "({\n  duration\n}) => `Next ${duration} week${duration === 1 ? '' : 's'}`;",
    lastDurationMonths:
      "({\n  duration\n}) => `Last ${duration} month${duration === 1 ? '' : 's'}`;",
    nextDurationMonths:
      "({\n  duration\n}) => `Next ${duration} month${duration === 1 ? '' : 's'}`;",
    lastDurationYears:
      "({\n  duration\n}) => `Last ${duration} year${duration === 1 ? '' : 's'}`;",
    nextDurationYears:
      "({\n  duration\n}) => `Next ${duration} year${duration === 1 ? '' : 's'}`;",
    durationRoundedToSecond: "{prettyDuration} rounded to the second",
    durationRoundedToMinute: "{prettyDuration} rounded to the minute",
    durationRoundedToHour: "{prettyDuration} rounded to the hour",
    durationRoundedToDay: "{prettyDuration} rounded to the day",
    durationRoundedToWeek: "{prettyDuration} rounded to the week",
    durationRoundedToMonth: "{prettyDuration} rounded to the month",
    durationRoundedToYear: "{prettyDuration} rounded to the year",
    now: "now",
    invalid: "Invalid date",
    fallbackDuration: "{displayFrom} to {displayTo}",
  },
  euiPrettyInterval: {
    seconds: "({\n  interval\n}) => `${interval} second${interval > 1 ? 's' : ''}`;",
    minutes: "({\n  interval\n}) => `${interval} minute${interval > 1 ? 's' : ''}`;",
    hours: "({\n  interval\n}) => `${interval} hour${interval > 1 ? 's' : ''}`;",
    days: "({\n  interval\n}) => `${interval} day${interval > 1 ? 's' : ''}`;",
    secondsShorthand: "{interval} s",
    minutesShorthand: "{interval} m",
    hoursShorthand: "{interval} h",
    daysShorthand: "{interval} d",
    off: "Off",
  },
  euiCommonlyUsedTimeRanges: {
    legend: "Commonly used",
  },
  euiQuickSelect: {
    legendText: "Quick select a time range",
    quickSelectTitle: "Quick select",
    previousLabel: "Previous time window",
    nextLabel: "Next time window",
    tenseLabel: "Time tense",
    valueLabel: "Time value",
    unitLabel: "Time unit",
    applyButton: "Apply",
    fullDescription: "Currently set to {timeTense} {timeValue} {timeUnit}.",
  },
  euiRecentlyUsed: {
    legend: "Recently used date ranges",
  },
  euiSuperUpdateButton: {
    refreshButtonLabel: "Refresh",
    updatingButtonLabel: "Updating",
    updateButtonLabel: "Update",
    cannotUpdateTooltip: "Cannot update",
    clickToApplyTooltip: "Click to apply",
  },
  euiTimeOptions: {
    last: "Last",
    next: "Next",
    seconds: "Seconds",
    minutes: "Minutes",
    hours: "Hours",
    days: "Days",
    weeks: "Weeks",
    months: "Months",
    years: "Years",
    secondsAgo: "Seconds ago",
    minutesAgo: "Minutes ago",
    hoursAgo: "Hours ago",
    daysAgo: "Days ago",
    weeksAgo: "Weeks ago",
    monthsAgo: "Months ago",
    yearsAgo: "Years ago",
    secondsFromNow: "Seconds from now",
    minutesFromNow: "Minutes from now",
    hoursFromNow: "Hours from now",
    daysFromNow: "Days from now",
    weeksFromNow: "Weeks from now",
    monthsFromNow: "Months from now",
    yearsFromNow: "Years from now",
    roundToSecond: "Round to the second",
    roundToMinute: "Round to the minute",
    roundToHour: "Round to the hour",
    roundToDay: "Round to the day",
    roundToWeek: "Round to the week",
    roundToMonth: "Round to the month",
    roundToYear: "Round to the year",
    today: "Today",
    thisWeek: "This week",
    thisMonth: "This month",
    thisYear: "This year",
    yesterday: "Yesterday",
    weekToDate: "Week to date",
    monthToDate: "Month to date",
    yearToDate: "Year to date",
  },
  euiErrorBoundary: {
    error: "Error",
  },
  euiFilterButton: {
    filterBadgeActiveAriaLabel: "{count} active filters",
    filterBadgeAvailableAriaLabel: "{count} available filters",
  },
  euiFlyout: {
    closeAriaLabel: "Close this dialog",
  },
  euiFieldPassword: {
    showPassword:
      "Show password as plain text. Note: this will visually expose your password on the screen.",
    maskPassword: "Mask password",
  },
  euiFilePicker: {
    promptText: "Select or drag and drop a file",
    filesSelected: "{fileCount} files selected",
    clearSelectedFiles: "Clear selected files",
    removeSelected: "Remove",
  },
  euiFormControlLayoutClearButton: {
    label: "Clear input",
  },
  euiForm: {
    addressFormErrors: "Please address the highlighted errors.",
  },
  euiSuperSelectControl: {
    selectAnOption: "Select an option: {selectedValue}, is selected",
  },
  euiSuperSelect: {
    screenReaderAnnouncement:
      "You are in a form selector and must select a single option.\n              Use the up and down keys to navigate or escape to close.",
  },
  euiHeaderLinks: {
    openNavigationMenu: "Open menu",
    appNavigation: "App menu",
  },
  euiImageButton: {
    openFullScreen: "Click to open this image in fullscreen mode",
    closeFullScreen: "Press Escape or click to close image fullscreen mode",
  },
  euiLink: {
    newTarget: {
      screenReaderOnlyText: "(opens in a new tab or window)",
    },
    external: {
      ariaLabel: "External link",
    },
  },
  euiPinnableListGroup: {
    pinExtraActionLabel: "Pin item",
    pinnedExtraActionLabel: "Unpin item",
  },
  euiLoadingStrings: {
    ariaLabel: "Loading",
  },
  euiLoadingChart: {
    ariaLabel: "Loading",
  },
  euiMark: {
    highlightStart: "highlight start",
    highlightEnd: "highlight end",
  },
  euiMarkdownEditorFooter: {
    uploadingFiles: "Click to upload files",
    openUploadModal: "Open upload files modal",
    unsupportedFileType: "File type not supported",
    supportedFileTypes: "Supported files: {supportedFileTypes}",
    showSyntaxErrors: "Show errors",
    showMarkdownHelp: "Show markdown help",
    syntaxTitle: "Syntax help",
    errorsTitle: "Errors",
    mdSyntaxLink: "GitHub flavored markdown",
    syntaxModalDescriptionPrefix: "This editor uses",
    syntaxModalDescriptionSuffix:
      "You can also utilize these additional syntax plugins to add rich content to your text.",
    closeButton: "Close",
    syntaxPopoverDescription: "This editor uses",
  },
  euiMarkdownEditorToolbar: {
    editor: "Editor",
    previewMarkdown: "Preview",
  },
  euiModal: {
    closeModal: "Closes this modal window",
  },
  euiNotificationEventMessages: {
    accordionButtonText: "+ {messagesLength} more",
    accordionAriaLabelButtonText: "+ {messagesLength} messages for {eventName}",
    accordionHideText: "hide",
  },
  euiNotificationEventMeta: {
    contextMenuButton: "Menu for {eventName}",
  },
  euiNotificationEventReadButton: {
    markAsReadAria: "Mark {eventName} as read",
    markAsUnreadAria: "Mark {eventName} as unread",
    markAsRead: "Mark as read",
    markAsUnread: "Mark as unread",
  },
  euiNotificationEventReadIcon: {
    readAria: "{eventName} is read",
    unreadAria: "{eventName} is unread",
    read: "Read",
    unread: "Unread",
  },
  euiPaginationButtonArrow: {
    firstPage: "First page",
    previousPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
  },
  euiPaginationButton: {
    longPageString: "Page {page} of {totalPages}",
    shortPageString: "Page {page}",
  },
  euiPagination: {
    pageOfTotalCompressed: "{page} of {total}",
    firstRangeAriaLabel: "Skipping pages 2 to {lastPage}",
    lastRangeAriaLabel: "Skipping pages {firstPage} to {lastPage}",
    last: "Last",
    page: "Page",
    of: "of",
    collection: "collection",
    fromEndLabel: "from end",
  },
  euiPopover: {
    screenReaderAnnouncement: "You are in a dialog. To close this dialog, hit escape.",
  },
  euiProgress: {
    valueText: "{value}%",
  },
  euiResizableButton: {
    horizontalResizerAriaLabel: "Press left or right to adjust panels size",
    verticalResizerAriaLabel: "Press up or down to adjust panels size",
  },
  euiResizablePanel: {
    toggleButtonAriaLabel: "Press to toggle this panel",
  },
  euiSelectableListItem: {
    includedOption: "Selected option.",
    includedOptionInstructions: "To exclude this option, press enter.",
    excludedOption: "Excluded option.",
    excludedOptionInstructions: "To uncheck this option, press enter.",
    unckeckedOptionInstructions: "To select this option, press enter.",
    checkedOption: "Checked option.",
    checkedOptionInstructions: "To uncheck this option, press enter.",
  },
  euiSelectableTemplateSitewide: {
    searchPlaceholder: "Search for anything...",
    loadingResults: "Loading results",
    noResults: "No results available",
    onFocusBadgeGoTo: "Go to",
  },
  euiSelectable: {
    loadingOptions: "Loading options",
    noMatchingOptions: "{searchValue} doesn't match any options",
    noAvailableOptions: "No options available",
    placeholderName: "Filter options",
    searchResults:
      "({\n  resultsLength\n}) => `${resultsLength} result${resultsLength === 1 ? '' : 's'} available`;",
    screenReaderInstructions:
      "Use up and down arrows to move focus over options. Enter to select. Escape to collapse options.",
  },
  euiStat: {
    loadingText: "Statistic is loading",
  },
  euiStepStrings: {
    step: "Step {number}: {title}",
    simpleStep: "Step {number}",
    complete: "Step {number}: {title} is complete",
    simpleComplete: "Step {number} is complete",
    warning: "Step {number}: {title} has warnings",
    simpleWarning: "Step {number} has warnings",
    errors: "Step {number}: {title} has errors",
    simpleErrors: "Step {number} has errors",
    incomplete: "Step {number}: {title} is incomplete",
    simpleIncomplete: "Step {number} is incomplete",
    disabled: "Step {number}: {title} is disabled",
    simpleDisabled: "Step {number} is disabled",
    loading: "Step {number}: {title} is loading",
    simpleLoading: "Step {number} is loading",
    current: "Current step {number}: {title}",
    simpleCurrent: "Current step is {number}",
  },
  euiSuggest: {
    stateSavedTooltip: "Saved.",
    stateUnsavedTooltip: "Changes have not been saved.",
    stateLoading: "State: loading.",
    stateSaved: "State: saved.",
    stateUnsaved: "State: unsaved.",
    stateUnchanged: "State: unchanged.",
  },
  euiTableSortMobile: {
    sorting: "Sorting",
  },
  euiTableHeaderCell: {
    titleTextWithDesc: "{innerText}; {description}",
  },
  euiTablePagination: {
    allRows: "Showing all rows",
    rowsPerPage: "Rows per page",
    rowsPerPageOptionShowAllRows: "Show all rows",
    rowsPerPageOption: "{rowsPerPage} rows",
  },
  euiToast: {
    dismissToast: "Dismiss toast",
    newNotification: "A new notification appears",
    notification: "Notification",
  },
  euiTourStepIndicator: {
    isActive: "active",
    isComplete: "complete",
    isIncomplete: "incomplete",
    ariaLabel: "Step {number} {status}",
  },
  euiTourStep: {
    endTour: "End tour",
    skipTour: "Skip tour",
    closeTour: "Close tour",
  },
  euiTreeView: {
    listNavigationInstructions: "You can quickly navigate this list using arrow keys.",
    ariaLabel: "{nodeLabel} child of {ariaLabel}",
  },
}
