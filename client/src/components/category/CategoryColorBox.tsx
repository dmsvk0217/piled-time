interface CategoryColorBoxProps {
  color: string;
  size?: number; // default: 20
}

export default function CategoryColorBox({ color, size = 20 }: CategoryColorBoxProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded border"
        title={color}
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          minWidth: size,
        }}
      />
      <span className="text-sm text-gray-600">{color}</span>
    </div>
  );
}
