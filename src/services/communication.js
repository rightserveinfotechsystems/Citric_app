import axios from 'axios';

/**
 * Backend API layer — single place for every server call.
 * Base: https://citricbackend.rsinfotechsys.com  (routes under /application)
 *
 * getContacts() → GET /application/get-contacts
 *   Expected payload: Contact[] (mongoose model) — see src/data/contacts.js
 *   Suggested express route (backend):
 *     router.get('/get-contacts', async (_req, res) => {
 *       res.json(await Contact.find().sort({ displayOrder: 1 }).lean());
 *     });
 *   Optional model extension for the location row: mapUrl: String, mapLabel: String
 */
const serverUrl = 'https://citricbackend.rsinfotechsys.com';

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
  getContacts: () => client.get('/application/get-contacts'),
};
