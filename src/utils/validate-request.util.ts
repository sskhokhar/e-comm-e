export const ValidateRequest = (dto: any, validateOn: 'body' | 'query' | 'param') => {
  return {
    preHandler: (req, res, done) => {
      try {
        dto.parse(req[validateOn]);
        done();
      } catch (error) {
        done(error);
      }
    },
  };
};
