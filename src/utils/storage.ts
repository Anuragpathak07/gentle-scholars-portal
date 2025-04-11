
/**
 * Storage utility to handle user-specific localStorage
 */

/**
 * Get a value from localStorage with user isolation
 */
export function getStorageItem<T>(key: string, userId: string, defaultValue: T): T {
  try {
    const userKey = `${key}_${userId}`;
    const item = localStorage.getItem(userKey);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting storage item:', error);
    return defaultValue;
  }
}

/**
 * Set a value in localStorage with user isolation
 */
export function setStorageItem<T>(key: string, userId: string, value: T): void {
  try {
    const userKey = `${key}_${userId}`;
    localStorage.setItem(userKey, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
}

/**
 * Remove a value from localStorage with user isolation
 */
export function removeStorageItem(key: string, userId: string): void {
  try {
    const userKey = `${key}_${userId}`;
    localStorage.removeItem(userKey);
  } catch (error) {
    console.error('Error removing storage item:', error);
  }
}

/**
 * Check if a storage item exists
 */
export function hasStorageItem(key: string, userId: string): boolean {
  try {
    const userKey = `${key}_${userId}`;
    return localStorage.getItem(userKey) !== null;
  } catch (error) {
    console.error('Error checking storage item:', error);
    return false;
  }
}
