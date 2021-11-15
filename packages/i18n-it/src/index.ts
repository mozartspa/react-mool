import { CoreMessages } from "@react-mool/core"
import { EuiMessages } from "@react-mool/eui"

const coreMessages: CoreMessages = {
  core: {
    crud: {
      created: "Elemento creato",
      updated: "Elemento modificato",
      deleted: "Elemento eliminato",
      invalid_form:
        "Uno o più campi non sono corretti. Verifica i dati inseriti e riprova.",
      item_not_found: "Elemento non trovato",
    },
    i18n: {
      change_locale_error: "Impossibile caricare le traduzioni per la lingua specificata",
    },
  },
}

const euiMessages: EuiMessages = {
  eui: {
    login: {
      title: "Log in",
      username_label: "Username",
      password_label: "Password",
      invalid_credentials: "Credenziali non valide",
      login_btn: "Log in",
    },
    logout: {
      account_menu: "Account menu",
      logout_btn: "Log out",
    },
    layout: {
      dock_navigation: "Blocca",
      undock_navigation: "Sblocca",
      dashboard: "Dashboard",
    },
    action: {
      create: "Crea",
      view: "Vedi",
      edit: "Modifica",
      save: "Salva",
      delete: "Elimina",
      retry: "Riprova",
      goBack: "Torna indietro",
    },
    bulk: {
      actions: "Azioni di gruppo",
      delete_confirm: "Eliminare 1 elemento? |||| Eliminare %{smart_count} elementi?",
      deleted_items: "Elemento eliminato |||| %{smart_count} elementi eliminati",
    },
    grid: {
      showing: "Mostrando %{count} di %{total}",
      selected: "Selezionati",
      no_items: "Nessun elemento da visualizzare",
    },
    columns: {
      manage: "Gestisci colonne",
      reset: "Reimposta colonne",
    },
    filter: {
      add_filter: "Aggiungi filtro",
      remove_filter: "Rimuovi filtro",
      reset_filters: "Reimposta tutti i filtri",
    },
    confirm: {
      cancel: "Annulla",
      ok: "OK",
    },
    confirm_leave: {
      title: "Modifiche non salvate",
      message: "Ci sono modifiche non salvate. Vuoi comunque uscire?",
      leave: "Esci senza salvare",
      stay: "Rimani",
    },
    error: {
      general: "Ooops, qualcosa è andato storto",
      notfound_title: "Non trovato",
      notfound_message:
        "Hai digitato un URL non corretto, o hai seguito un link sbagliato...",
    },
    validation: {
      required: "Campo obbligatorio",
    },
  },
}

const messages = {
  ...coreMessages,
  ...euiMessages,
}

export default messages
