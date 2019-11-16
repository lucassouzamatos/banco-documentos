const toDate = value => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
};

export default toDate;
