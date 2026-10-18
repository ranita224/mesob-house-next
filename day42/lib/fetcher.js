export async function fetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Request failed");
    error.status = res.status;
    throw error;
  }

  return res.json();
}