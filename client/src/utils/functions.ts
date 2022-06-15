import moment from 'moment';

export const capitalize = (sourceString: string): string => (
  sourceString.charAt(0).toUpperCase() + sourceString.slice(1)
);

export const formatDate = (
  date: Date | string,
  format: string = 'DD.MM.YYYY',
) => moment(date).format(format);

export const checkOnline = (lastSeenDate?: string) => {
  if (!lastSeenDate) return false;
  const currentDate = new Date();
  const date = new Date(lastSeenDate);
  return currentDate.getTime() - date.getTime() < 5 * 60 * 1000;
};

export const trimString = (s: string, length: number = 5) => (
  (s.length > length) ? `${s.slice(0, length)}...` : s
);
