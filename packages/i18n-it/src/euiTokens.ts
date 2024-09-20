export const euiTokens = {
  euiAccordion: {
    isLoading: "Caricamento in corso",
  },
  euiBasicTable: {
    noItemsMessage: "Nessun elemento trovato",
    tableCaptionWithPagination: "{tableCaption}; Pagina {page} di {pageCount}.",
    tableAutoCaptionWithPagination:
      "Questa tabella contiene {itemCount} righe su un totale di {totalItemCount} righe; Pagina {page} di {pageCount}.",
    tableSimpleAutoCaptionWithPagination:
      "Questa tabella contiene {itemCount} righe; Pagina {page} di {pageCount}.",
    tableAutoCaptionWithoutPagination: "Questa tabella contiene {itemCount} righe.",
    selectAllRows: "Seleziona tutte le righe",
    selectThisRow: "Seleziona questa riga",
    tablePagination: "Paginazione per la tabella: {tableCaption}",
  },
  euiCollapsedItemActions: {
    allActions: "Tutte le azioni",
  },
  euiBottomBar: {
    screenReaderHeading: "Controlli a livello di pagina",
    customScreenReaderAnnouncement:
      "C'è un nuovo landmark chiamato {landmarkHeading} con controlli a livello di pagina alla fine del documento.",
    screenReaderAnnouncement:
      "C'è un nuovo landmark con controlli a livello di pagina alla fine del documento.",
  },
  euiBreadcrumb: {
    collapsedBadge: {
      ariaLabel: "Visualizza i breadcrumb compressi",
    },
  },
  euiBreadcrumbs: {
    nav: {
      ariaLabel: "Breadcrumbs",
    },
  },
  euiCardSelect: {
    selected: "Selezionato",
    unavailable: "Non disponibile",
    select: "Seleziona",
  },
  euiCodeBlockCopy: {
    copy: "Copia",
  },

  euiCodeBlockFullScreen: {
    fullscreenCollapse: "Riduci",
    fullscreenExpand: "Espandi",
  },
  euiColorPickerSwatch: {
    ariaLabel: "Seleziona {color} come colore",
  },
  euiColorPicker: {
    popoverLabel: "Dialogo di selezione colore",
    colorLabel: "Valore colore",
    colorErrorMessage: "Valore colore non valido",
    transparent: "Trasparente",
    alphaLabel: "Valore del canale alfa (opacità)",
    openLabel: "Premi il tasto escape per chiudere il popover",
    closeLabel:
      "Premi il tasto in giù per aprire un popover contenente opzioni di colore",
  },
  euiColorStopThumb: {
    buttonAriaLabel:
      "Premi il tasto Invio per modificare questo stop. Premi Escape per mettere a fuoco il gruppo",
    buttonTitle: "Clicca per modificare, trascina per riposizionare",
    screenReaderAnnouncement:
      "È stato aperto un popup con un modulo di modifica del colore dello stop.\n            Premi Tab per passare ai controlli del modulo o premi\n            Escape per chiudere questo popup.",
    stopLabel: "Valore dello stop",
    stopErrorMessage: "Valore fuori dal range",
    removeLabel: "Rimuovi questo stop",
  },
  euiColorStops: {
    screenReaderAnnouncement:
      "{label}: {readOnly} {disabled} Selettore di colore stop. Ogni stop consiste in un numero e un corrispondente valore colore. Usa le frecce su e giù per selezionare singoli stop. Premi il tasto Invio per creare un nuovo stop.",
  },
  euiHue: {
    label: "Seleziona il valore 'hue' della modalità colore HSV",
  },
  euiSaturation: {
    ariaLabel: "Slider a 2 assi per saturazione e valore della modalità colore HSV",
    screenReaderInstructions:
      "Usa le frecce per navigare nel gradiente di colore quadrato. Le coordinate verranno utilizzate per calcolare i numeri 'saturazione' e 'valore' nella modalità colore HSV, nell'intervallo da 0 a 1. A sinistra e a destra per cambiare la saturazione. Su e giù per cambiare il valore.",
  },
  euiComboBoxPill: {
    removeSelection: "Rimuovi {children} dalla selezione in questo gruppo",
  },
  euiComboBoxOptionsList: {
    loadingOptions: "Caricamento opzioni",
    delimiterMessage: "Aggiungi ogni elemento separato da {delimiter}",
    alreadyAdded: "{label} è già stato aggiunto",
    createCustomOption: "Aggiungi {searchValue} come opzione personalizzata",
    noMatchingOptions: "{searchValue} non corrisponde a nessuna opzione",
    noAvailableOptions: "Non ci sono opzioni disponibili",
    allOptionsSelected: "Hai selezionato tutte le opzioni disponibili",
  },
  euiComboBox: {
    listboxAriaLabel: "Scegli tra le seguenti opzioni",
  },
  euiControlBar: {
    screenReaderHeading: "Controlli a livello di pagina",
    customScreenReaderAnnouncement:
      "C'è un nuovo landmark di regione chiamato {landmarkHeading} con controlli a livello di pagina alla fine del documento.",
    screenReaderAnnouncement:
      "C'è un nuovo landmark di regione con controlli a livello di pagina alla fine del documento.",
  },
  euiDataGridCellActions: {
    expandButtonTitle: "Clicca o premi invio per interagire con il contenuto della cella",
  },
  euiDataGridCell: {
    position: "{columnId}, colonna {col}, riga {row}",
  },
  euiColumnActions: {
    hideColumn: "Nascondi colonna",
    moveLeft: "Sposta a sinistra",
    moveRight: "Sposta a destra",
    sort: "Ordina {schemaLabel}",
  },
  euiDataGridHeaderCell: {
    headerActions: "Clicca per visualizzare le azioni dell'intestazione della colonna",
    sortedByAscendingSingle: "Ordinato in ordine crescente",
    sortedByDescendingSingle: "Ordinato in ordine decrescente",
    sortedByAscendingFirst: "Ordinato per {columnId}, in ordine crescente",
    sortedByDescendingFirst: "Ordinato per {columnId}, in ordine decrescente",
    sortedByAscendingMultiple: ", poi ordinato per {columnId}, in ordine crescente",
    sortedByDescendingMultiple: ", poi ordinato per {columnId}, in ordine decrescente",
    actionsPopoverScreenReaderText:
      "Per navigare nella lista delle azioni della colonna, premi Tab o le frecce su e giù.",
  },
  euiColumnSelector: {
    button: "Colonne",
    buttonActiveSingular: "{numberOfHiddenFields} colonna nascosta",
    buttonActivePlural: "{numberOfHiddenFields} colonne nascoste",
    search: "Cerca",
    searchcolumns: "Cerca colonne",
    selectAll: "Mostra tutte",
    hideAll: "Nascondi tutte",
  },
  euiColumnSortingDraggable: {
    defaultSortAsc: "A-Z",
    defaultSortDesc: "Z-A",
    dragHandleAriaLabel: "Maniglia di trascinamento",
    activeSortLabel: "{display} sta ordinando questo data grid",
    removeSortLabel: "Rimuovi {display} dall'ordinamento del data grid",
    toggleLegend: "Seleziona il metodo di ordinamento per {display}",
  },
  euiColumnSorting: {
    button: "Ordina campi",
    buttonActive:
      "({\n  numberOfSortedFields\n}) => `${numberOfSortedFields} campo${numberOfSortedFields === 1 ? '' : 'i'} ordinato`;",
    emptySorting: "Attualmente non ci sono campi ordinati",
    pickFields: "Scegli i campi da ordinare",
    sortFieldAriaLabel: "Ordina per: ",
    clearAll: "Cancella ordinamento",
  },
  euiDisplaySelector: {
    buttonText: "Opzioni di visualizzazione",
    resetButtonText: "Ripristina predefiniti",
    densityLabel: "Densità",
    labelCompact: "Compatto",
    labelNormal: "Normale",
    labelExpanded: "Espanso",
    rowHeightLabel: "Altezza riga",
    labelSingle: "Singolo",
    labelAuto: "Adatta automaticamente",
    labelCustom: "Personalizzato",
    lineCountLabel: "Righe per riga",
  },
  euiFullscreenSelector: {
    fullscreenButton: "Entra in modalità a schermo intero",
    fullscreenButtonActive: "Esci dalla modalità a schermo intero",
  },
  euiDataGrid: {
    ariaLabel: "{label}; Pagina {page} di {pageCount}.",
    ariaLabelledBy: "Pagina {page} di {pageCount}.",
    screenReaderNotice: "La cella contiene contenuto interattivo.",
  },
  euiDataGridPagination: {
    detailedPaginationLabel: "Paginazione per la griglia precedente: {label}",
    paginationLabel: "Paginazione per la griglia precedente",
  },
  euiDataGridSchema: {
    booleanSortTextAsc: "Falso-Vero",
    booleanSortTextDesc: "Vero-Falso",
    currencySortTextAsc: "Basso-Alto",
    currencySortTextDesc: "Alto-Basso",
    dateSortTextAsc: "Vecchio-Nuovo",
    dateSortTextDesc: "Nuovo-Vecchio",
    numberSortTextAsc: "Basso-Alto",
    numberSortTextDesc: "Alto-Basso",
    jsonSortTextAsc: "Piccolo-Grande",
    jsonSortTextDesc: "Grande-Piccolo",
  },
  euiAutoRefresh: {
    autoRefreshLabel: "Aggiornamento automatico",
    buttonLabelOff: "L'aggiornamento automatico è disattivato",
    buttonLabelOn:
      "L'aggiornamento automatico è attivato e impostato su {prettyInterval}",
  },
  euiRefreshInterval: {
    fullDescriptionOff:
      "L'aggiornamento è disattivato, intervallo impostato su {optionValue} {optionText}.",
    fullDescriptionOn:
      "L'aggiornamento è attivato, intervallo impostato su {optionValue} {optionText}.",
    legend: "Aggiorna ogni",
  },

  euiAbsoluteTab: {
    dateFormatError: "Formato atteso: {dateFormat}",
  },
  euiDatePopoverButton: {
    invalidTitle: "Data non valida: {title}",
    outdatedTitle: "Aggiornamento necessario: {title}",
  },
  euiDatePopoverContent: {
    startDateLabel: "Data di inizio",
    endDateLabel: "Data di fine",
    absoluteTabLabel: "Assoluto",
    relativeTabLabel: "Relativo",
    nowTabLabel: "Ora",
    nowTabContent:
      "Impostare l'ora su \"ora\" significa che ad ogni aggiornamento\n            questo orario sarà impostato sull'ora dell'aggiornamento.",
    nowTabButtonStart: "Imposta la data e l'ora di inizio su ora",
    nowTabButtonEnd: "Imposta la data e l'ora di fine su ora",
  },
  euiRelativeTab: {
    numberInputError: "Deve essere >= 0",
    numberInputLabel: "Quantità dell'intervallo di tempo",
    dateInputError: "Deve essere un intervallo valido",
    unitInputLabel: "Intervallo di tempo relativo",
    fullDescription: "L'unità è modificabile. Attualmente impostata su {unit}.",
  },
  euiPrettyDuration: {
    lastDurationSeconds:
      "({\n  duration\n}) => `Ultimi ${duration} secondo${duration === 1 ? '' : 'i'}`;",
    nextDurationSeconds:
      "({\n  duration\n}) => `Prossimi ${duration} secondo${duration === 1 ? '' : 'i'}`;",
    lastDurationMinutes:
      "({\n  duration\n}) => `Ultimi ${duration} minuto${duration === 1 ? '' : 'i'}`;",
    nextDurationMinutes:
      "({\n  duration\n}) => `Prossimi ${duration} minuto${duration === 1 ? '' : 'i'}`;",
    lastDurationHours:
      "({\n  duration\n}) => `Ultimi ${duration} ora${duration === 1 ? '' : 'e'}`;",
    nextDurationHours:
      "({\n  duration\n}) => `Prossimi ${duration} ora${duration === 1 ? '' : 'e'}`;",
    lastDurationDays:
      "({\n  duration\n}) => `Ultimi ${duration} giorno${duration === 1 ? '' : 'i'}`;",
    nexttDurationDays:
      "({\n  duration\n}) => `Prossimi ${duration} giorno${duration === 1 ? '' : 'i'}`;",
    lastDurationWeeks:
      "({\n  duration\n}) => `Ultimi ${duration} settimana${duration === 1 ? '' : 'e'}`;",
    nextDurationWeeks:
      "({\n  duration\n}) => `Prossimi ${duration} settimana${duration === 1 ? '' : 'e'}`;",
    lastDurationMonths:
      "({\n  duration\n}) => `Ultimi ${duration} mese${duration === 1 ? '' : 'i'}`;",
    nextDurationMonths:
      "({\n  duration\n}) => `Prossimi ${duration} mese${duration === 1 ? '' : 'i'}`;",
    lastDurationYears:
      "({\n  duration\n}) => `Ultimi ${duration} anno${duration === 1 ? '' : 'i'}`;",
    nextDurationYears:
      "({\n  duration\n}) => `Prossimi ${duration} anno${duration === 1 ? '' : 'i'}`;",
    durationRoundedToSecond: "{prettyDuration} arrotondato al secondo",
    durationRoundedToMinute: "{prettyDuration} arrotondato al minuto",
    durationRoundedToHour: "{prettyDuration} arrotondato all'ora",
    durationRoundedToDay: "{prettyDuration} arrotondato al giorno",
    durationRoundedToWeek: "{prettyDuration} arrotondato alla settimana",
    durationRoundedToMonth: "{prettyDuration} arrotondato al mese",
    durationRoundedToYear: "{prettyDuration} arrotondato all'anno",
    now: "ora",
    invalid: "Data non valida",
    fallbackDuration: "{displayFrom} a {displayTo}",
  },
  euiPrettyInterval: {
    seconds: "({\n  interval\n}) => `${interval} secondo${interval > 1 ? 'i' : ''}`;",
    minutes: "({\n  interval\n}) => `${interval} minuto${interval > 1 ? 'i' : ''}`;",
    hours: "({\n  interval\n}) => `${interval} ora${interval > 1 ? 'e' : ''}`;",
    days: "({\n  interval\n}) => `${interval} giorno${interval > 1 ? 'i' : ''}`;",
    secondsShorthand: "{interval} s",
    minutesShorthand: "{interval} m",
    hoursShorthand: "{interval} h",
    daysShorthand: "{interval} d",
    off: "Spento",
  },
  euiCommonlyUsedTimeRanges: {
    legend: "Usato comunemente",
  },
  euiQuickSelect: {
    legendText: "Seleziona rapidamente un intervallo di tempo",
    quickSelectTitle: "Selezione rapida",
    previousLabel: "Finestra temporale precedente",
    nextLabel: "Prossima finestra temporale",
    tenseLabel: "Tempo verbale",
    valueLabel: "Valore temporale",
    unitLabel: "Unità di tempo",
    applyButton: "Applica",
    fullDescription: "Attualmente impostato su {timeTense} {timeValue} {timeUnit}.",
  },
  euiRecentlyUsed: {
    legend: "Intervalli di date utilizzati di recente",
  },
  euiSuperUpdateButton: {
    refreshButtonLabel: "Aggiorna",
    updatingButtonLabel: "Aggiornamento in corso",
    updateButtonLabel: "Aggiorna",
    cannotUpdateTooltip: "Impossibile aggiornare",
    clickToApplyTooltip: "Clicca per applicare",
  },
  euiTimeOptions: {
    last: "Ultimo",
    next: "Prossimo",
    seconds: "Secondi",
    minutes: "Minuti",
    hours: "Ore",
    days: "Giorni",
    weeks: "Settimane",
    months: "Mesi",
    years: "Anni",
    secondsAgo: "Secondi fa",
    minutesAgo: "Minuti fa",
    hoursAgo: "Ore fa",
    daysAgo: "Giorni fa",
    weeksAgo: "Settimane fa",
    monthsAgo: "Mesi fa",
    yearsAgo: "Anni fa",
    secondsFromNow: "Secondi da ora",
    minutesFromNow: "Minuti da ora",
    hoursFromNow: "Ore da ora",
    daysFromNow: "Giorni da ora",
    weeksFromNow: "Settimane da ora",
    monthsFromNow: "Mesi da ora",
    yearsFromNow: "Anni da ora",
    roundToSecond: "Arrotonda al secondo",
    roundToMinute: "Arrotonda al minuto",
    roundToHour: "Arrotonda all'ora",
    roundToDay: "Arrotonda al giorno",
    roundToWeek: "Arrotonda alla settimana",
    roundToMonth: "Arrotonda al mese",
    roundToYear: "Arrotonda all'anno",
    today: "Oggi",
    thisWeek: "Questa settimana",
    thisMonth: "Questo mese",
    thisYear: "Quest'anno",
    yesterday: "Ieri",
    weekToDate: "Settimana a oggi",
    monthToDate: "Mese a oggi",
    yearToDate: "Anno a oggi",
  },
  euiErrorBoundary: {
    error: "Errore",
  },
  euiFilterButton: {
    filterBadgeActiveAriaLabel: "{count} filtri attivi",
    filterBadgeAvailableAriaLabel: "{count} filtri disponibili",
  },
  euiFlyout: {
    closeAriaLabel: "Chiudi questa finestra di dialogo",
  },
  euiFieldPassword: {
    showPassword:
      "Mostra la password come testo normale. Nota: questo esporrà visivamente la tua password sullo schermo.",
    maskPassword: "Maschera la password",
  },
  euiFilePicker: {
    promptText: "Seleziona o trascina e rilascia un file",
    filesSelected: "{fileCount} file selezionati",
    clearSelectedFiles: "Pulisci file selezionati",
    removeSelected: "Rimuovi",
  },
  euiFormControlLayoutClearButton: {
    label: "Pulisci input",
  },
  euiForm: {
    addressFormErrors: "Si prega di risolvere gli errori evidenziati.",
  },
  euiSuperSelectControl: {
    selectAnOption: "Seleziona un'opzione: {selectedValue}, è selezionata",
  },
  euiSuperSelect: {
    screenReaderAnnouncement:
      "Sei in un selettore di modulo e devi selezionare un'unica opzione.\n              Usa i tasti su e giù per navigare o Escape per chiudere.",
  },
  euiHeaderLinks: {
    openNavigationMenu: "Apri menu",
    appNavigation: "Menu dell'app",
  },
  euiImageButton: {
    openFullScreen: "Clicca per aprire questa immagine in modalità schermo intero",
    closeFullScreen:
      "Premi Escape o clicca per chiudere la modalità schermo intero dell'immagine",
  },
  euiLink: {
    newTarget: {
      screenReaderOnlyText: "(si apre in una nuova scheda o finestra)",
    },
    external: {
      ariaLabel: "Collegamento esterno",
    },
  },
  euiPinnableListGroup: {
    pinExtraActionLabel: "Fissa elemento",
    pinnedExtraActionLabel: "Sblocca elemento",
  },
  euiLoadingStrings: {
    ariaLabel: "Caricamento",
  },
  euiLoadingChart: {
    ariaLabel: "Caricamento",
  },
  euiMark: {
    highlightStart: "inizio evidenziazione",
    highlightEnd: "fine evidenziazione",
  },
  euiMarkdownEditorFooter: {
    uploadingFiles: "Clicca per caricare file",
    openUploadModal: "Apri finestra di caricamento file",
    unsupportedFileType: "Tipo di file non supportato",
    supportedFileTypes: "File supportati: {supportedFileTypes}",
    showSyntaxErrors: "Mostra errori",
    showMarkdownHelp: "Mostra aiuto su markdown",
    syntaxTitle: "Aiuto sulla sintassi",
    errorsTitle: "Errori",
    mdSyntaxLink: "Markdown compatibile con GitHub",
    syntaxModalDescriptionPrefix: "Questo editor utilizza",
    syntaxModalDescriptionSuffix:
      "Puoi anche utilizzare questi plugin di sintassi aggiuntivi per aggiungere contenuti ricchi al tuo testo.",
    closeButton: "Chiudi",
    syntaxPopoverDescription: "Questo editor utilizza",
  },
  euiMarkdownEditorToolbar: {
    editor: "Editor",
    previewMarkdown: "Anteprima",
  },
  euiModal: {
    closeModal: "Chiude questa finestra modale",
  },
  euiNotificationEventMessages: {
    accordionButtonText: "+ {messagesLength} in più",
    accordionAriaLabelButtonText: "+ {messagesLength} messaggi per {eventName}",
    accordionHideText: "nascondi",
  },
  euiNotificationEventMeta: {
    contextMenuButton: "Menu per {eventName}",
  },
  euiNotificationEventReadButton: {
    markAsReadAria: "Segna {eventName} come letto",
    markAsUnreadAria: "Segna {eventName} come non letto",
    markAsRead: "Segna come letto",
    markAsUnread: "Segna come non letto",
  },
  euiNotificationEventReadIcon: {
    readAria: "{eventName} è letto",
    unreadAria: "{eventName} è non letto",
    read: "Letto",
    unread: "Non letto",
  },
  euiPaginationButtonArrow: {
    firstPage: "Prima pagina",
    previousPage: "Pagina precedente",
    nextPage: "Pagina successiva",
    lastPage: "Ultima pagina",
  },
  euiPaginationButton: {
    longPageString: "Pagina {page} di {totalPages}",
    shortPageString: "Pagina {page}",
  },
  euiPagination: {
    pageOfTotalCompressed: "{page} di {total}",
    firstRangeAriaLabel: "Salta le pagine da 2 a {lastPage}",
    lastRangeAriaLabel: "Salta le pagine da {firstPage} a {lastPage}",
    last: "Ultima",
    page: "Pagina",
    of: "di",
    collection: "collezione",
    fromEndLabel: "dalla fine",
  },
  euiPopover: {
    screenReaderAnnouncement:
      "Sei in un dialogo. Per chiudere questo dialogo, premi Escape.",
  },
  euiProgress: {
    valueText: "{value}%",
  },
  euiResizableButton: {
    horizontalResizerAriaLabel:
      "Premi sinistra o destra per regolare la dimensione dei pannelli",
    verticalResizerAriaLabel: "Premi su o giù per regolare la dimensione dei pannelli",
  },
  euiResizablePanel: {
    toggleButtonAriaLabel: "Premi per attivare/disattivare questo pannello",
  },
  euiSelectableListItem: {
    includedOption: "Opzione selezionata.",
    includedOptionInstructions: "Per escludere questa opzione, premi invio.",
    excludedOption: "Opzione esclusa.",
    excludedOptionInstructions: "Per deselezionare questa opzione, premi invio.",
    unckeckedOptionInstructions: "Per selezionare questa opzione, premi invio.",
    checkedOption: "Opzione selezionata.",
    checkedOptionInstructions: "Per deselezionare questa opzione, premi invio.",
  },
  euiSelectableTemplateSitewide: {
    searchPlaceholder: "Cerca qualsiasi cosa...",
    loadingResults: "Caricamento risultati",
    noResults: "Nessun risultato disponibile",
    onFocusBadgeGoTo: "Vai a",
  },
  euiSelectable: {
    loadingOptions: "Caricamento opzioni",
    noMatchingOptions: "{searchValue} non corrisponde a nessuna opzione",
    noAvailableOptions: "Nessuna opzione disponibile",
    placeholderName: "Filtra opzioni",
    searchResults:
      "({\n  resultsLength\n}) => `${resultsLength} risultato${resultsLength === 1 ? '' : 'i'} disponibile${resultsLength === 1 ? '' : 'i'}`;",
    screenReaderInstructions:
      "Usa le frecce su e giù per muovere il focus sulle opzioni. Invio per selezionare. Escape per chiudere le opzioni.",
  },
  euiStat: {
    loadingText: "La statistica è in caricamento",
  },
  euiStepStrings: {
    step: "Passo {number}: {title}",
    simpleStep: "Passo {number}",
    complete: "Passo {number}: {title} è completo",
    simpleComplete: "Passo {number} è completo",
    warning: "Passo {number}: {title} ha avvisi",
    simpleWarning: "Passo {number} ha avvisi",
    errors: "Passo {number}: {title} ha errori",
    simpleErrors: "Passo {number} ha errori",
    incomplete: "Passo {number}: {title} è incompleto",
    simpleIncomplete: "Passo {number} è incompleto",
    disabled: "Passo {number}: {title} è disabilitato",
    simpleDisabled: "Passo {number} è disabilitato",
    loading: "Passo {number}: {title} è in caricamento",
    simpleLoading: "Passo {number} è in caricamento",
    current: "Passo corrente {number}: {title}",
    simpleCurrent: "Il passo corrente è {number}",
  },
  euiSuggest: {
    stateSavedTooltip: "Salvato.",
    stateUnsavedTooltip: "Le modifiche non sono state salvate.",
    stateLoading: "Stato: caricamento.",
    stateSaved: "Stato: salvato.",
    stateUnsaved: "Stato: non salvato.",
    stateUnchanged: "Stato: invariato.",
  },
  euiTableSortMobile: {
    sorting: "Ordinamento",
  },
  euiTableHeaderCell: {
    titleTextWithDesc: "{innerText}; {description}",
  },
  euiTablePagination: {
    allRows: "Mostra tutte le righe",
    rowsPerPage: "Righe per pagina",
    rowsPerPageOptionShowAllRows: "Mostra tutte le righe",
    rowsPerPageOption: "{rowsPerPage} righe",
  },
  euiToast: {
    dismissToast: "Chiudi toast",
    newNotification: "È apparsa una nuova notifica",
    notification: "Notifica",
  },
  euiTourStepIndicator: {
    isActive: "attivo",
    isComplete: "completo",
    isIncomplete: "incompleto",
    ariaLabel: "Passo {number} {status}",
  },
  euiTourStep: {
    endTour: "Termina il tour",
    skipTour: "Salta il tour",
    closeTour: "Chiudi il tour",
  },
  euiTreeView: {
    listNavigationInstructions:
      "Puoi navigare rapidamente in questa lista usando i tasti freccia.",
    ariaLabel: "{nodeLabel} figlio di {ariaLabel}",
  },
}
