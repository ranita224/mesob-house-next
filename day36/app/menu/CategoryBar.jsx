export default function CategoryBar({ categories }) {
  return (
    <div className="flex gap-2 mt-4">
      {categories.map((category) => (
        <span key={category} className="border rounded-full px-3 py-1 text-sm">
          {category}
        </span>
      ))}
    </div>
  );
}