import { QueryClient, QueryClientProvider } from "react-query";
import { LandingPageContextProvider } from "../../contexts/LandingPageContext";

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

export const createLandingPageContextDecorator = (queryClient: QueryClient) => {
  return (storyFn: any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <LandingPageContextProvider>
          {storyFn()}
        </LandingPageContextProvider>
      </QueryClientProvider>
    );
  };
};