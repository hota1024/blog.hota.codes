import { ReactNode } from "react";

export type HeaderLink = {
  /**
   * Icon.
   */
  icon?: ReactNode;
  /**
   * Link text.
   */
  text: string;
  /**
   * Link URL.
   */
  href: string;
};

export type SNSLinks = {
  /**
   * X(Twitter) username.
   */
  x?: string;
  /**
   * GitHub username.
   */
  github?: string;
};

export type SiteData = {
  /**
   * Site title.
   */
  title: string;
  /**
   * Site description.
   */
  description: string;
  /**
   * Site URL.
   */
  siteURL: string;

  /**
   * GitHub repository(`{org|user}/{repo}`).
   */
  githubRepo?: string;

  /**
   * Site author name.
   */
  author: string;
  /**
   * X(Twitter) username.
   */
  x?: string;
  /**
   * GitHub username.
   */
  github?: string;

  /**
   * Header links.
   */
  headerLinks: HeaderLink[];

  /**
   * SNS links.
   */
  sns: SNSLinks;
};
