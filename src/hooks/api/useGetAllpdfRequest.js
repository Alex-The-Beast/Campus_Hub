import { useQuery } from "@tanstack/react-query";
import { getAllpdfRequest } from "../../api";

export const useGetAllpdfRequest = () => {
  const {
    data: data=[],
    isFetching,
    isSuccess,
    error,
  } = useQuery({
    queryFn: () => getAllpdfRequest(),
    queryKey: ["pdfRequests"],
  });
  return { data, isFetching, isSuccess, error };
};
