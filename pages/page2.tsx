import Head from "next/head";
import React, { useState } from "react";
import { Accordion2, Accordion2Item } from "@/components/Accordion2";
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="govuk-width-container ">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <h1 className="govuk-heading-xl">Approach 2</h1>
          <p className="govuk-body">
            <Link className="govuk-link" href="/">Page 1</Link>
          </p>
          <Accordion2>
            <Accordion2Item heading="Page 2" headingId="accordion-p2-heading" contentId="accordion-p2-content" expanded>
              This is the content for Page 2.
            </Accordion2Item>
            <Accordion2Item heading="Writing well for the web" headingId="accordion-web-heading" contentId="accordion-web-content">
              This is the content for Writing well for the web.
            </Accordion2Item>
            <Accordion2Item heading="Writing well for specialists" headingId="accordion-specialist-heading" contentId="accordion-specialist-content">
              This is the content for Writing well for specialists.
            </Accordion2Item>
          </Accordion2>
        </main>
      </div>
    </>
  );
}