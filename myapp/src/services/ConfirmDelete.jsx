import toast from "react-hot-toast";

export function confirmDelete(onConfirm) {
  toast.custom((t) => (
    <div
      style={{
        padding: "16px 20px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "220px",
      }}
    >
      <div>Do you want to delete?</div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
          }}
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
        <button
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));
}
