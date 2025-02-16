import { useEffect, useState } from "react";
import "./styles.css";

export default function Toast({ message, onClose }: { message: string | null; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!visible) return null;

  return <div className="toast-message">{message}</div>;
}
