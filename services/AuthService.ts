// Auth Service
export const AuthService = {
  async hashPin(pin: string): Promise<{ hash: string; salt: string }> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const data = encoder.encode(pin + Array.from(salt).join(''));
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return {
      hash,
      salt: Array.from(salt).join(',')
    };
  },
  
  async verifyPin(pin: string, storedHash: string, salt: string): Promise<boolean> {
    const saltArray = salt.split(',').map(Number);
    const encoder = new TextEncoder();
    const data = encoder.encode(pin + saltArray.join(''));
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return hash === storedHash;
  }
};