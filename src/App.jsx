import AppRoutes from "./Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient(); 
  return (
    <>
      <QueryClientProvider client={queryClient}> 
        <AppRoutes />
      </QueryClientProvider>
    </>
  );
}

export default App;
