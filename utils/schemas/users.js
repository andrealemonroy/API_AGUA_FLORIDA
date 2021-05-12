const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userFullNameSchema = joi.string().max(80);
const artisticNameSchema = joi.string().max(80);
const userLocationSchema = joi.object({value: joi.string(), address: joi.string(), coodinates: joi.array().ordered(
  joi.number().min(-90).max(90),
  joi.number().min(-180).max(180),
)});
const userRoleSchema = joi.array().items(joi.string().max(50)).max(5);
const userEmailSchema = joi.string().email();
const userProjectsSchema = joi.array().items(joi.string().max(50)).max(10);
const userSocialNetworksSchema = joi.object({facebook: joi.string().allow('').max(80).optional(), spotify: joi.string().allow('').max(80).optional(), instagram: joi.string().allow('').max(80).optional(), youtube: joi.string().allow('').max(80).optional(), bandcamp: joi.string().allow('').max(80).optional()});
const userPhotoSchema = joi.string().uri()
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
};
