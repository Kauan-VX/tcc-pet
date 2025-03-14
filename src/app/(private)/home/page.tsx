'use client';

import { CodeBlock } from '@/components/code-block';
import { CODE_EXAMPLES } from '../../../../public/mocks/boilerplate-presentation/code-examples';
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

const Home = () => {
  const t = useTranslations('Home');

  return (
    <>
      <div className="p-4 mt-8">
        {/* Animação do título com fade-in e slide-up */}
        <motion.h1
          className="text-3xl font-semibold mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {t('title')}
        </motion.h1>

        <motion.div
          className="grid grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {CODE_EXAMPLES.map((example, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Card className="flex h-full flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language={example.language}
                    filename={example.filename}
                    highlightLines={example.highlightLines}
                    code={example.code}
                  />
                </CardContent>
                <CardFooter className="flex flex-col !items-start gap-4">
                  <strong className="text-2xl"> {t('result')}:</strong>
                  {example.result}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Home;
