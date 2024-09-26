export const euiTokens = {
  euiAccordionChildrenLoading: {
    message: "Caricamento in corso",
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
    deselectRows: "Deseleziona righe",
    selectThisRow: "Seleziona riga {index}",
    tablePagination: "Paginazione per la tabella: {tableCaption}",
  },
  euiCollapsedItemActions: {
    allActionsTooltip: "Tutte le azioni",
    allActions: "Tutte le azioni, riga {index}",
    allActionsDisabled:
      "Le azioni individuali sugli elementi sono disabilitate quando le righe sono selezionate.",
  },
  euiBottomBar: {
    screenReaderHeading: "Controlli a livello di pagina",
    customScreenReaderAnnouncement:
      "C'è una nuova area denominata {landmarkHeading} con controlli a livello di pagina alla fine del documento.",
    screenReaderAnnouncement:
      "C'è una nuova area con controlli a livello di pagina alla fine del documento.",
  },
  euiBreadcrumb: {
    popoverAriaLabel: "Facendo clic su questo pulsante si aprirà un dialogo popover.",
    collapsedBadge: {
      ariaLabel: "Visualizza i breadcrumb ridotti",
    },
  },
  euiBreadcrumbs: {
    nav: {
      ariaLabel: "Breadcrumb",
    },
  },
  euiCallOut: {
    dismissAriaLabel: "Chiudi questo avviso",
  },
  euiCardSelect: {
    selected: "Selezionato",
    unavailable: "Non disponibile",
    select: "Seleziona",
  },
  euiCodeBlockAnnotations: {
    ariaLabel:
      "Fai clic per visualizzare un'annotazione del codice per la riga {lineNumber}",
  },
  euiCodeBlockCopy: {
    copy: "Copia",
  },
  euiCodeBlockFullScreen: {
    fullscreenCollapse: "Comprimi",
    fullscreenExpand: "Espandi",
  },
  euiCollapsibleNavKibanaSolution: {
    switcherTitle: "Vista della soluzione",
    switcherAriaLabel: " - clicca per passare a un'altra soluzione",
    groupLabel: "Naviga verso la soluzione",
  },
  euiCollapsibleNavBeta: {
    ariaLabel: "Menu del sito",
  },
  euiCollapsibleNavButton: {
    ariaLabelExpand: "Espandi la navigazione",
    ariaLabelCollapse: "Comprimi la navigazione",
    ariaLabelOpen: "Apri la navigazione",
    ariaLabelClose: "Chiudi la navigazione",
  },
  euiCollapsedNavButton: {
    ariaLabelButtonIcon: "{title}, menu di navigazione rapido",
  },
  euiColorPickerSwatch: {
    ariaLabel: "Seleziona {color} come colore",
  },
  euiColorPicker: {
    popoverLabel: "Dialogo di selezione del colore",
    colorLabel: "Valore del colore",
    colorErrorMessage: "Valore del colore non valido",
    transparent: "Trasparente",
    alphaLabel: "Valore del canale alfa (opacità)",
    openLabel: "Premi il tasto Esc per chiudere il popover",
    closeLabel:
      "Premi la freccia in giù per aprire un popover contenente le opzioni del colore",
  },
  euiHue: {
    label: "Seleziona il valore della tonalità in modalità colore HSV",
  },
  euiSaturation: {
    ariaLabel: "Slider a 2 assi per saturazione e valore in modalità colore HSV",
    screenReaderInstructions:
      "Usa le frecce per navigare nel gradiente di colore quadrato. Le coordinate verranno utilizzate per calcolare i valori di 'saturazione' e 'valore' nella modalità colore HSV, nell'intervallo da 0 a 1. Frecce sinistra e destra per cambiare la saturazione. Frecce su e giù per cambiare il valore.",
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
  euiDataGridCellActions: {
    expandButtonTitle: "Clicca o premi Invio per interagire con il contenuto della cella",
  },
  euiDataGridCell: {
    position: "{columnName}, colonna {columnIndex}, riga {rowIndex}",
    expansionEnterPrompt: "Premi il tasto Invio per espandere questa cella.",
    focusTrapExitPrompt: "Uscito dal contenuto della cella.",
    focusTrapEnterPrompt:
      "Premi il tasto Invio per interagire con il contenuto di questa cella.",
  },
  euiColumnActions: {
    hideColumn: "Nascondi colonna",
    moveLeft: "Sposta a sinistra",
    moveRight: "Sposta a destra",
    unsort: "Rimuovi ordinamento {schemaLabel}",
    sort: "Ordina {schemaLabel}",
  },
  euiDataGridHeaderCell: {
    actionsButtonAriaLabel:
      "{title}. Clicca per visualizzare le azioni dell'intestazione della colonna.",
    actionsEnterKeyInstructions:
      "Premi il tasto Invio per visualizzare le azioni di questa colonna",
    sortedByAscendingSingle: "Ordinato in modo crescente",
    sortedByDescendingSingle: "Ordinato in modo decrescente",
    sortedByAscendingFirst: "Ordinato per {columnId}, crescente",
    sortedByDescendingFirst: "Ordinato per {columnId}, decrescente",
    sortedByAscendingMultiple: ", poi ordinato per {columnId}, crescente",
    sortedByDescendingMultiple: ", poi ordinato per {columnId}, decrescente",
    actionsPopoverScreenReaderText:
      "Per navigare attraverso l'elenco delle azioni della colonna, premi il tasto Tab o le frecce su e giù.",
  },
  euiColumnSelector: {
    dragHandleAriaLabel: "Maniglia per trascinamento",
    button: "Colonne",
    search: "Cerca",
    searchcolumns: "Cerca colonne",
    selectAll: "Mostra tutto",
    hideAll: "Nascondi tutto",
  },
  euiColumnSortingDraggable: {
    defaultSortAsc: "A-Z",
    defaultSortDesc: "Z-A",
    dragHandleAriaLabel: "Maniglia per trascinamento",
    activeSortLabel: "{display} sta ordinando questa griglia di dati",
    removeSortLabel: "Rimuovi {display} dall'ordinamento della griglia dati",
    toggleLegend: "Seleziona metodo di ordinamento per {display}",
  },
  euiColumnSorting: {
    button: "Ordina campi",
    sortFieldAriaLabel: "Ordina per: ",
    emptySorting: "Attualmente non ci sono campi ordinati",
    pickFields: "Scegli campi da ordinare",
    clearAll: "Cancella ordinamento",
  },
  euiDataGridToolbarControl: {
    badgeAriaLabel: "Attivo: {count}",
  },
  euiDisplaySelector: {
    buttonText: "Opzioni di visualizzazione",
    resetButtonText: "Reimposta ai valori predefiniti",
    densityLabel: "Densità",
    labelCompact: "Compatto",
    labelNormal: "Normale",
    labelExpanded: "Espanso",
    rowHeightLabel: "Altezza riga",
    labelSingle: "Singolo",
    labelAuto: "Adatta automaticamente",
    labelCustom: "Personalizzato",
    lineCountLabel: "Linee per riga",
  },
  euiFullscreenSelector: {
    fullscreenButton: "Attiva schermo intero",
    fullscreenButtonActive: "Esci da schermo intero",
  },
  euiKeyboardShortcuts: {
    title: "Scorciatoie da tastiera",
    upArrowTitle: "Freccia su",
    upArrowDescription: "Sposta una cella in su",
    downArrowTitle: "Freccia giù",
    downArrowDescription: "Sposta una cella in giù",
    rightArrowTitle: "Freccia destra",
    rightArrowDescription: "Sposta una cella a destra",
    leftArrowTitle: "Freccia sinistra",
    leftArrowDescription: "Sposta una cella a sinistra",
    homeTitle: "Home",
    homeDescription: "Vai alla prima cella della riga corrente",
    endTitle: "End",
    endDescription: "Vai all'ultima cella della riga corrente",
    ctrl: "Ctrl",
    ctrlHomeDescription: "Vai alla prima cella della pagina corrente",
    ctrlEndDescription: "Vai all'ultima cella della pagina corrente",
    pageUpTitle: "Pagina Su",
    pageUpDescription: "Vai all'ultima riga della pagina precedente",
    pageDownTitle: "Pagina Giù",
    pageDownDescription: "Vai alla prima riga della pagina successiva",
    enterTitle: "Invio",
    enterDescription: "Apri dettagli e azioni della cella",
    escapeTitle: "Escape",
    escapeDescription: "Chiudi dettagli e azioni della cella",
  },
  euiDataGrid: {
    ariaLabel: "{label}; Pagina {page} di {pageCount}.",
    ariaLabelledBy: "Pagina {page} di {pageCount}.",
    screenReaderNotice: "La cella contiene contenuti interattivi.",
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
    buttonLabelOff: "Aggiornamento automatico disattivato",
    buttonLabelOn: "Aggiornamento automatico attivo e impostato su {prettyInterval}",
  },
  euiRefreshInterval: {
    fullDescriptionOff:
      "Aggiornamento disattivato, intervallo impostato su {optionValue} {optionText}.",
    fullDescriptionOn:
      "Aggiornamento attivo, intervallo impostato su {optionValue} {optionText}.",
    toggleLabel: "Aggiorna ogni",
    toggleAriaLabel: "Attiva/disattiva aggiornamento",
    valueAriaLabel: "Valore intervallo aggiornamento",
    unitsAriaLabel: "Unità intervallo aggiornamento",
  },
  euiAbsoluteTab: {
    dateFormatButtonLabel: "Interpreta data",
    dateFormatError:
      "Formati consentiti: {dateFormat}, ISO 8601, RFC 2822 o timestamp Unix.",
  },
  euiDatePopoverButton: {
    invalidTitle: "Data non valida: {title}",
    outdatedTitle: "È necessario aggiornare: {title}",
  },
  euiDatePopoverContent: {
    startDateLabel: "Data di inizio",
    endDateLabel: "Data di fine",
    absoluteTabLabel: "Assoluto",
    relativeTabLabel: "Relativo",
    nowTabLabel: "Ora",
    nowTabContent:
      "Impostando l'ora su \"ora\", ad ogni aggiornamento questa verrà aggiornata in base all'ora dell'aggiornamento.",
    nowTabButtonStart: "Imposta data e ora di inizio su ora",
    nowTabButtonEnd: "Imposta data e ora di fine su ora",
  },
  euiRelativeTab: {
    numberInputLabel: "Durata",
    numberInputError: "Deve essere >= 0",
    dateInputError: "Deve essere un intervallo valido",
    unitInputLabel: "Durata relativa",
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
      "({\n  duration\n}) => `Ultime ${duration} ora${duration === 1 ? '' : 'e'}`;",
    nextDurationHours:
      "({\n  duration\n}) => `Prossime ${duration} ora${duration === 1 ? '' : 'e'}`;",
    lastDurationDays:
      "({\n  duration\n}) => `Ultimi ${duration} giorno${duration === 1 ? '' : 'i'}`;",
    nexttDurationDays:
      "({\n  duration\n}) => `Prossimi ${duration} giorno${duration === 1 ? '' : 'i'}`;",
    lastDurationWeeks:
      "({\n  duration\n}) => `Ultime ${duration} settimana${duration === 1 ? '' : 'e'}`;",
    nextDurationWeeks:
      "({\n  duration\n}) => `Prossime ${duration} settimana${duration === 1 ? '' : 'e'}`;",
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
    daysShorthand: "{interval} g",
    off: "Disattivato",
  },
  euiCommonlyUsedTimeRanges: {
    legend: "Usato di frequente",
  },
  euiQuickSelectPopover: {
    buttonLabel: "Selezione rapida data",
  },
  euiQuickSelect: {
    quickSelectTitle: "Selezione rapida",
    previousLabel: "Finestra temporale precedente",
    nextLabel: "Finestra temporale successiva",
    tenseLabel: "Tempo",
    valueLabel: "Valore temporale",
    unitLabel: "Unità di tempo",
    applyButton: "Applica",
    fullDescription: "Attualmente impostato su {timeTense} {timeValue} {timeUnit}.",
  },
  euiRecentlyUsed: {
    legend: "Intervalli di date usati di recente",
  },
  euiSuperUpdateButton: {
    updatingButtonLabel: "Aggiornamento in corso",
    updateButtonLabel: "Aggiorna",
    refreshButtonLabel: "Ricarica",
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
    secondsFromNow: "Secondi da adesso",
    minutesFromNow: "Minuti da adesso",
    hoursFromNow: "Ore da adesso",
    daysFromNow: "Giorni da adesso",
    weeksFromNow: "Settimane da adesso",
    monthsFromNow: "Mesi da adesso",
    yearsFromNow: "Anni da adesso",
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
    weekToDate: "Settimana fino a oggi",
    monthToDate: "Mese fino a oggi",
    yearToDate: "Anno fino a oggi",
  },
  euiErrorBoundary: {
    error: "Errore",
  },
  euiFilterButton: {
    filterBadgeActiveAriaLabel: "{count} filtri attivi",
    filterBadgeAvailableAriaLabel: "{count} filtri disponibili",
  },
  euiFlyoutCloseButton: {
    ariaLabel: "Chiudi questo dialogo",
  },
  euiFlyout: {
    screenReaderModalDialog:
      "Sei in un dialogo modale. Premi Esc o clicca/tocca fuori dal dialogo per chiuderlo.",
    screenReaderNonModalDialog: "Sei in un dialogo non modale. Per chiuderlo, premi Esc.",
    screenReaderFixedHeaders:
      "Puoi continuare a navigare attraverso le intestazioni della pagina oltre al dialogo.",
  },
  euiFieldPassword: {
    showPassword:
      "Mostra password in chiaro. Nota: questo esporrà visivamente la tua password sullo schermo.",
    maskPassword: "Nascondi password",
  },
  euiFieldSearch: {
    clearSearchButtonLabel: "Cancella input di ricerca",
  },
  euiFilePicker: {
    promptText: "Seleziona o trascina un file",
    filesSelected: "{fileCount} file selezionati",
    removeSelectedAriaLabel: "Rimuovi i file selezionati",
    removeSelected: "Rimuovi",
  },
  euiFormControlLayoutClearButton: {
    label: "Cancella input",
  },
  euiFormControlLayoutDelimited: {
    delimiterLabel: "a",
  },
  euiForm: {
    addressFormErrors: "Si prega di correggere gli errori evidenziati.",
  },
  euiDualRange: {
    sliderScreenReaderInstructions:
      "Sei in un cursore a intervallo personalizzato. Usa i tasti freccia Su e Giù per cambiare il valore minimo. Premi Tab per interagire con il valore massimo.",
  },
  euiRange: {
    sliderScreenReaderInstructions:
      "Sei in un cursore personalizzato. Usa i tasti freccia Su e Giù per cambiare il valore.",
  },
  euiSuperSelect: {
    screenReaderAnnouncement:
      "Sei in un selettore di moduli e devi selezionare una singola opzione. Usa i tasti freccia Su e Giù per navigare o premi Esc per chiudere.",
    ariaLabel: "Seleziona listbox",
  },
  euiHeaderLinks: {
    openNavigationMenu: "Apri il menu",
    appNavigation: "Menu app",
  },
  euiImageButton: {
    openFullScreen: "Clicca per aprire questa immagine in modalità a schermo intero",
    closeFullScreen:
      "Premi Esc o clicca per chiudere la modalità a schermo intero dell'immagine",
  },
  euiInlineEditForm: {
    saveButtonAriaLabel: "Salva modifica",
    cancelButtonAriaLabel: "Annulla modifica",
    inputKeyboardInstructions:
      "Premi Invio per salvare il testo modificato. Premi Esc per annullare la modifica.",
    activateEditModeDescription: "Clicca per modificare questo testo in linea.",
  },
  euiExternalLinkIcon: {
    ariaLabel: "Link esterno",
    newTarget: {
      screenReaderOnlyText: "(si apre in una nuova scheda o finestra)",
    },
  },
  euiPinnableListGroup: {
    pinExtraActionLabel: "Blocca elemento",
    pinnedExtraActionLabel: "Sblocca elemento",
  },
  euiLoadingStrings: {
    ariaLabel: "Caricamento",
  },
  euiMark: {
    highlightStart: "inizio evidenziazione",
    highlightEnd: "fine evidenziazione",
  },
  euiMarkdownEditorFooter: {
    uploadingFiles: "Clicca per caricare i file",
    openUploadModal: "Apri la finestra di caricamento file",
    unsupportedFileType: "Tipo di file non supportato",
    supportedFileTypes: "File supportati: {supportedFileTypes}",
    showSyntaxErrors: "Mostra errori",
    showMarkdownHelp: "Mostra guida Markdown",
    syntaxTitle: "Guida alla sintassi",
    errorsTitle: "Errori",
    mdSyntaxLink: "Markdown con stile GitHub",
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
    firstRangeAriaLabel: "Saltando le pagine da 2 a {lastPage}",
    lastRangeAriaLabel: "Saltando le pagine da {firstPage} a {lastPage}",
    last: "Ultima",
    page: "Pagina",
    of: "di",
    collection: "collezione",
    fromEndLabel: "dalla fine",
  },
  euiPopover: {
    screenReaderAnnouncement:
      "Sei in una finestra di dialogo. Premi Esc, oppure tocca/clicca al di fuori della finestra di dialogo per chiudere.",
  },
  euiProgress: {
    valueText: "{value}%",
  },
  euiResizableButton: {
    horizontalResizerAriaLabel:
      "Premi i tasti freccia sinistra o destra per regolare le dimensioni dei pannelli",
    verticalResizerAriaLabel:
      "Premi i tasti freccia su o giù per regolare le dimensioni dei pannelli",
  },
  euiResizablePanel: {
    toggleButtonAriaLabel: "Premi per attivare/disattivare questo pannello",
  },
  euiSearchBox: {
    placeholder: "Cerca...",
    incrementalAriaLabel:
      "Questa è una barra di ricerca. Man mano che scrivi, i risultati più in basso nella pagina verranno filtrati automaticamente.",
    ariaLabel:
      "Questa è una barra di ricerca. Dopo aver digitato la tua query, premi invio per filtrare i risultati più in basso nella pagina.",
  },
  euiSelectableListItem: {
    checkedOption: "Opzione selezionata.",
    checkOptionInstructions: "Per selezionare questa opzione, premi Invio.",
    uncheckOptionInstructions: "Per deselezionare questa opzione, premi Invio.",
    excludedOption: "Opzione esclusa.",
    excludeOptionInstructions: "Per escludere questa opzione, premi Invio.",
    mixedOption: "Opzione mista (indeterminata).",
    mixedOptionInstructions:
      "Per selezionare questa opzione per tutti, premi Invio una volta.",
    mixedOptionUncheckInstructions:
      "Per deselezionare questa opzione per tutti, premi Invio due volte.",
    mixedOptionExcludeInstructions:
      "Per escludere questa opzione per tutti, premi Invio due volte.",
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
    screenReaderInstructions:
      "Usa i tasti freccia su e giù per spostare il focus sulle opzioni. Premi Invio per selezionare. Premi Esc per ridurre le opzioni.",
    placeholderName: "Filtra opzioni",
    searchResults:
      "({\n  resultsLength\n}) => `${resultsLength} risultato${resultsLength === 1 ? '' : 'i'} disponibile${resultsLength === 1 ? '' : 'i'}`;",
  },
  euiSideNav: {
    mobileToggleAriaLabel: "Attiva/disattiva navigazione",
  },
  euiSkeletonLoading: {
    loadedAriaText: "Caricato {contentAriaLabel}",
    loadingAriaText: "Caricamento {contentAriaLabel}",
  },
  euiStat: {
    loadingText: "Statistica in caricamento",
  },
  euiStepStrings: {
    step: "Passo {number}: {title}",
    simpleStep: "Passo {number}",
    complete: "Passo {number}: {title} è completato",
    simpleComplete: "Passo {number} è completato",
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
    current: "Passo attuale {number}: {title}",
    simpleCurrent: "Il passo attuale è {number}",
  },
  euiTableSortMobile: {
    sorting: "Ordinamento",
  },
  euiTableHeaderCell: {
    titleTextWithDesc: "{innerText}; {description}",
  },
  euiTablePagination: {
    allRows: "Mostrando tutte le righe",
    rowsPerPage: "Righe per pagina",
    rowsPerPageOptionShowAllRows: "Mostra tutte le righe",
    rowsPerPageOption: "{rowsPerPage} righe",
  },
  euiGlobalToastList: {
    clearAllToastsButtonAriaLabel: "Cancella tutte le notifiche toast",
    clearAllToastsButtonDisplayText: "Cancella tutto",
  },
  euiToast: {
    newNotification: "Una nuova notifica è apparsa",
    notification: "Notifica",
    dismissToast: "Ignora toast",
  },
  euiIconTip: {
    defaultAriaLabel: "Info",
  },
  euiTourFooter: {
    endTour: "Termina il tour",
    skipTour: "Salta il tour",
    closeTour: "Chiudi il tour",
  },
  euiTourStepIndicator: {
    isActive: "attivo",
    isComplete: "completo",
    isIncomplete: "incompleto",
    ariaLabel: "Passo {number} {status}",
  },
  euiTreeView: {
    listNavigationInstructions:
      "Puoi navigare rapidamente in questo elenco usando i tasti freccia.",
  },
}
