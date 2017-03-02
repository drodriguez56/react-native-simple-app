import { SELECTED_LIBRARY } from './types';

export const selectLibrary = (libraryId) => {
  return{
    type: SELECTED_LIBRARY,
    payload: libraryId
  }
}