import { UserData, AuthData } from '@/shared/types';
import Dexie, { Table } from 'dexie';

// Database schema interfaces
interface Settings {
  key: string;
  value: any;
}

// Database class
class DashboardDatabase extends Dexie {
  users!: Table<UserData>;
  auth!: Table<AuthData>;
  settings!: Table<Settings>;

  constructor() {
    super('DashboardDB');
    
    this.version(1).stores({
      users: 'id, firstName, lastName, createdAt, lastLogin',
      auth: 'userId, pinHash, salt',
      settings: 'key, value'
    });
  }
}

// Create database instance
const db = new DashboardDatabase();

export const DatabaseService = {
  // Initialize database (Dexie handles this automatically)
  async initialize() {
    try {
      await db.open();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  },
  
  // Save user data and set as current user
  async saveUser(userData: UserData) {
    try {
      await db.transaction('rw', db.users, db.settings, async () => {
        await db.users.put(userData);
        await db.settings.put({ key: 'currentUser', value: userData.id });
      });
    } catch (error) {
      console.error('Failed to save user:', error);
      throw error;
    }
  },
  
  // Save authentication data
  async saveAuth(authData: AuthData) {
    try {
      await db.auth.put(authData);
    } catch (error) {
      console.error('Failed to save auth data:', error);
      throw error;
    }
  },
  
  // Get current user
  async getCurrentUser(): Promise<UserData | null> {
    try {
      const currentUserSetting = await db.settings.get('currentUser');
      if (!currentUserSetting) return null;
      
      const userData = await db.users.get(currentUserSetting.value);
      return userData || null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },
  
  // Get authentication data for a user
  async getAuth(userId: string): Promise<AuthData | null> {
    try {
      const authData = await db.auth.get(userId);
      return authData || null;
    } catch (error) {
      console.error('Failed to get auth data:', error);
      return null;
    }
  },
  
  // Clear current user (logout)
  async clearCurrentUser() {
    try {
      await db.settings.delete('currentUser');
    } catch (error) {
      console.error('Failed to clear current user:', error);
      throw error;
    }
  },
  
  // Additional utility methods
  async getAllUsers(): Promise<UserData[]> {
    try {
      return await db.users.toArray();
    } catch (error) {
      console.error('Failed to get all users:', error);
      return [];
    }
  },
  
  async deleteUser(userId: string) {
    try {
      await db.transaction('rw', db.users, db.auth, db.settings, async () => {
        await db.users.delete(userId);
        await db.auth.delete(userId);
        
        // Clear current user if it's the deleted user
        const currentUserSetting = await db.settings.get('currentUser');
        if (currentUserSetting?.value === userId) {
          await db.settings.delete('currentUser');
        }
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  },
  
  async updateUserLastLogin(userId: string) {
    try {
      await db.users.update(userId, { lastLogin: new Date() });
    } catch (error) {
      console.error('Failed to update last login:', error);
      throw error;
    }
  },
  
  // Database management
  async clearAllData() {
    try {
      await db.transaction('rw', db.users, db.auth, db.settings, async () => {
        await db.users.clear();
        await db.auth.clear();
        await db.settings.clear();
      });
    } catch (error) {
      console.error('Failed to clear all data:', error);
      throw error;
    }
  },
  
  async getDatabaseInfo() {
    try {
      const userCount = await db.users.count();
      const authCount = await db.auth.count();
      const settingsCount = await db.settings.count();
      
      return {
        userCount,
        authCount,
        settingsCount,
        dbName: db.name,
        version: db.verno
      };
    } catch (error) {
      console.error('Failed to get database info:', error);
      return null;
    }
  }
};