import { buildPartialTranslations } from "@react-mool/core"
import { englishMessages, Messages } from "./en"
import { EuiTokensIT } from "./euiTokens-IT"

export const italianMessages: Messages = buildPartialTranslations(englishMessages, {
  core: {
    crud: {
      created: "Elemento creato",
      updated: "Elemento aggiornato",
      deleted: "Elemento eliminato",
      invalid_form: "Verifica i dati inseriti e riprova",
      item_not_found: "Elemento non trovato",
    },
    i18n: {
      change_locale_error: "Cambio della lingua non riuscito",
    },
  },
  eui: {
    login: {
      title: "Accedi",
      username_label: "Nome utente",
      password_label: "Password",
      login_btn: "Accedi",
      invalid_credentials: "Credenziali non valide",
    },
    logout: {
      account_menu: "Account menu",
      logout_btn: "Log out",
    },
    layout: {
      dock_navigation: "Dock navigation",
      undock_navigation: "Undock navigation",
    },
  },
  close: "Chiudi",
  open: "Apri",
  show: "Mostra",
  ...EuiTokensIT,
})
