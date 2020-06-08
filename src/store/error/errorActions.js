import {
  ERROR_MESSAGE_FOR_HOMEPAGE
} from "./errorTypes"

export const errorMessageForHomePage = (errorMessage) => {
  return {
    type: ERROR_MESSAGE_FOR_HOMEPAGE,
    payload: errorMessage
  }
}

// export const tokenAuthError = () => {
//   return {
//     type: TOKEN_AUTHORIZATION_ERROR,
//     payload: "Error authorizing token" 
//   }
// }
