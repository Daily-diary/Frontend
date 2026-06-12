const parseUTC = (dateStr: string): Date => {
  const s = /Z|[+-]\d{2}:\d{2}$/.test(dateStr) ? dateStr : dateStr + 'Z';
  return new Date(s);
};

const toKST = (dateStr: string): Date =>
  new Date(parseUTC(dateStr).getTime() + 9 * 3600000);

export const formatDateKST = (dateStr: string): string => {
  const d = toKST(dateStr);
  return `${d.getUTCFullYear()}년 ${d.getUTCMonth() + 1}월 ${d.getUTCDate()}일`;
};

export const formatCommentDateKST = (dateStr: string): string => {
  const d = toKST(dateStr);
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
};
