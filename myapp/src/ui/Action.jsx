import { useState, useEffect, useRef } from "react";
import { MdContentCopy, MdDeleteOutline, MdMoreHoriz } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { confirmDelete } from "../services/ConfirmDelete";

function Action({ booth, setEditBooth, setIsNewBooth, reset, queryClient }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const deleteBooth = async (id) => {
    const res = await fetch(`http://localhost:5110/api/booth/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete booth");
    }
  };

  const mutation = useMutation({
    mutationFn: deleteBooth,
    onSuccess: async () => {
      toast.success("Booth successfully deleted.");
      await queryClient.invalidateQueries({ queryKey: ["booths"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const onEdit = () => {
    setEditBooth((current) => {
      if (current && current.id === booth.id) {
        setIsNewBooth(false);
        reset();
        return null;
      } else {
        setIsNewBooth(true);
        reset(booth);
        return booth;
      }
    });
    setIsOpen(false); // 메뉴 닫기
  };

  const onCopyBooth = async () => {
    try {
      const copyData = {
        name: booth.name + "_Copy",
        descrpition: booth.descrpition,
        imageAddress: booth.imageAddress,
      };

      const response = await fetch("http://localhost:5110/api/booth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(copyData),
      });

      if (!response.ok) throw new Error("Failed to copy Booth");

      toast.success("Booth copied successfully!");
      await queryClient.invalidateQueries({ queryKey: ["booths"] });
    } catch (error) {
      toast.error(error.message);
    }
    setIsOpen(false); // 메뉴 닫기
  };

  const onDelete = () => {
    confirmDelete(() => mutation.mutate(booth.id));
    setIsOpen(false); // 메뉴 닫기
  };

  // 메뉴 바깥 클릭시 닫힘
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={menuRef}
    >
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <MdMoreHoriz size={20} />
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "25px",
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 10,
            minWidth: "120px",
          }}
        >
          <button style={menuItemStyle} onClick={onCopyBooth}>
            <MdContentCopy style={{ marginRight: "6px" }} /> Copy
          </button>
          <button style={menuItemStyle} onClick={onEdit}>
            <FaRegEdit style={{ marginRight: "6px" }} /> Edit
          </button>
          <button style={menuItemStyle} onClick={onDelete}>
            <MdDeleteOutline style={{ marginRight: "6px" }} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  width: "100%",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  textAlign: "left",
};

export default Action;
