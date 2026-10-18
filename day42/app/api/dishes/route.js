import { dishes, paginate } from "../../menu/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const matches = q
    ? dishes.filter((dish) =>
        [dish.name, dish.nameAm, dish.category, dish.description, ...dish.ingredients]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : dishes;

  const pageParam = searchParams.get("page");

  if (pageParam !== null) {
    const page = Number(pageParam);
    if (!Number.isInteger(page) || page < 1) {
      return Response.json(
        { error: "page must be a positive whole number" },
        { status: 400 }
      );
    }
    return Response.json(paginate(matches, page));
  }

  return Response.json({ items: matches, total: matches.length });
}