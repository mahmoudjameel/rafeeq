import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvm81zjkfvpZ19ekpdgXSHx90pGyaxkPA",
  authDomain: "rafiqqq-24720.firebaseapp.com",
  projectId: "rafiqqq-24720",
  storageBucket: "rafiqqq-24720.firebasestorage.app",
  messagingSenderId: "1038278279973",
  appId: "1:1038278279973:web:9fc490101a9695965a90cc",
  measurementId: "G-35QQNN69DB"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface WebsiteData {
  hero?: {
    title: string;
    subtitle: string;
    mainHeading: string;
  };
  reviews?: {
    title: string;
    description: string;
    reviews: Array<{
      text: string;
      name: string;
      city: string;
    }>;
  };
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  banner?: {
    title: string;
    subtitle: string;
    highlight: string;
    buttonText: string;
  };
  stats?: Array<{
    number: string;
    label: string;
  }>;
  benefits?: {
    title: string;
    benefits: Array<{
      icon: string;
      text: string;
    }>;
  };
  about?: {
    title: string;
    subtitle: string;
    description: string;
  };
  order?: {
    title: string;
    description: string;
    buttonText: string;
    successMessage: string;
    whatsappMessageTemplate: string;
    deviceOptions: string;
  };
  cta?: {
    title: string;
    description: string;
    whatsappText: string;
    callText: string;
    shopText: string;
  };
  footer?: {
    description: string;
    address: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    services: string;
    quickLinks: string;
  };
  socialMedia?: {
    title: string;
    platforms: Array<{
      name: string;
      icon: string;
      text: string;
      link: string;
      status: 'active' | 'inactive';
    }>;
    style: string;
    size: string;
    color: string;
    bgColor: string;
  };
  movingText?: {
    texts: string[];
    speed: number;
  };
  faq?: {
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  settings?: {
    companyName: string;
    address: string;
    email: string;
    copyright: string;
    tiktokPixelId?: string;
    snapchatPixelId?: string;
    gtmContainerId?: string;
  };
  whatsappNumber?: string;
  lastUpdated?: Date;
}

interface WebsiteContextType {
  websiteData: WebsiteData;
  loading: boolean;
  error: string | null;
  useLocalStorage: boolean;
  refreshData: () => void;
  updateWebsiteData: (newData: Partial<WebsiteData>) => Promise<void>;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};

interface WebsiteProviderProps {
  children: ReactNode;
}

export const WebsiteProvider: React.FC<WebsiteProviderProps> = ({ children }) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Local Storage Functions
  const LOCAL_STORAGE_KEY = 'websiteData';
  
  const getLocalData = (): WebsiteData | null => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const setLocalData = (data: WebsiteData) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  const getDefaultData = (): WebsiteData => ({
    hero: {
      title: 'rfeeq رفيق للتقسيط',
      subtitle: 'حلول ذكية لجميع مشاكل التقسيط',
      mainHeading: 'ما تحتاج تعيش حرب نفسية مع راتبك!'
    },
    whatsappNumber: '+966 57 375 5644'
  });

  const loadWebsiteData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try Firebase first (as requested by user)
      const docRef = doc(db, 'websiteContent', 'main');
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firebase timeout')), 10000)
      );
      
      try {
        const docSnap = await Promise.race([
          getDoc(docRef),
          timeoutPromise
        ]) as any;
        
        if (docSnap.exists()) {
          const firebaseData = docSnap.data() as WebsiteData;
          console.log('✅ Loading data from Firebase:', firebaseData);
          setWebsiteData(firebaseData);
          setLocalData(firebaseData); // Cache in localStorage
          setUseLocalStorage(false);
          setLoading(false);
          setError(null);
          return;
        } else {
          // Set default data if no data exists
          const defaultData = getDefaultData();
          console.log('📝 No Firebase data, setting defaults');
          setWebsiteData(defaultData);
          setLocalData(defaultData);
          setUseLocalStorage(false);
          setLoading(false);
          return;
        }
      } catch (firebaseError: any) {
        console.error('❌ Firebase error:', firebaseError);
        
        // Fallback to localStorage only if Firebase completely fails
        const localData = getLocalData();
        if (localData) {
          console.log('🔄 Falling back to localStorage data');
          setWebsiteData(localData);
          setUseLocalStorage(true);
          setError('تم استخدام البيانات المحفوظة محلياً بسبب مشاكل في Firebase');
        } else {
          console.log('🔄 Falling back to default data');
          const defaultData = getDefaultData();
          setWebsiteData(defaultData);
          setLocalData(defaultData);
          setUseLocalStorage(true);
          setError('تم استخدام البيانات الافتراضية بسبب مشاكل في Firebase');
        }
        setLoading(false);
        return;
      }
    } catch (err: any) {
      console.error('Error loading website data:', err);
      setError('خطأ في تحميل بيانات الموقع');
      setLoading(false);
    }
  };

  const updateWebsiteData = async (newData: Partial<WebsiteData>) => {
    try {
      const updatedData = { ...websiteData, ...newData };
      
      // Always save to localStorage first for immediate UI update
      setLocalData(updatedData);
      setWebsiteData(updatedData);
      
      if (!useLocalStorage) {
        try {
          const docRef = doc(db, 'websiteContent', 'main');
          
          // Add timeout for Firebase operations
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase save timeout')), 5000)
          );
          
          await Promise.race([
            setDoc(docRef, updatedData, { merge: true }),
            timeoutPromise
          ]);
          
          console.log('Successfully saved to Firebase:', updatedData);
          setUseLocalStorage(false);
          setError(null);
        } catch (firebaseError: any) {
          console.error('Could not save to Firebase:', firebaseError);
          setUseLocalStorage(true);
          setError('تم الحفظ في التخزين المحلي بسبب مشاكل في Firebase');
        }
      } else {
        console.log('Saved to localStorage:', updatedData);
        setError('تم الحفظ في التخزين المحلي');
      }
    } catch (error: any) {
      console.error('Error updating website data:', error);
      setError('خطأ في تحديث البيانات');
    }
  };

  const refreshData = () => {
    loadWebsiteData();
  };

  useEffect(() => {
    loadWebsiteData();

    // Only set up Firebase listener if not using local storage
    if (!useLocalStorage) {
      try {
        const docRef = doc(db, 'websiteContent', 'main');
        
        // Add timeout for listener setup
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase listener timeout')), 10000)
        );
        
        const unsubscribe = onSnapshot(docRef, (docSnapshot: any) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data() as WebsiteData;
            console.log('Firebase listener update:', data);
            setWebsiteData(data);
            setLocalData(data);
            setLoading(false);
            setError(null);
          }
        }, (err: any) => {
          console.error('Error listening to website data:', err);
          setUseLocalStorage(true);
          setError('تم الانتقال للتخزين المحلي بسبب مشاكل في Firebase');
          
          // Fallback to local storage
          const localData = getLocalData();
          if (localData) {
            setWebsiteData(localData);
          }
        });

        // Timeout for listener setup
        timeoutPromise.catch(() => {
          console.log('Firebase listener timeout, switching to local storage');
          setUseLocalStorage(true);
          unsubscribe();
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Could not set up Firebase listener:', error);
        setUseLocalStorage(true);
      }
    }
  }, [useLocalStorage]);

  const value: WebsiteContextType = {
    websiteData,
    loading,
    error,
    useLocalStorage,
    refreshData,
    updateWebsiteData
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteContext;
