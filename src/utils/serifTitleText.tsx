import type { ReactNode } from "react";

/**
 * Georgia (site serif): capital "I" sits below lowercase "l" ascenders.
 * Bump the leading "I" when followed by "l" so titles like "Illuminate" look even.
 */
export const renderSerifTitleText = (text: string): ReactNode => {
  if (!text || !/^I(?=l)/.test(text)) return text;

  return (
    <>
      <span className="serif-cap-ascender">I</span>
      {text.slice(1)}
    </>
  );
};
