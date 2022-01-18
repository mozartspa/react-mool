export const euiTokens = {
  euiAccordion: {
    isLoading: "Caricamento",
  },
  euiBasicTable: {
    noItemsMessage: "Nessun elemento trovato",
    tableCaptionWithPagination: "{tableCaption}; Pagina {page} di {pageCount}.",
    tableAutoCaptionWithPagination:
      "Questa tabella contiene {itemCount} elementi di {totalItemCount}; Pagina {page} di {pageCount}.",
    tableSimpleAutoCaptionWithPagination:
      "Questa tabella contiene {itemCount} elementi; Pagina {page} di {pageCount}.",
    tableAutoCaptionWithoutPagination: "Questa tabella contiene {itemCount} elementi.",
    selectAllRows: "Seleziona tutto",
    selectThisRow: "Seleziona questo elemento",
    tablePagination: "Paginazione della tabella: {tableCaption}",
  },
  euiCollapsedItemActions: {
    allActions: "Tutte le azioni",
  },
  euiBottomBar: {
    screenReaderHeading: "Controlli a livello di pagina",
    customScreenReaderAnnouncement:
      "C'è un nuovo punto di riferimento della regione chiamato {landmarkHeading} con controlli a livello di pagina alla fine del documento.",
    screenReaderAnnouncement:
      "C'è un nuovo punto di riferimento della regione con controlli a livello di pagina alla fine del documento.",
  },
  euiBreadcrumbs: {
    collapsedBadge: {
      ariaLabel: "Vedi breadcrumb compressi",
    },
    nav: {
      ariaLabel: "Breadcrumbs",
    },
  },
  euiCardSelect: {
    selected: "Selezionato",
    unavailable: "Non disponibile",
    select: "Seleziona",
  },
  euiCodeEditor: {
    startInteracting: "Premi Invio per iniziare a interagire con il codice.",
    startEditing: "Premi Invio per iniziare la modifica.",
    stopInteracting:
      "Al termine, premi Esc per interrompere l'interazione con il codice.",
    stopEditing: "Quando hai finito, premi Esc per interrompere la modifica.",
  },
  euiCodeBlock: {
    copyButton: "Copia",
    fullscreenCollapse: "Comprimi",
    fullscreenExpand: "Espandi",
  },
  euiColorPickerSwatch: {
    ariaLabel: "Seleziona {colore} come colore",
  },
  euiColorPicker: {
    popoverLabel: "Finestra di dialogo per la selezione del colore",
    colorLabel: "Valore del colore",
    colorErrorMessage: "Valore del colore non valido",
    transparent: "Trasparente",
    alphaLabel: "Valore del canale alfa (opacità).",
    openLabel: "Premi il tasto Esc per chiudere il popover",
    closeLabel:
      "Premere il tasto giù per aprire un popover contenente le opzioni di colore",
  },
  euiColorStopThumb: {
    buttonAriaLabel:
      "Premere il tasto Invio per modificare questo stop. Premi Esc per mettere a fuoco il gruppo",
    buttonTitle: "Clicca per modificare, trascina per riposizionare",
    screenReaderAnnouncement:
      "Si è aperto un popup con un modulo di modifica dell'interruzione del colore.\n Tab avanti per scorrere i controlli del modulo o premi Esc per chiudere questo popup.",
    stopLabel: "Valore di stop",
    stopErrorMessage: "Il valore è fuori intervallo",
    removeLabel: "Rimuovi questo stop",
  },
  euiColorStops: {
    screenReaderAnnouncement:
      "{label}: {readOnly} {disabled} Selettore di interruzione colore. Ogni fermata è composta da un numero e dal valore del colore corrispondente. Utilizzare i tasti freccia giù e su per selezionare le singole fermate. Premere il tasto Invio per creare una nuova fermata.",
  },
  euiHue: {
    label: "Selezionare il valore 'tonalità' della modalità colore HSV",
  },
  euiSaturation: {
    ariaLabel: "Saturazione della modalità colore HSV e cursore a 2 assi del valore",
    screenReaderInstructions:
      "Tasti freccia per navigare nel gradiente di colore quadrato. Le coordinate verranno utilizzate per calcolare i numeri di 'saturazione' e 'valore' della modalità colore HSV, nell'intervallo da 0 a 1. Sinistra e destra per modificare la saturazione. Su e giù cambia il valore.",
  },
  euiComboBoxPill: {
    removeSelection: "Rimuovi {children} dalla selezione in questo gruppo",
  },
  euiComboBoxOptionsList: {
    loadingOptions: "Opzioni di caricamento",
    delimiterMessage: "Aggiungi ogni elemento separato da {delimiter}",
    alreadyAdded: "{label} è già stata aggiunta",
    createCustomOption: "Aggiungi {searchValue} come opzione personalizzata",
    noMatchingOptions: "{searchValue} non corrisponde ad alcuna opzione",
    noAvailableOptions: "Non ci sono opzioni disponibili",
    allOptionsSelected: "Hai selezionato tutte le opzioni disponibili",
  },
  euiControlBar: {
    screenReaderHeading: "Controlli a livello di pagina",
    customScreenReaderAnnouncement:
      "C'è un nuovo punto di riferimento della regione chiamato {landmarkHeading} con controlli a livello di pagina alla fine del documento.",
    screenReaderAnnouncement:
      "C'è un nuovo punto di riferimento della regione con controlli a livello di pagina alla fine del documento.",
  },
  euiDataGridCellButtons: {
    expandButtonTitle:
      "Fare clic o premere invio per interagire con il contenuto della cella",
  },
  euiDataGridCell: {
    position: "Riga: {row}; Colonna: {col}",
  },
  euiColumnActions: {
    hideColumn: "Nascondi colonna",
    moveLeft: "Muovere a sinistra",
    moveRight: "Muovere a destra",
    sort: "Ordina {schemaLabel}",
  },
  euiDataGridHeaderCell: {
    headerActions: "Azioni di intestazione",
  },
  euiColumnSelector: {
    button: "Colonne",
    buttonActiveSingular: "{numberOfHiddenFields} colonna nascosta",
    buttonActivePlural: "{numberOfHiddenFields} colonne nascoste",
    search: "Cerca",
    searchcolumns: "Cerca colonne",
    selectAll: "Mostra tutto",
    hideAll: "Nascondi tutto",
  },
  euiColumnSortingDraggable: {
    defaultSortAsc: "A-Z",
    defaultSortDesc: "Z-A",
    activeSortLabel: "{display} sta ordinando questa griglia di dati",
    removeSortLabel: "Rimuovi {display} dall'ordinamento della griglia di dati",
    toggleLegend: "Seleziona il metodo di ordinamento per {display}",
  },
  euiColumnSorting: {
    button: "Ordina i campi",
    buttonActive: "{numberOfSortedFields} campi ordinati",
    emptySorting: "Attualmente nessun campo è ordinato",
    pickFields: "Scegli i campi in base a cui ordinare",
    sortFieldAriaLabel: "Ordina per: ",
    clearAll: "Cancella l'ordinamento",
  },
  euiDataGridToolbar: {
    fullScreenButton: "A schermo intero",
    fullScreenButtonActive: "Esci dalla modalità schermo intero",
  },
  euiStyleSelector: {
    buttonText: "Densità",
    buttonLegend: "Selezionare la densità di visualizzazione per la griglia dati",
    labelExpanded: "Densità espansa",
    labelNormal: "Densità normale",
    labelCompact: "Densità compatta",
  },
  euiDataGridPagination: {
    detailedPaginationLabel: "Paginazione per la griglia precedente: {label}",
    paginationLabel: "Paginazione per griglia precedente",
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
    ariaLabel: "{label}; Pagina {page} di {pageCount}.",
    ariaLabelledBy: "Pagina {page} di {pageCount}.",
    screenReaderNotice: "La cella contiene contenuto interattivo.",
  },
  euiDatePopoverButton: {
    invalidTitle: "Data non valida: {title}",
    outdatedTitle: "Aggiornamento necessario: {title}",
  },
  euiRelativeTab: {
    numberInputError: "Deve essere >= 0",
    numberInputLabel: "Importo dell'intervallo di tempo",
    dateInputError: "Deve essere un intervallo valido",
    unitInputLabel: "Intervallo di tempo relativo",
    roundingLabel: "Arrotonda a {unit}",
    relativeDate: "{position} data",
    fullDescription: "L'unità è modificabile. Attualmente impostata su {unit}.",
  },
  euiCommonlyUsedTimeRanges: {
    legend: "Usato comunemente",
  },
  euiQuickSelect: {
    legendText: "Seleziona rapidamente un intervallo di tempo",
    quickSelectTitle: "Seleziona rapida",
    previousLabel: "Finestra temporale precedente",
    nextLabel: "Finestra temporale successiva",
    tenseLabel: "Tempo teso",
    valueLabel: "Valore del tempo",
    unitLabel: "Unità di tempo",
    applyButton: "Applica",
    fullDescription: "Attualmente impostato su {timeTense} {timeValue} {timeUnit}.",
  },
  euiRecentlyUsed: {
    legend: "Intervalli di date utilizzati di recente",
  },
  euiRefreshInterval: {
    legend: "Aggiorna ogni",
    start: "Inizia",
    stop: "Ferma",
    fullDescription:
      "Intervallo di aggiornamento attualmente impostato su {optionValue} {optionText}.",
  },
  euiSuperDatePicker: {
    showDatesButtonLabel: "Mostra le date",
  },
  euiSuperUpdateButton: {
    refreshButtonLabel: "Ricarica",
    updatingButtonLabel: "In aggiornamento",
    updateButtonLabel: "Aggiorna",
    cannotUpdateTooltip: "Impossibile aggiornare",
    clickToApplyTooltip: "Clicca per confermare",
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
    maskPassword: "Nascondi password",
  },
  euiFilePicker: {
    promptText: "Seleziona o trascina e rilascia un file",
    filesSelected: "{fileCount} file selezionati",
    clearSelectedFiles: "Cancella i file selezionati",
    removeSelected: "Rimuovi",
  },
  euiFormControlLayoutClearButton: {
    label: "Cancella input",
  },
  euiForm: {
    addressFormErrors: "Si prega di risolvere gli errori evidenziati.",
  },
  euiSuperSelectControl: {
    selectAnOption: "Seleziona un'opzione: {selectedValue}, è selezionato",
  },
  euiSuperSelect: {
    screenReaderAnnouncement:
      "Ti trovi in un selettore di moduli di {optionsCount} e devi selezionare una singola opzione.\n Usa i tasti su e giù per navigare o Esci per chiudere.",
  },
  euiHeaderLinks: {
    openNavigationMenu: "Apri menu",
    appNavigation: "Menu dell'app",
  },
  euiImage: {
    closeImage: "Chiudi l'immagine {alt} a schermo intero",
    openImage: "Apri l'immagine {alt} a schermo intero",
  },
  euiLink: {
    external: {
      ariaLabel: "Link esterno",
    },
    newTarget: {
      screenReaderOnlyText: "(si apre in una nuova scheda o finestra)",
    },
  },
  euiPinnableListGroup: {
    pinExtraActionLabel: "Blocca l'elemento",
    pinnedExtraActionLabel: "Sblocca l'elemento",
  },
  euiMarkdownEditorFooter: {
    uploadingFiles: "Fare clic per caricare i file",
    openUploadModal: "Apri la finestra di caricamento dei file",
    unsupportedFileType: "Tipo di file non supportato",
    supportedFileTypes: "File supportati: {supportedFileTypes}",
    showSyntaxErrors: "Mostra errori",
    showMarkdownHelp: "Mostra aiuti per markdown",
    syntaxTitle: "Guida alla sintassi",
    errorsTitle: "Errori",
    mdSyntaxLink: "Sintassi markdown in stile GitHub",
    syntaxModalDescriptionPrefix: "Questo editor usa",
    syntaxModalDescriptionSuffix:
      "Puoi anche utilizzare questi plug-in di sintassi aggiuntivi per aggiungere contenuti avanzati al tuo testo.",
    closeButton: "Chiudi",
    syntaxPopoverDescription: "Questo editor usa",
  },
  euiMarkdownEditorToolbar: {
    editor: "Editor",
    previewMarkdown: "Anteprima",
  },
  euiModal: {
    closeModal: "Chiude questa finestra modale",
  },
  euiNotificationEventMessages: {
    accordionButtonText: "+ {messagesLength} ancora",
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
    readAria: "{eventName} è stato letto",
    unreadAria: "{eventName} non è stato letto",
    read: "Leggere",
    unread: "Non leggere",
  },
  euiPaginationButton: {
    longPageString: "Pagina {page} di {totalPages}",
    shortPageString: "Pagina {page}",
  },
  euiPagination: {
    previousPage: "Pagina precedente, {page}",
    disabledPreviousPage: "Pagina precedente",
    firstRangeAriaLabel: "Saltare le pagine 2 in {lastPage}",
    lastRangeAriaLabel: "Saltare le pagine da {firstPage} a {lastPage}",
    nextPage: "Pagina successiva, {page}",
    disabledNextPage: "Pagina successiva",
    pageOfTotalCompressed: "{page} di {total}",
  },
  euiPopover: {
    screenReaderAnnouncement:
      "Sei in una finestra di dialogo. Per chiudere questa finestra di dialogo, premi Esc.",
  },
  euiProgress: {
    valueText: "{value}%",
  },
  euiResizableButton: {
    horizontalResizerAriaLabel:
      "Premere sinistra o destra per regolare le dimensioni dei pannelli",
    verticalResizerAriaLabel: "Premere su o giù per regolare le dimensioni dei pannelli",
  },
  euiResizablePanel: {
    toggleButtonAriaLabel: "Premere per attivare/disattivare questo pannello",
  },
  euiSelectableListItem: {
    includedOption: "Opzione inclusa.",
    includedOptionInstructions: "Per escludere questa opzione, premere invio.",
    excludedOption: "Opzione esclusa.",
    excludedOptionInstructions: "Per deselezionare questa opzione, premere invio.",
  },
  euiSelectableTemplateSitewide: {
    searchPlaceholder: "Cerca qualsiasi cosa...",
    loadingResults: "Caricamento risultati",
    noResults: "Nessun risultato disponibile",
    onFocusBadgeGoTo: "Vai a",
  },
  euiSelectable: {
    loadingOptions: "Opzioni in caricamento",
    noMatchingOptions: "{searchValue} non corrisponde ad alcuna opzione",
    noAvailableOptions: "Nessuna opzione disponibile",
    placeholderName: "Filtra le opzioni",
  },
  euiStat: {
    loadingText: "Statistica in caricamento",
  },
  euiStepStrings: {
    step: "Passaggio {number}: {title}",
    simpleStep: "Passaggio {number}",
    complete: "Passaggio {number}: {title} è completo",
    simpleComplete: "Passaggio {number} è completo",
    warning: "Passaggio {number}: {title} ha avvisi",
    simpleWarning: "Passaggio {number} ha avvisi",
    errors: "Passaggio {number}: {title} ha errori",
    simpleErrors: "Passaggio {number} ha errori",
    incomplete: "Passaggio {number}: {title} è incompleto",
    simpleIncomplete: "Passaggio {number} è incompleto",
    disabled: "Passaggio {number}: {title} è disabilitato",
    simpleDisabled: "Passaggio {number} è disabilitato",
    loading: "Passaggio {number}: {title} sta caricando",
    simpleLoading: "Passaggio {number} sta caricando",
    current: "Passaggio corrente {number}: {title}",
    simpleCurrent: "Passaggio corrente è {number}",
  },
  euiTableSortMobile: {
    sorting: "Ordinamento",
  },
  euiTableHeaderCell: {
    titleTextWithDesc: "{innerText}; {description}",
  },
  euiTablePagination: {
    rowsPerPage: "Elementi per pagina",
    rowsPerPageOption: "{rowsPerPage} elementi",
  },
  euiToast: {
    dismissToast: "Ignora l'avviso",
    newNotification: "Nuova notifica",
    notification: "Notifica",
  },
  euiTourStepIndicator: {
    isActive: "attivo",
    isComplete: "completo",
    isIncomplete: "incompleto",
    ariaLabel: "Passaggio {number} {status}",
  },
  euiTourStep: {
    endTour: "Termina tour",
    skipTour: "Salta tour",
    closeTour: "Chiudi tour",
  },
  euiTreeView: {
    listNavigationInstructions:
      "È possibile navigare rapidamente in questo elenco utilizzando i tasti freccia.",
    ariaLabel: "{nodeLabel} figlio di {ariaLabel}",
  },
}
