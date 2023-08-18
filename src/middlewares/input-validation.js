const inputValidation = () => {
  return {
    before: async (handler) => {
      const { httpMethod, body } = handler.event;
      if (httpMethod === "POST") {
        const parseBody = JSON.parse(body);
        if (!parseBody.email || !parseBody.password) {
          throw new Error("Invalid input: name and age are required");
        }
        handler.event.body = parseBody;
      }
    },
  };
};

module.exports = inputValidation;
