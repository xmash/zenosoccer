type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl space-y-3 ${alignClass}`} id={id}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
