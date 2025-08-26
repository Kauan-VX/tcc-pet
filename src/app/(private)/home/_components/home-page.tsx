'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const HomePage = () => {
  const t = useTranslations('Home');

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
          <CardContent></CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('exampleHooksTitle')}</CardTitle>
            <CardDescription>{t('exampleHooksDescription')}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
