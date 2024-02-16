import { PeliasGeoJSONFeature } from '@stadiamaps/api';
import { rest } from 'msw';

// User endpoints
export const createUserFetchHandler = (status: number, users=[{}]) => {
  let callCount = -1;

  return rest.get(
    /^.+\/users\/fetchData/,
    (_req, res, ctx) => {
      callCount += 1;
      return res(
        ctx.status(status),
        ctx.json(users[callCount % users.length])
      );
    }
  );
};

export const createUserGetHandler = (status: number, user={}) => {
  return rest.get(
    /^.+\/users\/[0-9a-zA-Z]+$/,
    (_req, res, ctx) => {
      return res(
        ctx.status(status),
        ctx.json(user)
      );
    }
  );
};

export const createUserUpdateHandler = (status: number) => {
  return rest.patch(
    /^.+\/users\/[0-9a-zA-Z]+$/,
    (_req, res, ctx) => {
      return res(
        ctx.status(status)
      );
    }
  );
};

export const createUserDeleteHandler = (status: number) => {
  return rest.delete(
    /^.+\/users\/[0-9a-zA-Z]+$/,
    (_req, res, ctx) => {
      return res(
        ctx.status(status)
      );
    }
  );
};

// Experience endpoint
export const createExperienceCreateHandler = (status: number, experience={}) => {
  return rest.post(
    /^.+\/experiences/, 
    (_req, res, ctx) => {
      return res(
        ctx.delay(2500),
        ctx.status(status),
        ctx.json(experience)
      );
    }
  );
};

export const createExperienceUpdateHandler = (status: number) => {
  return rest.patch(
    /^.+\/experiences\/.+$/,
    (_req, res, ctx) => {
      return res(
        ctx.delay(2500),
        ctx.status(status)
      );
    }
  );
};

// External API calls
export const createGeocodeEarthAutocompleteHandler = (results: { features: PeliasGeoJSONFeature[] }) => {
  return rest.get(
    'https://api.geocode.earth/v1/autocomplete',
    (_req, res, ctx) => {
      return res(ctx.json(results));
    }
  );
};