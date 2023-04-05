import { Children, ReactElement, ReactFragment, useEffect, useRef } from "react";

interface AccordionItemProps {
  heading: ReactElement | ReactFragment | string;
  headingId: string;
  contentId: string;
  expanded?: boolean;
  children: ReactElement | ReactFragment | string;
}

export function Accordion2Item({
  heading,
  headingId,
  children,
  contentId,
  expanded,
}: AccordionItemProps) {
  return (
    <div
      className={
        expanded
          ? "govuk-accordion__section govuk-accordion__section--expanded"
          : "govuk-accordion__section"
      }
    >
      <div className="govuk-accordion__section-header">
        <h2 className="govuk-accordion__section-heading">
          <span className="govuk-accordion__section-button" id={headingId}>
            {heading}
          </span>
        </h2>
      </div>
      <div
        id={contentId}
        className="govuk-accordion__section-content"
        aria-labelledby={headingId}
      >
        <p className="govuk-body">{children}</p>
      </div>
    </div>
  );
}

export function Accordion2({
  children,
}: {
  children: ReactElement<AccordionItemProps>[] | ReactElement<AccordionItemProps>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { Accordion } = require("@moduk/frontend/client");

    // Initialise the component if and only if the DOM element has changed
    if (ref.current && ref.current !== previousRef.current) {
      new Accordion(ref.current).init();
      previousRef.current = ref.current;
    }
  });

  return (
    <div
      ref={ref}
      className="govuk-accordion"
      data-module="govuk-accordion"
      id="accordion-default"
      // Force the component to remount whenever the number of elements change
      key={Children.count(children)}
    >
      {children}
    </div>
  );
}
