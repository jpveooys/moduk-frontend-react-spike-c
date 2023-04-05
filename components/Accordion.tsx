import {ReactElement, ReactFragment, useCallback, useRef} from "react";

interface AccordionItem {
  heading: ReactElement | ReactFragment | string;
  content: ReactElement | ReactFragment | string;
  expanded?: boolean;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
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
      key={items.length}
    >
      {items.map((item, index) => {
        return (
          <div
            className={
              item.expanded
                ? "govuk-accordion__section govuk-accordion__section--expanded"
                : "govuk-accordion__section"
            }
            key={`accordion-section-${index}`}
          >
            <div className="govuk-accordion__section-header">
              <h2 className="govuk-accordion__section-heading">
                <span
                  className="govuk-accordion__section-button"
                  id={`accordion-default-heading-${index}`}
                >
                  {item.heading}
                </span>
              </h2>
            </div>
            <div
              id={`accordion-default-content-${index}`}
              className="govuk-accordion__section-content"
              aria-labelledby={`accordion-default-heading-${index}`}
            >
              <p className="govuk-body">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
