export interface PopupProps {
  title: string;
  message: string;
  onConfirmMessage: string;
  onCancelMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
  buttonType: "danger" | "success" | null;
}

export default function Popup({
  title,
  message,
  onConfirmMessage,
  onCancelMessage,
  onConfirm = () => {},
  onCancel = () => {},
  buttonType,
}: {
  title: string;
  message: string;
  onConfirmMessage: string;
  onCancelMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
  buttonType: "danger" | "success";
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="rounded-lg bg-white p-8 shadow-2xl fixed">
        <h2 className="text-lg font-bold">{title || "DO THIS"}</h2>

        <p className="mt-2 text-sm text-gray-500">{message || "message"}</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded ${
              buttonType == "danger"
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            } px-4 py-2 text-sm font-medium`}
          >
            {onConfirmMessage || "CONFIRM"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
          >
            {onCancelMessage || "CANCEL"}
          </button>
        </div>
      </div>
    </div>
  );
}
