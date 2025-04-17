import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// 🚀 Fetch: 설정값 가져오기
const fetchBoothSetting = async (boothId) => {
  const res = await fetch(`http://localhost:5110/api/BoothSetting/${boothId}`);
  if (!res.ok) throw new Error("Failed to fetch booth setting");
  return res.json();
};

// 💾 Save: 서버에 설정값 저장
const saveBoothSetting = async (setting) => {
  const res = await fetch(
    `http://localhost:5110/api/BoothSetting/${setting.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(setting),
    }
  );
  if (!res.ok) throw new Error("Failed to save booth setting");
  // 응답 바디가 비어있을 경우 예외 처리
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

function Settings({ boothId }) {
  const queryClient = useQueryClient();

  const {
    data: setting,
    isPending,
    error,
  } = useQuery({
    queryKey: ["boothSetting", boothId],
    queryFn: () => fetchBoothSetting(boothId),
  });

  const mutation = useMutation({
    mutationFn: saveBoothSetting,
    onSuccess: async () => {
      toast.success("Setting has been updated");
      await queryClient.invalidateQueries({
        queryKey: ["boothSetting", boothId],
      });
    },
    onError: (error) => {
      toast.error(`Save failed: ${error.message}`);
    },
  });

  const [localSetting, setLocalSetting] = useState(null);

  // 서버 데이터 들어오면 로컬에도 채워주기 (한 번만)
  useEffect(() => {
    if (setting && !localSetting) {
      setLocalSetting(setting);
    }
  }, [setting, localSetting]);

  const handleBlur = () => {
    if (localSetting) {
      mutation.mutate(localSetting);
    }
  };

  const handleChange = (field, value) => {
    setLocalSetting((prev) => ({ ...prev, [field]: value }));
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Booth Setting</h2>

      <div>
        <label>Booth Name:</label>
        <input
          value={localSetting?.boothName || ""}
          onChange={(e) => handleChange("boothName", e.target.value)}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label>Max People:</label>
        <input
          type="number"
          value={localSetting?.maxPeople || 0}
          onChange={(e) =>
            handleChange("maxPeople", parseInt(e.target.value) || 0)
          }
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label>Active:</label>
        <input
          type="checkbox"
          checked={!!localSetting?.isActive}
          onChange={(e) => handleChange("isActive", e.target.checked)}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label>Note:</label>
        <input
          value={localSetting?.note || ""}
          onChange={(e) => handleChange("note", e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default Settings;
