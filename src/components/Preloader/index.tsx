import "./styles.css";

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-spinner"></div>
    </div>
  );
}
