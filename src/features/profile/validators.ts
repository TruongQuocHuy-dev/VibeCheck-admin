export const validateName = (name: string) => {
  if (!name || name.trim().length === 0) return 'Tên không được để trống';
  if (name.length > 50) return 'Tên tối đa 50 ký tự';
  return null;
};

export const validatePassword = (password: string) => {
  if (password.length < 8) return 'Mật khẩu tối thiểu 8 ký tự';
  if (!/[A-Z]/.test(password)) return 'Cần ít nhất 1 chữ hoa';
  if (!/[0-9]/.test(password)) return 'Cần ít nhất 1 chữ số';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Cần ít nhất 1 ký tự đặc biệt';
  return null;
};

export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
  return strength;
};

export const getStrengthColor = (strength: number): string => {
  if (strength <= 25) return 'bg-status-banned';
  if (strength <= 50) return 'bg-orange-500';
  if (strength <= 75) return 'bg-yellow-500';
  return 'bg-status-active';
};
