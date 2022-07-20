var dateFormat = require('dateformat');

export const convertArticleDate = (date: string): string => {
  return dateFormat(date);
};
