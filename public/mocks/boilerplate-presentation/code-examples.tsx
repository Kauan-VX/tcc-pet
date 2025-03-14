import { formatCpfCnpj } from '@/utils/format-cpf-cnpj';
import { formatCurrency } from '@/utils/format-currency';
import { formatDateString } from '@/utils/format-date-string';
import { ReactNode } from 'react';

export const CODE_EXAMPLES: {
  language: string;
  filename: string;
  highlightLines: number[];
  code: string;
  title: string;
  description: string;
  result: ReactNode;
}[] = [
  {
    language: 'tsx',
    title: 'formatDateString( );',
    description: 'Exemplo de formatação de data',
    filename: 'format-date-string.tsx',
    code: `import { formatDateString } from '@/utils/format-date-string';

export default function FormatDateShort() {
    const dateISO = new Date().toISOString();
   
    return (
      <div>
        <span className="text-dark-gray-color">
          {formatDateString(new Date().toISOString(), 'short')}
        </span>
      </div>
    );
}`,
    highlightLines: [9],
    result: (
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Short</span>
          <span className="text-dark-gray-color">
            {formatDateString(new Date().toISOString(), 'short')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Medium</span>
          <span className="text-dark-gray-color">
            {formatDateString(new Date().toISOString(), 'medium')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Long</span>
          <span className="text-dark-gray-color">
            {formatDateString(new Date().toISOString(), 'long')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Full</span>
          <span className="text-dark-gray-color">
            {formatDateString(new Date().toISOString(), 'full')}
          </span>
        </div>
      </div>
    ),
  },

  {
    language: 'tsx',
    title: 'formatCpfCnpj( );',
    description: 'Exemplo de formatação de cpf e cnpj',
    filename: 'format-cpf-cnpj.tsx',
    code: `import { formatCpfCnpj } from '@/utils/format-cpf-cnpj';

export default function FormatCpfCnpj() {
    const value = 20955852801;
   
    return (
      <div>
        <span className="text-dark-gray-color">
         {formatCpfCnpj(value, 'cpf')}
        </span>
      </div>
    );
}`,
    highlightLines: [9],
    result: (
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Cpf</span>
          <span className="text-dark-gray-color">
            {formatCpfCnpj('20955852801', 'cpf')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Cnpj</span>
          <span className="text-dark-gray-color">
            {formatCpfCnpj('00623904000173', 'cnpj')}
          </span>
        </div>
      </div>
    ),
  },

  {
    language: 'tsx',
    title: 'formatCurrency( );',
    description: 'Exemplo de formatação de  moeda',
    filename: 'format-currency.tsx',
    code: `import { formatCurrency } from '@/utils/formatCurrency;'

export default function FormatCpfCnpj() {
    const value = 125.20;
   
    return (
      <div>
        <span className="text-dark-gray-color">
         {formatCurrency(value)}
        </span>
      </div>
    );
}`,
    highlightLines: [9],
    result: (
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-gray-800 font-semibold">Currency</span>
          <span className="text-dark-gray-color">{formatCurrency(125.2)}</span>
        </div>
      </div>
    ),
  },
];
