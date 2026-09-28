import axios from 'axios';


const serverUrl = "https://ch-backend.liveprosolutions.com";

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
};
