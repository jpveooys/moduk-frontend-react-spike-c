import {Children, ReactElement, ReactFragment, useCallback, useRef} from "react";

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
  const previousElementRef = useRef<HTMLDivElement | null>(null)

  // Must use useCallback to avoid unnecessary rerenders (and hence remounts)
  const ref = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return
    }

    if (element === previousElementRef.current)
      return

    previousElementRef.current = element

    const { Accordion } = require("@moduk/frontend/client");
    new Accordion(element).init();
  }, [])

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
