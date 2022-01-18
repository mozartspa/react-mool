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
  euiBreadcrumbs: {
    collapsedBadge: {
      ariaLabel: "See collapsed breadcrumbs",
    },
    nav: {
      ariaLabel: "Breadcrumbs",
    },
  },
  euiCardSelect: {
    selected: "Selected",
    unavailable: "Unavailable",
    select: "Select",
  },
  euiCodeEditor: {
    startInteracting: "Press Enter to start interacting with the code.",
    startEditing: "Press Enter to start editing.",
    stopInteracting: "When you're done, press Escape to stop interacting with the code.",
    stopEditing: "When you're done, press Escape to stop editing.",
  },
  euiCodeBlock: {
    copyButton: "Copy",
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
  euiControlBar: {
    screenReaderHeading: "Page level controls",
    customScreenReaderAnnouncement:
      "There is a new region landmark called {landmarkHeading} with page level controls at the end of the document.",
    screenReaderAnnouncement:
      "There is a new region landmark with page level controls at the end of the document.",
  },
  euiDataGridCellButtons: {
    expandButtonTitle: "Click or hit enter to interact with cell content",
  },
  euiDataGridCell: {
    position: "Row: {row}; Column: {col}",
  },
  euiColumnActions: {
    hideColumn: "Hide column",
    moveLeft: "Move left",
    moveRight: "Move right",
    sort: "Sort {schemaLabel}",
  },
  euiDataGridHeaderCell: {
    headerActions: "Header actions",
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
  euiDataGridToolbar: {
    fullScreenButton: "Full screen",
    fullScreenButtonActive: "Exit full screen",
  },
  euiStyleSelector: {
    buttonText: "Density",
    buttonLegend: "Select the display density for the data grid",
    labelExpanded: "Expanded density",
    labelNormal: "Normal density",
    labelCompact: "Compact density",
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
  euiDataGrid: {
    ariaLabel: "{label}; Page {page} of {pageCount}.",
    ariaLabelledBy: "Page {page} of {pageCount}.",
    screenReaderNotice: "Cell contains interactive content.",
  },
  euiDatePopoverButton: {
    invalidTitle: "Invalid date: {title}",
    outdatedTitle: "Update needed: {title}",
  },
  euiRelativeTab: {
    numberInputError: "Must be >= 0",
    numberInputLabel: "Time span amount",
    dateInputError: "Must be a valid range",
    unitInputLabel: "Relative time span",
    roundingLabel: "Round to the {unit}",
    relativeDate: "{position} date",
    fullDescription: "The unit is changeable. Currently set to {unit}.",
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
  euiRefreshInterval: {
    legend: "Refresh every",
    start: "Start",
    stop: "Stop",
    fullDescription: "Refresh interval currently set to {optionValue} {optionText}.",
  },
  euiSuperDatePicker: {
    showDatesButtonLabel: "Show dates",
  },
  euiSuperUpdateButton: {
    refreshButtonLabel: "Refresh",
    updatingButtonLabel: "Updating",
    updateButtonLabel: "Update",
    cannotUpdateTooltip: "Cannot update",
    clickToApplyTooltip: "Click to apply",
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
      "You are in a form selector of {optionsCount} items and must select a single option.\n              Use the up and down keys to navigate or escape to close.",
  },
  euiHeaderLinks: {
    openNavigationMenu: "Open menu",
    appNavigation: "App menu",
  },
  euiImage: {
    closeImage: "Close full screen {alt} image",
    openImage: "Open full screen {alt} image",
  },
  euiLink: {
    external: {
      ariaLabel: "External link",
    },
    newTarget: {
      screenReaderOnlyText: "(opens in a new tab or window)",
    },
  },
  euiPinnableListGroup: {
    pinExtraActionLabel: "Pin item",
    pinnedExtraActionLabel: "Unpin item",
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
  euiPaginationButton: {
    longPageString: "Page {page} of {totalPages}",
    shortPageString: "Page {page}",
  },
  euiPagination: {
    previousPage: "Previous page, {page}",
    disabledPreviousPage: "Previous page",
    firstRangeAriaLabel: "Skipping pages 2 to {lastPage}",
    lastRangeAriaLabel: "Skipping pages {firstPage} to {lastPage}",
    nextPage: "Next page, {page}",
    disabledNextPage: "Next page",
    pageOfTotalCompressed: "{page} of {total}",
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
    includedOption: "Included option.",
    includedOptionInstructions: "To exclude this option, press enter.",
    excludedOption: "Excluded option.",
    excludedOptionInstructions: "To deselect this option, press enter.",
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
    rowsPerPage: "Rows per page",
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
