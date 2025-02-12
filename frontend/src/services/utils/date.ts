export const getDate = (date: number) => {
  const givenDate = new Date(date);
  const day = givenDate.getDate();
  const month = givenDate.getMonth() + 1;
  const year = givenDate.getFullYear();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'December',
  ];

  return { day, month: months[month - 1], year };
};
