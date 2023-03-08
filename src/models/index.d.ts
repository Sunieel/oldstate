import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class WorkingHours {
  readonly Monday?: string | null;
  readonly Tuesday?: string | null;
  readonly Wednesday?: string | null;
  readonly Thursday?: string | null;
  readonly Friday?: string | null;
  readonly Saturday?: string | null;
  readonly Sunday?: string | null;
  constructor(init: ModelInit<WorkingHours>);
}

type UpdatedProviderListingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProviderListingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProviderProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UpdatedProviderListing {
  readonly id: string;
  readonly place_id: string;
  readonly name?: string | null;
  readonly site?: string | null;
  readonly type?: string | null;
  readonly subtypes?: string | null;
  readonly category?: string | null;
  readonly phone?: string | null;
  readonly full_address?: string | null;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly logo?: string | null;
  readonly working_hours?: WorkingHours | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UpdatedProviderListing, UpdatedProviderListingMetaData>);
  static copyOf(source: UpdatedProviderListing, mutator: (draft: MutableModel<UpdatedProviderListing, UpdatedProviderListingMetaData>) => MutableModel<UpdatedProviderListing, UpdatedProviderListingMetaData> | void): UpdatedProviderListing;
}

export declare class ProviderListing {
  readonly id: string;
  readonly name: string;
  readonly site: string;
  readonly type: string;
  readonly subtypes?: string | null;
  readonly category?: string | null;
  readonly phone?: string | null;
  readonly full_address: string;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly logo?: string | null;
  readonly working_hours?: WorkingHours | null;
  readonly place_id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ProviderListing, ProviderListingMetaData>);
  static copyOf(source: ProviderListing, mutator: (draft: MutableModel<ProviderListing, ProviderListingMetaData>) => MutableModel<ProviderListing, ProviderListingMetaData> | void): ProviderListing;
}

export declare class ProviderProfile {
  readonly id: string;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly firstname?: string | null;
  readonly surname?: string | null;
  readonly firm?: string | null;
  readonly phone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ProviderProfile, ProviderProfileMetaData>);
  static copyOf(source: ProviderProfile, mutator: (draft: MutableModel<ProviderProfile, ProviderProfileMetaData>) => MutableModel<ProviderProfile, ProviderProfileMetaData> | void): ProviderProfile;
}