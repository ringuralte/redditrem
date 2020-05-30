import { EXTRACT_SUBREDDITS } from "./sidebarTypes"

export const extractSubreddits = (subreddits) => {
  return {
    type: EXTRACT_SUBREDDITS,
    payload: subreddits
  }
}