import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useFormHandler = (schema, onSubmitAction, messages) => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await onSubmitAction(data);
      toast({
        title: messages.successTitle || "Success",
        description:
          messages.successDescription || "Action completed successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast({
        title: messages.errorTitle || "Error",
        description:
          messages.errorDescription || "An error occurred during the action",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
