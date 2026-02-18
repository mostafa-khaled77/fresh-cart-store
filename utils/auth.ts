export const getUserIdFromToken = (token: string): string | null => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    const jsonPayload = typeof window === 'undefined' 
      ? Buffer.from(base64, 'base64').toString()
      : atob(base64);

    const payload = JSON.parse(jsonPayload);
    return payload.id || payload._id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};