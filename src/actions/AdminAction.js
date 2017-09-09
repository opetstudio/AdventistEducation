import {
  MODIFICATION_TITLE_ADMIN,
  GOTO_SUB_ADMIN_PAGE
} from '../constants';

export const modificationTitleAdmin = (titleAdmin) => {
  console.log(`modificationTitleAdmin to ${titleAdmin}`);
  return {
    type: MODIFICATION_TITLE_ADMIN,
    payload: titleAdmin
  };
};

export const gotoSubAdminPage = (pagePath) => {
  console.log('');
  return {
    type: GOTO_SUB_ADMIN_PAGE,
    payload: pagePath
  };
};
export const setCurrentPagePath = (pagePath) => {
  console.log('');
  return {
    type: GOTO_SUB_ADMIN_PAGE,
    payload: pagePath
  };
};
