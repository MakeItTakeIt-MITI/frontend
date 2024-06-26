import { useQuery } from "@tanstack/react-query";
import { getReviewDetails } from "../../api/reviews";

export const useGetReviewDetailQuery = (
  ratingId: number | null | undefined
) => {
  return useQuery({
    queryKey: ["Review Details"],
    queryFn: () => getReviewDetails(ratingId),
  });
};
