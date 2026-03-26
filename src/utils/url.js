export function buildQueryString(queryObj = {}) {
  const searchParams = new URLSearchParams();

  for (const key in queryObj) {
    const value = queryObj[key];

    // Skip undefined, null, and empty string
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  }

  return searchParams.toString();
}
