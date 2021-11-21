import {sendGet } from '../axios';
export const getSkills = () => sendGet('resources/languages');
export const getAreas = () => sendGet('resources/areas', {countryId: 240});
export const getLanguages = () => sendGet('resources/languages');
export const getCountries = () => sendGet('resources/countries');
