import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  CancelButton,
  ButtonGroup,
  HiddenFileInput,
  UploadLabel,
} from "../ui/Form";
import { confirmDelete } from "../services/ConfirmDelete";
import Action from "../ui/Action";
// Fetch booths from API
const fetchBooths = async () => {
  const res = await fetch("http://localhost:5110/api/booth");
  if (!res.ok) {
    throw new Error("Failed to fetch booths");
  }
  return res.json();
};

// Delete booth from API
// const deleteBooth = async (id) => {
//   const res = await fetch(`http://localhost:5110/api/booth/${id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to delete booth");
//   }
// };

const Booths = () => {
  const queryClient = useQueryClient();

  // Fetch booths data with useQuery
  const { data, error, isPending } = useQuery({
    queryKey: ["booths"],
    queryFn: fetchBooths,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [editBooth, setEditBooth] = useState(null); // 수정할 Booth 저장

  //   const onEdit = (booth) => {
  //     if (editBooth && editBooth.id === booth.id) {
  //       // 같은 booth를 다시 클릭하면 수정 취소
  //       setEditBooth(null);
  //       setIsNewBooth(false);
  //       reset();
  //     } else {
  //       setEditBooth(booth);
  //       setIsNewBooth(true);
  //       reset(booth); // 폼에 booth 데이터 세팅
  //     }
  //   };

  //   const onCopyBooth = async (booth) => {
  //     try {
  //       const copyData = {
  //         name: booth.name + "_Copy",
  //         descrpition: booth.descrpition,
  //         imageAddress: booth.imageAddress,
  //       };

  //       const response = await fetch("http://localhost:5110/api/booth", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(copyData),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to copy Booth");
  //       }

  //       toast.success("Booth copied successfully!");
  //       await queryClient.invalidateQueries({ queryKey: ["booths"] }); // 리스트 새로고침
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };

  const [isNewBooth, setIsNewBooth] = useState(false);
  const isNewBoothHandler = () => {
    if (isNewBooth && !editBooth) {
      // 새로 생성 폼일 때 재클릭 → 닫기
      setIsNewBooth(false);
      reset();
    } else {
      setEditBooth(null);
      setIsNewBooth(true);
      reset({
        name: "",
        descrpition: "",
        imageAddress: "",
      });
    }
  };

  const cancelHandler = () => {
    setEditBooth(null);
    setIsNewBooth(false);
    reset();
  };

  // Delete mutation setup with useMutation
  //   const mutation = useMutation({
  //     mutationFn: deleteBooth,
  //     onSuccess: async () => {
  //       toast.success("Booth successfully deleted.");
  //       await queryClient.invalidateQueries({ queryKey: ["booths"] }); // Refresh booths list after deletion
  //     },
  //     onError: (err) => toast.error(err.message),
  //   });

  const onSubmit = async (data) => {
    try {
      let response;
      if (editBooth) {
        // 👉 수정 요청
        response = await fetch(
          `http://localhost:5110/api/booth/${editBooth.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
      } else {
        // 👉 새로 생성
        response = await fetch("http://localhost:5110/api/booth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok)
        throw new Error(
          editBooth ? "Failed to update Booth" : "Failed to create Booth"
        );

      toast.success(
        editBooth
          ? "Booth updated successfully!"
          : "Booth created successfully!"
      );
      reset(); // 폼 초기화
      setIsNewBooth(false); // 폼 닫기
      setEditBooth(null); // 수정 대상 해제
      await queryClient.invalidateQueries({ queryKey: ["booths"] }); // 새로고침
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5110/api/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Uploaded URL:", data.imageUrl); // Cloudinary URL
      if (data.imageUrl) {
        setValue("imageAddress", data.imageUrl); // 👉 폼 값에 URL 입력!
        toast.success("Imaege successfully uploaded!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Booths List</h1>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((booth, index) => (
              <tr key={booth.id}>
                <td>{index + 1}</td>
                <td>{booth.name}</td>
                <td>{booth.descrpition}</td>
                <td>
                  <img
                    src={booth.imageAddress}
                    alt={booth.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>
                  {/* <button onClick={() => onCopyBooth(booth)}>
                    <MdContentCopy />
                  </button>
                  <button onClick={() => onEdit(booth)}>
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={() =>
                      confirmDelete(() => mutation.mutate(booth.id))
                    }
                  >
                    <MdDeleteOutline />
                  </button> */}
                  <Action
                    booth={booth}
                    setEditBooth={setEditBooth}
                    setIsNewBooth={setIsNewBooth}
                    reset={reset}
                    queryClient={queryClient}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No booths available</div>
      )}
      {!isNewBooth && (
        <Button width="100%" onClick={isNewBoothHandler}>
          Add New Booth
        </Button>
      )}

      {isNewBooth && (
        <Modal isOpen={isNewBooth} onClose={() => setIsNewBooth(false)}>
          <Modal.Header>
            {editBooth ? "Edit Booth" : "Create New Booth"}
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <FormGroup>
                <Label>Name:</Label>
                <Input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter booth name"
                />
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Description:</Label>
                <Input
                  {...register("descrpition", {
                    required: "Description is required",
                  })}
                  placeholder="Enter description"
                />
                {errors.descrpition && (
                  <p style={{ color: "red" }}>{errors.descrpition.message}</p>
                )}
              </FormGroup>

              <FormGroup>
                <UploadLabel htmlFor="fileUpload">
                  Image File Upload
                </UploadLabel>
                <HiddenFileInput
                  id="fileUpload"
                  type="file"
                  onChange={onImageUpload}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label>Image Address:</Label> */}
                <Input hidden type="text" {...register("imageAddress")} />
                {errors.imageAddress && (
                  <p style={{ color: "red" }}>{errors.imageAddress.message}</p>
                )}
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <ButtonGroup>
                <SubmitButton type="submit" disabled={isSubmitting}>
                  Submit
                </SubmitButton>
                <CancelButton onClick={cancelHandler}>Cancel</CancelButton>
              </ButtonGroup>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Booths;
