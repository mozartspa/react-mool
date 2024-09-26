export const euiTokens = {
  euiAccordionChildrenLoading: {
    message: "Loading",
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
    deselectRows: "Deselect rows",
    selectThisRow: "Select row {index}",
    tablePagination: "Pagination for table: {tableCaption}",
  },
  euiCollapsedItemActions: {
    allActionsTooltip: "All actions",
    allActions: "All actions, row {index}",
    allActionsDisabled:
      "Individual item actions are disabled when rows are being selected.",
  },
  euiBottomBar: {
    screenReaderHeading: "Page level controls",
    customScreenReaderAnnouncement:
      "There is a new region landmark called {landmarkHeading} with page level controls at the end of the document.",
    screenReaderAnnouncement:
      "There is a new region landmark with page level controls at the end of the document.",
  },
  euiBreadcrumb: {
    popoverAriaLabel: "Clicking this button will toggle a popover dialog.",
    collapsedBadge: {
      ariaLabel: "See collapsed breadcrumbs",
    },
  },
  euiBreadcrumbs: {
    nav: {
      ariaLabel: "Breadcrumbs",
    },
  },
  euiCallOut: {
    dismissAriaLabel: "Dismiss this callout",
  },
  euiCardSelect: {
    selected: "Selected",
    unavailable: "Unavailable",
    select: "Select",
  },
  euiCodeBlockAnnotations: {
    ariaLabel: "Click to view a code annotation for line {lineNumber}",
  },
  euiCodeBlockCopy: {
    copy: "Copy",
  },
  euiCodeBlockFullScreen: {
    fullscreenCollapse: "Collapse",
    fullscreenExpand: "Expand",
  },
  euiCollapsibleNavKibanaSolution: {
    switcherTitle: "Solution view",
    switcherAriaLabel: " - click to switch to another solution",
    groupLabel: "Navigate to solution",
  },
  euiCollapsibleNavBeta: {
    ariaLabel: "Site menu",
  },
  euiCollapsibleNavButton: {
    ariaLabelExpand: "Expand navigation",
    ariaLabelCollapse: "Collapse navigation",
    ariaLabelOpen: "Open navigation",
    ariaLabelClose: "Close navigation",
  },
  euiCollapsedNavButton: {
    ariaLabelButtonIcon: "{title}, quick navigation menu",
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
  euiDataGridCellActions: {
    expandButtonTitle: "Click or hit enter to interact with cell content",
  },
  euiDataGridCell: {
    position: "{columnName}, column {columnIndex}, row {rowIndex}",
    expansionEnterPrompt: "Press the Enter key to expand this cell.",
    focusTrapExitPrompt: "Exited cell content.",
    focusTrapEnterPrompt: "Press the Enter key to interact with this cell's contents.",
  },
  euiColumnActions: {
    hideColumn: "Hide column",
    moveLeft: "Move left",
    moveRight: "Move right",
    unsort: "Unsort {schemaLabel}",
    sort: "Sort {schemaLabel}",
  },
  euiDataGridHeaderCell: {
    actionsButtonAriaLabel: "{title}. Click to view column header actions.",
    actionsEnterKeyInstructions: "Press the Enter key to view this column's actions",
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
    dragHandleAriaLabel: "Drag handle",
    button: "Columns",
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
    sortFieldAriaLabel: "Sort by: ",
    emptySorting: "Currently no fields are sorted",
    pickFields: "Pick fields to sort by",
    clearAll: "Clear sorting",
  },
  euiDataGridToolbarControl: {
    badgeAriaLabel: "Active: {count}",
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
  euiKeyboardShortcuts: {
    title: "Keyboard shortcuts",
    upArrowTitle: "Up arrow",
    upArrowDescription: "Move one cell up",
    downArrowTitle: "Down arrow",
    downArrowDescription: "Move one cell down",
    rightArrowTitle: "Right arrow",
    rightArrowDescription: "Move one cell right",
    leftArrowTitle: "Left arrow",
    leftArrowDescription: "Move one cell left",
    homeTitle: "Home",
    homeDescription: "Move to the first cell of the current row",
    endTitle: "End",
    endDescription: "Move to the last cell of the current row",
    ctrl: "Ctrl",
    ctrlHomeDescription: "Move to the first cell of the current page",
    ctrlEndDescription: "Move to the last cell of the current page",
    pageUpTitle: "Page Up",
    pageUpDescription: "Go to the last row of the previous page",
    pageDownTitle: "Page Down",
    pageDownDescription: "Go to the first row of the next page",
    enterTitle: "Enter",
    enterDescription: "Open cell details and actions",
    escapeTitle: "Escape",
    escapeDescription: "Close cell details and actions",
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
    toggleLabel: "Refresh every",
    toggleAriaLabel: "Toggle refresh",
    valueAriaLabel: "Refresh interval value",
    unitsAriaLabel: "Refresh interval units",
  },
  euiAbsoluteTab: {
    dateFormatButtonLabel: "Parse date",
    dateFormatError:
      "Allowed formats: {dateFormat}, ISO 8601, RFC 2822, or Unix timestamp.",
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
      'Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.',
    nowTabButtonStart: "Set start date and time to now",
    nowTabButtonEnd: "Set end date and time to now",
  },
  euiRelativeTab: {
    numberInputLabel: "Time span amount",
    numberInputError: "Must be >= 0",
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
  euiQuickSelectPopover: {
    buttonLabel: "Date quick select",
  },
  euiQuickSelect: {
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
    updatingButtonLabel: "Updating",
    updateButtonLabel: "Update",
    refreshButtonLabel: "Refresh",
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
  euiFlyoutCloseButton: {
    ariaLabel: "Close this dialog",
  },
  euiFlyout: {
    screenReaderModalDialog:
      "You are in a modal dialog. Press Escape or tap/click outside the dialog on the shadowed overlay to close.",
    screenReaderNonModalDialog:
      "You are in a non-modal dialog. To close the dialog, press Escape.",
    screenReaderFixedHeaders:
      "You can still continue tabbing through the page headers in addition to the dialog.",
  },
  euiFieldPassword: {
    showPassword:
      "Show password as plain text. Note: this will visually expose your password on the screen.",
    maskPassword: "Mask password",
  },
  euiFieldSearch: {
    clearSearchButtonLabel: "Clear search input",
  },
  euiFilePicker: {
    promptText: "Select or drag and drop a file",
    filesSelected: "{fileCount} files selected",
    removeSelectedAriaLabel: "Remove selected files",
    removeSelected: "Remove",
  },
  euiFormControlLayoutClearButton: {
    label: "Clear input",
  },
  euiFormControlLayoutDelimited: {
    delimiterLabel: "to",
  },
  euiForm: {
    addressFormErrors: "Please address the highlighted errors.",
  },
  euiDualRange: {
    sliderScreenReaderInstructions:
      "You are in a custom range slider. Use the Up and Down arrow keys to change the minimum value. Press Tab to interact with the maximum value.",
  },
  euiRange: {
    sliderScreenReaderInstructions:
      "You are in a custom range slider. Use the Up and Down arrow keys to change the value.",
  },
  euiSuperSelect: {
    screenReaderAnnouncement:
      "You are in a form selector and must select a single option.\n              Use the Up and Down arrow keys to navigate or Escape to close.",
    ariaLabel: "Select listbox",
  },
  euiHeaderLinks: {
    openNavigationMenu: "Open menu",
    appNavigation: "App menu",
  },
  euiImageButton: {
    openFullScreen: "Click to open this image in fullscreen mode",
    closeFullScreen: "Press Escape or click to close image fullscreen mode",
  },
  euiInlineEditForm: {
    saveButtonAriaLabel: "Save edit",
    cancelButtonAriaLabel: "Cancel edit",
    inputKeyboardInstructions:
      "Press Enter to save your edited text. Press Escape to cancel your edit.",
    activateEditModeDescription: "Click to edit this text inline.",
  },
  euiExternalLinkIcon: {
    ariaLabel: "External link",
    newTarget: {
      screenReaderOnlyText: "(opens in a new tab or window)",
    },
  },
  euiPinnableListGroup: {
    pinExtraActionLabel: "Pin item",
    pinnedExtraActionLabel: "Unpin item",
  },
  euiLoadingStrings: {
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
    screenReaderAnnouncement:
      "You are in a dialog. Press Escape, or tap/click outside the dialog to close.",
  },
  euiProgress: {
    valueText: "{value}%",
  },
  euiResizableButton: {
    horizontalResizerAriaLabel:
      "Press the left or right arrow keys to adjust panels size",
    verticalResizerAriaLabel: "Press the up or down arrow keys to adjust panels size",
  },
  euiResizablePanel: {
    toggleButtonAriaLabel: "Press to toggle this panel",
  },
  euiSearchBox: {
    placeholder: "Search...",
    incrementalAriaLabel:
      "This is a search bar. As you type, the results lower in the page will automatically filter.",
    ariaLabel:
      "This is a search bar. After typing your query, hit enter to filter the results lower in the page.",
  },
  euiSelectableListItem: {
    checkedOption: "Checked option.",
    checkOptionInstructions: "To check this option, press Enter.",
    uncheckOptionInstructions: "To uncheck this option, press Enter.",
    excludedOption: "Excluded option.",
    excludeOptionInstructions: "To exclude this option, press Enter.",
    mixedOption: "Mixed (indeterminate) option.",
    mixedOptionInstructions: "To check this option for all, press Enter once.",
    mixedOptionUncheckInstructions: "To uncheck this option for all, press Enter twice.",
    mixedOptionExcludeInstructions: "To exclude this option for all, press Enter twice.",
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
    screenReaderInstructions:
      "Use the Up and Down arrow keys to move focus over options. Press Enter to select. Press Escape to collapse options.",
    placeholderName: "Filter options",
    searchResults:
      "({\n  resultsLength\n}) => `${resultsLength} result${resultsLength === 1 ? '' : 's'} available`;",
  },
  euiSideNav: {
    mobileToggleAriaLabel: "Toggle navigation",
  },
  euiSkeletonLoading: {
    loadedAriaText: "Loaded {contentAriaLabel}",
    loadingAriaText: "Loading {contentAriaLabel}",
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
  euiGlobalToastList: {
    clearAllToastsButtonAriaLabel: "Clear all toast notifications",
    clearAllToastsButtonDisplayText: "Clear all",
  },
  euiToast: {
    newNotification: "A new notification appears",
    notification: "Notification",
    dismissToast: "Dismiss toast",
  },
  euiIconTip: {
    defaultAriaLabel: "Info",
  },
  euiTourFooter: {
    endTour: "End tour",
    skipTour: "Skip tour",
    closeTour: "Close tour",
  },
  euiTourStepIndicator: {
    isActive: "active",
    isComplete: "complete",
    isIncomplete: "incomplete",
    ariaLabel: "Step {number} {status}",
  },
  euiTreeView: {
    listNavigationInstructions: "You can quickly navigate this list using arrow keys.",
  },
}
