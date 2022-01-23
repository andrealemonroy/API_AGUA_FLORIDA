const joi = require('joi');

const bandIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const bandsNameSchema = joi.string().max(80); 
const bandLocationSchema = joi.object({value: joi.string(), address: joi.string(), coordinates: joi.object({lat: joi.number().min(-90).max(90), 
  lng: joi.number().min(-180).max(180)})});
const bandMemberSchema = joi.array().items(joi.string().max(50)).max(5); 
const bandEmailSchema = joi.string().email(); 
const bandGenresSchema = joi.array().items(joi.string().max(50)).max(5); 
const bandSocialNetworksSchema = joi.object({facebook: joi.string().allow('').max(80).optional(), spotify: joi.string().allow('').max(80).optional(), instagram: joi.string().allow('').max(80).optional(), youtube: joi.string().allow('').max(80).optional(), bandcamp: joi.string().allow('').max(80).optional()}); 
const bandPhotoSchema = joi.string().dataUri().allow('')
const bandTermsAndConditions = joi.boolean()
const createBandSchema = {
  bandsName: bandsNameSchema.required(),
  location: bandLocationSchema.required(),
  members: bandMemberSchema.required(),
  email: bandEmailSchema.required(),
  genres: bandGenresSchema.required(),
  socialNetworks: bandSocialNetworksSchema.optional(),
  photo: bandPhotoSchema.optional(),
  termsAndConditions: bandTermsAndConditions.required()
};

const updateBandSchema = {
    bandsName: bandsNameSchema,
    location: bandLocationSchema,
    members: bandMemberSchema,
    email: bandEmailSchema,
    genres: bandGenresSchema,
    socialNetworks: bandSocialNetworksSchema,
    photo: bandPhotoSchema,
    termsAndConditions: bandTermsAndConditions
};

module.exports = {
  bandIdSchema,
  createBandSchema,
  updateBandSchema,
};
