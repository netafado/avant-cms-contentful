## Avant Contentful Landing Page

## Overview

The goal of this project is to make it simple to create and update landing pages while ensuring good SEO, ease of maintenance, and low deployment costs.
We will achieve this using **Contentful**, **Next.js**, and **AWS Amplify**.

---

## Requirements

* **Strong SEO performance**
* **Easy to maintain** content and codebase
* **Low-cost, simple deployment**
* **Contentful for content management** – chosen for its ease of use, free tier, and prior experience working with it
* **Next.js for development** – provides powerful tools for SEO, security, and performance, along with excellent static site generation capabilities
* **AWS Amplify for deployment** – offers an easy deployment process within AWS's free tier

---

## Contentful Architecture

To simplify page creation and code updates, the Contentful setup will use four main models: **Page**, **Layout**, **Section**, and **Component**.

### 1. Page

* Defines which sections will be used and assigns a layout.
* The most important field is the **URL**, which must be unique. This will be used to fetch page content dynamically.

### 2. Layout

* Determines the overall structure of the page.
* Allows flexibility in creating and updating different types of landing pages.

### 3. Section

* Specifies how components are arranged and displayed, including column configurations.

### 4. Component

* The smallest building block visible to the user.
* Represents individual content elements such as text blocks, images, or buttons.

---

## Technology Stack

* **Contentful** – Headless CMS for managing page content without code changes.
* **Next.js** – Framework for building fast, SEO-friendly pages with static generation and dynamic rendering.
* **AWS Amplify** – Simplifies hosting and deployment while keeping costs low.

Check the [Contentful documentation](https://www.contentful.com/developers/docs/) for more information on how to manage the content.

![Screenshot](/docs/screenshot.png)

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v18 or later)
- [Yarn](https://yarnpkg.com/getting-started/install) (v1.22 or later)

## Getting Started

First, run the development server:

```bash
yarn install
```

Then, set up your environment variables. Create a `.env.local` file in the root of the project and add your Contentful space ID and access token:

```plaintext
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

Now, you can start the development server:

```bash
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Deploy it on AWS Amplify

1. Go to the [AWS Amplify Console](https://aws.amazon.com/amplify/).
2. Click on "Get Started" under "Deploy".
3. Connect your GitHub repository.
4. Choose the branch you want to deploy.
5. Amplify will automatically detect your Next.js app and configure the build settings.
6. Click "Save and Deploy".

After the deployment is complete, you will receive a URL to access your live application.
