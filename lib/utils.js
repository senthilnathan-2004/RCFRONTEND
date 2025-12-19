export const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith('http') || photo.startsWith('data:')) return photo;
  if (photo.startsWith('/')) return photo;
  return `/${photo}`;
};
