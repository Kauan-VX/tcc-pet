import clsx from 'clsx';
import React from 'react';

type IconProps = {
  name: keyof typeof icons;
  className?: string;
};

const icons = {
  loading: `<svg class="svg-inline--fa fa-spinner-third fa-spin" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner-third" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32V0zM422.3 352c-8.9 15.3-3.6 34.9 11.7 43.7s34.9 3.6 43.7-11.7L422.3 352zM256 64c106 0 192 86 192 192h64C512 114.6 397.4 0 256 0V64zM448 256c0 35-9.4 67.8-25.7 96L477.7 384c21.8-37.7 34.3-81.5 34.3-128H448z"></path></svg>`,
  home: `<svg class="svg-inline--fa fa-house" aria-hidden="true" focusable="false" data-prefix="far" data-icon="house" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M272.5 5.7c9-7.6 22.1-7.6 31.1 0l264 224c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.3-33.8 2.8L512 245.5V432c0 44.2-35.8 80-80 80H144c-44.2 0-80-35.8-80-80V245.5L39.5 266.3c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l264-224z"></path></svg>`,
  search: `<svg class="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208z"></path></svg>`,
  user: `<svg class="svg-inline--fa fa-user" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg>`,
};

const Icon: React.FC<IconProps> = React.memo(({ name, className }) => {
  const svgMarkup = icons[name] || icons['home'];

  return (
    <span
      className={clsx('icon', className)}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;
