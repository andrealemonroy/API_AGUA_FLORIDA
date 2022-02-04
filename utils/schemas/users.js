const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userFullNameSchema = joi.string().max(80);
const artisticNameSchema = joi.string().max(80);
const userLocationSchema = joi.object({value: joi.string(), address: joi.string(), coordinates: joi.object({lat: joi.number().min(-90).max(90),
  lng: joi.number().min(-180).max(180)})});
const userRoleSchema = joi.array().items(joi.string().max(50)).max(5);
const userEmailSchema = joi.string().email();
const userProjectsSchema = joi.array().items(joi.string().max(50)).max(5);
const userSocialNetworksSchema = joi.array();
const userPhotoSchema = joi.string().dataUri().allow('')
const userTermsAndConditions = joi.boolean()
const createUserSchema = {
  fullName: userFullNameSchema.required(),
  artisticName: artisticNameSchema.required(),
  location: userLocationSchema.required(),
  role: userRoleSchema.required(),
  email: userEmailSchema.required(),
  projects: userProjectsSchema.required(),
  socialNetworks: userSocialNetworksSchema.optional(),
  photo: userPhotoSchema.optional(),
  termsAndConditions: userTermsAndConditions.required()
};

const updateUserSchema = {
    fullName: userFullNameSchema,
    artisticName: artisticNameSchema,
    location: userLocationSchema,
    role: userRoleSchema,
    email: userEmailSchema,
    projects: userProjectsSchema,
    socialNetworks: userSocialNetworksSchema,
    photo: userPhotoSchema,
    termsAndConditions: userTermsAndConditions
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
  userLocationSchema
};
