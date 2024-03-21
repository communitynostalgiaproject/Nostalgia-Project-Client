import React from 'react';
import { createClient } from 'contentful';
// import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import NostaligaEvent from '../types/event';

const useContentful = () => {

   const contentfulClient = createClient({
       // space: process.env.CONTENTFUL_SPACE_ID,
       // accessToken: process.env.CONTENTFUL_ACCESS_ID
       space: 'zs1lze0d37xl',
       accessToken: 'KXiJBT5G8g6UAY75gbHlzcpGio0RhcoMykOG915AcRw'
   });

   const getEvents = async () => {
       try {
           const events = await contentfulClient.getEntries();

            console.log('CONTENTFUL DATA: ', events);

           return events.items;
       } catch(err) {
           console.log(`ERROR FETCHING CONTENFUL DATA --> ${err}`);
       };
   };

   return { getEvents }
};

export default useContentful;
