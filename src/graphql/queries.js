/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUpdatedProviderListing = /* GraphQL */ `
  query GetUpdatedProviderListing($place_id: String!) {
    getUpdatedProviderListing(place_id: $place_id) {
      premiumAccreditations {
        name
        image
        year
      }
      premiumServices {
        title
        content
      }
      premiumOverview
      premiumPeople {
        name
        title
        image
        location
        spiel
        specialty
        languages
      }
      premiumFees {
        title
        price
      }
      premiumFaqs {
        question
        answer
      }
      features
      jurisdiction
      languages
      editors
      query
      name
      site
      type
      subtypes
      category
      phone
      full_address
      borough
      street
      city
      city_key
      url_key
      postal_code
      state
      us_state
      country
      country_code
      latitude
      longitude
      time_zone
      plus_code
      rating
      reviews
      reviews_link
      reviews_tags
      reviews_per_score
      photos_count
      photo
      street_view
      located_in
      working_hours {
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
      }
      popular_times
      business_status
      about
      range
      posts
      logo
      description
      verified
      owner_id
      owner_title
      owner_link
      reservation_links
      booking_appointment_link
      menu_link
      order_links
      location_link
      place_id
      google_id
      cid
      reviews_id
      located_google_id
      email_1
      email_1_full_name
      email_1_title
      email_2
      email_2_full_name
      email_2_title
      email_3
      email_3_full_name
      email_3_title
      phone_1
      phone_2
      phone_3
      facebook
      instagram
      linkedin
      medium
      reddit
      skype
      snapchat
      telegram
      whatsapp
      twitter
      vimeo
      youtube
      github
      crunchbase
      title
      generator
      keywords
      deleted
      pending
      email
      membership
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUpdatedProviderListings = /* GraphQL */ `
  query ListUpdatedProviderListings(
    $place_id: String
    $filter: ModelUpdatedProviderListingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUpdatedProviderListings(
      place_id: $place_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        premiumAccreditations {
          name
          image
          year
        }
        premiumServices {
          title
          content
        }
        premiumOverview
        premiumPeople {
          name
          title
          image
          location
          spiel
          specialty
          languages
        }
        premiumFees {
          title
          price
        }
        premiumFaqs {
          question
          answer
        }
        features
        jurisdiction
        languages
        editors
        query
        name
        site
        type
        subtypes
        category
        phone
        full_address
        borough
        street
        city
        city_key
        url_key
        postal_code
        state
        us_state
        country
        country_code
        latitude
        longitude
        time_zone
        plus_code
        rating
        reviews
        reviews_link
        reviews_tags
        reviews_per_score
        photos_count
        photo
        street_view
        located_in
        working_hours {
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          Sunday
        }
        popular_times
        business_status
        about
        range
        posts
        logo
        description
        verified
        owner_id
        owner_title
        owner_link
        reservation_links
        booking_appointment_link
        menu_link
        order_links
        location_link
        place_id
        google_id
        cid
        reviews_id
        located_google_id
        email_1
        email_1_full_name
        email_1_title
        email_2
        email_2_full_name
        email_2_title
        email_3
        email_3_full_name
        email_3_title
        phone_1
        phone_2
        phone_3
        facebook
        instagram
        linkedin
        medium
        reddit
        skype
        snapchat
        telegram
        whatsapp
        twitter
        vimeo
        youtube
        github
        crunchbase
        title
        generator
        keywords
        deleted
        pending
        email
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listingsByCityKey = /* GraphQL */ `
  query ListingsByCityKey(
    $city_key: String!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUpdatedProviderListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByCityKey(
      city_key: $city_key
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        premiumAccreditations {
          name
          image
          year
        }
        premiumServices {
          title
          content
        }
        premiumOverview
        premiumPeople {
          name
          title
          image
          location
          spiel
          specialty
          languages
        }
        premiumFees {
          title
          price
        }
        premiumFaqs {
          question
          answer
        }
        features
        jurisdiction
        languages
        editors
        query
        name
        site
        type
        subtypes
        category
        phone
        full_address
        borough
        street
        city
        city_key
        url_key
        postal_code
        state
        us_state
        country
        country_code
        latitude
        longitude
        time_zone
        plus_code
        rating
        reviews
        reviews_link
        reviews_tags
        reviews_per_score
        photos_count
        photo
        street_view
        located_in
        working_hours {
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          Sunday
        }
        popular_times
        business_status
        about
        range
        posts
        logo
        description
        verified
        owner_id
        owner_title
        owner_link
        reservation_links
        booking_appointment_link
        menu_link
        order_links
        location_link
        place_id
        google_id
        cid
        reviews_id
        located_google_id
        email_1
        email_1_full_name
        email_1_title
        email_2
        email_2_full_name
        email_2_title
        email_3
        email_3_full_name
        email_3_title
        phone_1
        phone_2
        phone_3
        facebook
        instagram
        linkedin
        medium
        reddit
        skype
        snapchat
        telegram
        whatsapp
        twitter
        vimeo
        youtube
        github
        crunchbase
        title
        generator
        keywords
        deleted
        pending
        email
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listingsByCityKeyAndRating = /* GraphQL */ `
  query ListingsByCityKeyAndRating(
    $city_key: String!
    $rating: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUpdatedProviderListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByCityKeyAndRating(
      city_key: $city_key
      rating: $rating
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        premiumAccreditations {
          name
          image
          year
        }
        premiumServices {
          title
          content
        }
        premiumOverview
        premiumPeople {
          name
          title
          image
          location
          spiel
          specialty
          languages
        }
        premiumFees {
          title
          price
        }
        premiumFaqs {
          question
          answer
        }
        features
        jurisdiction
        languages
        editors
        query
        name
        site
        type
        subtypes
        category
        phone
        full_address
        borough
        street
        city
        city_key
        url_key
        postal_code
        state
        us_state
        country
        country_code
        latitude
        longitude
        time_zone
        plus_code
        rating
        reviews
        reviews_link
        reviews_tags
        reviews_per_score
        photos_count
        photo
        street_view
        located_in
        working_hours {
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          Sunday
        }
        popular_times
        business_status
        about
        range
        posts
        logo
        description
        verified
        owner_id
        owner_title
        owner_link
        reservation_links
        booking_appointment_link
        menu_link
        order_links
        location_link
        place_id
        google_id
        cid
        reviews_id
        located_google_id
        email_1
        email_1_full_name
        email_1_title
        email_2
        email_2_full_name
        email_2_title
        email_3
        email_3_full_name
        email_3_title
        phone_1
        phone_2
        phone_3
        facebook
        instagram
        linkedin
        medium
        reddit
        skype
        snapchat
        telegram
        whatsapp
        twitter
        vimeo
        youtube
        github
        crunchbase
        title
        generator
        keywords
        deleted
        pending
        email
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listingsByUrlKey = /* GraphQL */ `
  query ListingsByUrlKey(
    $url_key: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUpdatedProviderListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByUrlKey(
      url_key: $url_key
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        premiumAccreditations {
          name
          image
          year
        }
        premiumServices {
          title
          content
        }
        premiumOverview
        premiumPeople {
          name
          title
          image
          location
          spiel
          specialty
          languages
        }
        premiumFees {
          title
          price
        }
        premiumFaqs {
          question
          answer
        }
        features
        jurisdiction
        languages
        editors
        query
        name
        site
        type
        subtypes
        category
        phone
        full_address
        borough
        street
        city
        city_key
        url_key
        postal_code
        state
        us_state
        country
        country_code
        latitude
        longitude
        time_zone
        plus_code
        rating
        reviews
        reviews_link
        reviews_tags
        reviews_per_score
        photos_count
        photo
        street_view
        located_in
        working_hours {
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          Sunday
        }
        popular_times
        business_status
        about
        range
        posts
        logo
        description
        verified
        owner_id
        owner_title
        owner_link
        reservation_links
        booking_appointment_link
        menu_link
        order_links
        location_link
        place_id
        google_id
        cid
        reviews_id
        located_google_id
        email_1
        email_1_full_name
        email_1_title
        email_2
        email_2_full_name
        email_2_title
        email_3
        email_3_full_name
        email_3_title
        phone_1
        phone_2
        phone_3
        facebook
        instagram
        linkedin
        medium
        reddit
        skype
        snapchat
        telegram
        whatsapp
        twitter
        vimeo
        youtube
        github
        crunchbase
        title
        generator
        keywords
        deleted
        pending
        email
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listingsByPostCode = /* GraphQL */ `
  query ListingsByPostCode(
    $postal_code: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUpdatedProviderListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByPostCode(
      postal_code: $postal_code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        premiumAccreditations {
          name
          image
          year
        }
        premiumServices {
          title
          content
        }
        premiumOverview
        premiumPeople {
          name
          title
          image
          location
          spiel
          specialty
          languages
        }
        premiumFees {
          title
          price
        }
        premiumFaqs {
          question
          answer
        }
        features
        jurisdiction
        languages
        editors
        query
        name
        site
        type
        subtypes
        category
        phone
        full_address
        borough
        street
        city
        city_key
        url_key
        postal_code
        state
        us_state
        country
        country_code
        latitude
        longitude
        time_zone
        plus_code
        rating
        reviews
        reviews_link
        reviews_tags
        reviews_per_score
        photos_count
        photo
        street_view
        located_in
        working_hours {
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          Sunday
        }
        popular_times
        business_status
        about
        range
        posts
        logo
        description
        verified
        owner_id
        owner_title
        owner_link
        reservation_links
        booking_appointment_link
        menu_link
        order_links
        location_link
        place_id
        google_id
        cid
        reviews_id
        located_google_id
        email_1
        email_1_full_name
        email_1_title
        email_2
        email_2_full_name
        email_2_title
        email_3
        email_3_full_name
        email_3_title
        phone_1
        phone_2
        phone_3
        facebook
        instagram
        linkedin
        medium
        reddit
        skype
        snapchat
        telegram
        whatsapp
        twitter
        vimeo
        youtube
        github
        crunchbase
        title
        generator
        keywords
        deleted
        pending
        email
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listingsByMembership = /* GraphQL */ `
  query ListingsByMembership(
    $membership: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUpdatedProviderListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByMembership(
      membership: $membership
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        premiumAccreditations {
          name
          image
          year
        }
        premiumServices {
          title
          content
        }
        premiumOverview
        premiumPeople {
          name
          title
          image
          location
          spiel
          specialty
          languages
        }
        premiumFees {
          title
          price
        }
        premiumFaqs {
          question
          answer
        }
        features
        jurisdiction
        languages
        editors
        query
        name
        site
        type
        subtypes
        category
        phone
        full_address
        borough
        street
        city
        city_key
        url_key
        postal_code
        state
        us_state
        country
        country_code
        latitude
        longitude
        time_zone
        plus_code
        rating
        reviews
        reviews_link
        reviews_tags
        reviews_per_score
        photos_count
        photo
        street_view
        located_in
        working_hours {
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          Sunday
        }
        popular_times
        business_status
        about
        range
        posts
        logo
        description
        verified
        owner_id
        owner_title
        owner_link
        reservation_links
        booking_appointment_link
        menu_link
        order_links
        location_link
        place_id
        google_id
        cid
        reviews_id
        located_google_id
        email_1
        email_1_full_name
        email_1_title
        email_2
        email_2_full_name
        email_2_title
        email_3
        email_3_full_name
        email_3_title
        phone_1
        phone_2
        phone_3
        facebook
        instagram
        linkedin
        medium
        reddit
        skype
        snapchat
        telegram
        whatsapp
        twitter
        vimeo
        youtube
        github
        crunchbase
        title
        generator
        keywords
        deleted
        pending
        email
        membership
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
