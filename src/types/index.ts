export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface SummaryResponse {
  summary: string;
  videoTitle: string;
  videoUrl: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status: number;
}