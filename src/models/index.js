// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UpdatedProviderListing, ProviderListing, ProviderProfile, WorkingHours } = initSchema(schema);

export {
  UpdatedProviderListing,
  ProviderListing,
  ProviderProfile,
  WorkingHours
};