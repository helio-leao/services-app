import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import User from "../types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ASYNC_STORAGE_KEYS from "../constants/asyncStorageKeys";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  signin: (userData: User) => Promise<void>;
  signout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const userString = await AsyncStorage.getItem(
          ASYNC_STORAGE_KEYS.USER_SESSION
        );

        if (!userString) return;

        const storageUser: User = JSON.parse(userString);
        const { data: user } = await axios(
          `${API_URL}/users/${storageUser._id}`
        );

        setUser(user);
      } catch (error) {
        // NOTE: if error on request, the storage user is not being removed
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signin = async (userData: User) => {
    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.USER_SESSION,
        JSON.stringify(user)
      );
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const signout = async () => {
    try {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_SESSION);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
