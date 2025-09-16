import { useQuery } from "@tanstack/react-query";
import { getFilteredpdfRequest } from "../../api";

export const useGetFilteredpdfRequest = (filters) => {
  const {
    data: data=[],
    isFetching,
    isSuccess,
    error,
  } = useQuery({
    queryFn: () =>getFilteredpdfRequest(filters),
    queryKey: ["pdfRequests",filters],
  });
  return { data, isFetching, isSuccess, error };
};
