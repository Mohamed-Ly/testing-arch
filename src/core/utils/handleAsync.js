// ======================= ASYNC WRAPPER =======================
// Wrapper to catch async errors in Express route handlers
// Eliminates need for try/catch in every controller

const handleAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default handleAsync;