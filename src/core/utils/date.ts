export const addDay = (date: string, addDays = 1): string => {
  const result = new Date(date);
  result.setDate(result.getDate() + addDays);
  console.log(result);
  return result.toISOString();
};
