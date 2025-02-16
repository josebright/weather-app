import "./styles.css";

export default function CityInfoItem({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div className="city-info-item">
      <strong>{label}:</strong> {value ?? ""}
    </div>
  );
}
