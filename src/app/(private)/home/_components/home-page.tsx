'use client';

import { CodeBlock } from '@/components/code-block';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const HomePage = () => {
  const t = useTranslations('Home');

  const codeComponent = `import { Button } from '@/components/ui/button';

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="default">Default Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
    </div>
  );
}`;

  const codeHook = `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}`;

  return (
    <>
      <motion.section
        className="text-center mt-10 mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t('title')}
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t('subtitle')}
        </motion.p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('exampleComponentsTitle')}</CardTitle>
            <CardDescription>
              {t('exampleComponentsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={codeComponent}
              language="tsx"
              filename="component-example.tsx"
            />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('exampleHooksTitle')}</CardTitle>
            <CardDescription>{t('exampleHooksDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={codeHook}
              language="tsx"
              filename="use-local-storage.tsx"
            />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
