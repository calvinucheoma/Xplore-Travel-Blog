'use client';

import { FormEvent, ReactNode, useRef } from 'react';

interface FormProps {
  children: ReactNode;
  action: (formData: FormData) => Promise<void | boolean>;
  className?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({
  action,
  children,
  className,
  onSubmit,
}) => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await action(formData);
        ref.current?.reset();
      }}
      className={className}
      onSubmit={onSubmit}
      ref={ref}
    >
      {children}
    </form>
  );
};

export default Form;
