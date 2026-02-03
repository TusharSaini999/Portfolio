const env = {
  APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  APPWRITE_PROJECT_NAME: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
  APPWRITE_DB_ID: String(import.meta.env.VITE_APPWRITE_DB_ID),
  APPWRITE_TABLE_CONTACT_ID: String(
    import.meta.env.VITE_APPWRITE_TABLE_CONTECT_ID,
  ),
};

export default env;
