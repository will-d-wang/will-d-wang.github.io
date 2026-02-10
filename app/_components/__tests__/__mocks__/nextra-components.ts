import React from 'react';

export const Anchor = ({ href, children, className, ...props }: any) =>
  React.createElement('a', { href, className, ...props }, children);
