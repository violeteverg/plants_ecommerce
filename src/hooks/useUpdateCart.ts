import { editCart } from "@/services/postdata";
import { TPutCart } from "@/utils/schemas/cartSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateCartProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useUpdateCart({ onSuccess, onError }: UseUpdateCartProps = {}) {
  const queryClient = useQueryClient();

  const { mutate: updateCart } = useMutation({
    mutationFn: ({
      cartId,
      updateCart,
    }: {
      cartId: number;
      updateCart: TPutCart;
    }) => editCart(cartId, updateCart),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["CARTITEMS"] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error("Error updating cart item:", error);
      if (onError) onError(error);
    },
  });

  return { updateCart };
}
