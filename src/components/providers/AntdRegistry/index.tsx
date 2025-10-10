'use client';

import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useEffect } from 'react';

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Suppress React 19 compatibility warning for Ant Design v5
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Filter out the specific Ant Design React 19 compatibility warning
      const message = args[0];
      if (typeof message === 'string' && 
          message.includes('[antd: compatible]') && 
          message.includes('React is 16 ~ 18')) {
        return; // Suppress this specific warning
      }
      // Allow all other console errors to pass through
      originalConsoleError.apply(console, args);
    };

    // Cleanup function to restore original console.error
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <AntdRegistry>
      <ConfigProvider 
        locale={viVN}
        theme={{
          token: {
            colorPrimary: '#ea580c', // Orange color to match your theme
            colorSuccess: '#16a34a',
            colorWarning: '#d97706',
            colorError: '#dc2626',
            borderRadius: 8,
          },
          components: {
            DatePicker: {
              colorPrimary: '#ea580c',
              borderRadius: 8,
            },
            Button: {
              borderRadius: 8,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
