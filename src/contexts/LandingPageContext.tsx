import React, { createContext, useState, useContext, useEffect } from 'react';
import { Experience } from '../types/experience';
import { useMutation, useQuery, useQueryClient, UseMutationResult } from 'react-query';
import experiencesRequest from '../api/experiences.request';
import usersRequest from '../api/users.request';
import useFetchExperiencesByBbox from '../api/queries/fetchExperiencesByBbox';

interface LandingPageContextType {
  bbox: string | null;
  setBbox: React.Dispatch<React.SetStateAction<string | null>>;
  selectedExperience: Experience | null;
  setSelectedExperience: React.Dispatch<React.SetStateAction<Experience | null>>;
  editModalOpen: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteModalOpen: boolean;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  experiences: Experience[] | undefined;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  user: any;
  deleteExperience: UseMutationResult<void, any, void, unknown>;
}

const LandingPageContext = createContext<LandingPageContextType | undefined>(undefined);

export const useLandingPageContext = () => {
  const context = useContext(LandingPageContext);

  if (!context) throw new Error("useLandingPageContext must be used within a LandingPageProvider");

  return context;
}

interface LandingPageContextProviderProps {
  children: React.ReactNode;
}

export const LandingPageContextProvider: React.FC<LandingPageContextProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [bbox, setBbox] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { data: user } = useQuery("currentUser", async () => {
    return await usersRequest.fetchData();
  });

  const {
    experiences,
    setExperiences,
    fetchNextPage,
    hasNextPage
  } = useFetchExperiencesByBbox(bbox);

  const deleteExperience = useMutation(async () => {
    await experiencesRequest.delete(selectedExperience?._id);
  }, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["experiences", bbox]);

      setExperiences(experiences.filter((experience: Experience) => {
        return experience._id !== selectedExperience?._id
      }));
      setDeleteModalOpen(false);
      setSelectedExperience(null);
    },
    onError: (err: any) => {
      console.error(`Unable to delete experience: ${err}`);
    }
  });  

  return (
    <LandingPageContext.Provider
      value={{
        bbox,
        setBbox,
        selectedExperience,
        setSelectedExperience,
        editModalOpen,
        setEditModalOpen,
        deleteModalOpen,
        setDeleteModalOpen,
        sidebarOpen,
        setSidebarOpen,
        experiences,
        setExperiences,
        fetchNextPage,
        hasNextPage,
        user,
        deleteExperience
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
}