import { deleteCart } from "@/services/postdata";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useRemoveCartProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useRemoveCart({ onSuccess, onError }: useRemoveCartProps = {}) {
  const queryClient = useQueryClient();

  const { mutate: removeCart } = useMutation({
    mutationFn: (cartId: number) => deleteCart(cartId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["CARTITEMS"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error("Error cannot delete cart:", error);
      if (onError) onError(error);
    },
  });

  return { removeCart };
}
