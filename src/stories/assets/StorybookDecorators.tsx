import { QueryClient, QueryClientProvider } from "react-query";

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