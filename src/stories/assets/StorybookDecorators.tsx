import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

export const createQueryClientDecorator = (queryClient: QueryClient) => {
  return (storyFn: any) => {
    return (
      <QueryClientProvider client={queryClient}>
        {storyFn()}
      </QueryClientProvider>
    );
  };
};

export const QueryClientDecorator = (storyFn: any) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {storyFn}
    </QueryClientProvider>
  );
};