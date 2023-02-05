export const ACCOUNT_ID_PARAM = ':account-id'
export const USER_ID_PARAM = ':user-id'

// Production

// const BASE_DOMAIN = 'ustagil.com'

// export const WEB_APP_DOMAINS = {
//   account: `account.${BASE_DOMAIN}`,
//   accounting: `accounting.${BASE_DOMAIN}`,
//   blog: `blog.${BASE_DOMAIN}`,
//   callcenter: `callcenter.${BASE_DOMAIN}`,
//   cargomanager: `cargomanager.${BASE_DOMAIN}`,
//   nextapp: `nextapp.${BASE_DOMAIN}`,
//   schoolmanager: `schoolmanager.${BASE_DOMAIN}`,
//   storagemanager: `storagemanager.${BASE_DOMAIN}`,
//   taskmanager: `taskmanager.${BASE_DOMAIN}`,
// }

// Local - Development
const BASE_DOMAIN = 'localhost'

export const WEB_APP_DOMAINS = {
  account: `http://${BASE_DOMAIN}:3001`,
  accounting: `http://${BASE_DOMAIN}:3002`,
  blog: `http://${BASE_DOMAIN}:3003`,
  callcenter: `http://${BASE_DOMAIN}:3004`,
  cargomanager: `http://${BASE_DOMAIN}:3005`,
  docs: `http://${BASE_DOMAIN}:3006`,
  nextapp: `http://${BASE_DOMAIN}:3007`,
  schoolmanager: `http://${BASE_DOMAIN}:3008`,
  storagemanager: `http://${BASE_DOMAIN}:3009`,
  taskmanager: `http://${BASE_DOMAIN}:3010`,
}
