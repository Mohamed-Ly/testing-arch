// ======================= PAGINATION UTILITIES =======================
// Pagination helper functions for consistent pagination across modules
// Calculates limit/offset and formats paginated response

export const pagination = (page, size) => {
  const pageNum = parseInt(page) || 1;
  const sizeNum = parseInt(size) || 10;
  const limit = sizeNum > 100 ? 100 : sizeNum;
  const offset = (pageNum - 1) * limit;
  return { limit, offset, page: pageNum, size: limit };
};

export const responsePagination = (result, page, limit, dataKey = "data") => {
  const pageNum = parseInt(page) || 1;
  const totalItems = result.count || result.length || 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    [dataKey]: result.rows || result,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};