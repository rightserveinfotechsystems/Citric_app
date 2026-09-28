import axios from 'axios';

/**
 * Backend API layer — single place for every server call.
 * Base: https://ch-backend.liveprosolutions.com (routes under /contacts and /application)
 *
 * getContacts()  → GET /contacts/get-contacts   (Reach Us screen; fallback in ReachUs.js)
 * getDeveloper() → GET /contacts/get-developer  (Home developer credits; fallback in Home.js)
 */
const serverUrl = 'https://ch-backend.liveprosolutions.com';

const client = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const communication = {
  /** Incubation application form (Apply For Incubation screen). */
  submitForm: (dataToSend) => client.post('/application/createIncubationForm', dataToSend),

  /** Announcement list (Announcement screen). */
  getAllAnnouncement: () => client.get('/application/getAnnouncementList'),

  /** Contact cards for the Reach Us screen (sorted by displayOrder server-side). */
  getContacts: () => client.get('/contacts/get-contacts'),

  /**
   * Developer credits for the Home screen.
   * Expected payload: { lead: [{ name, role, nameFirst? }], coHeading: string, coLines: string[] }
   * (optionally wrapped in { data } / { developer }). Bundled defaults live in src/pages/Home.js.
   */
  getDeveloper: () => client.get('/contacts/get-developer'),
};
