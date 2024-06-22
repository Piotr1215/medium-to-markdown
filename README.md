# Medium to Markdown Converter

A simple tool to convert Medium blogs to Markdown and clean up the Markdown file.

## Description

This tool uses Puppeteer to scrape Medium blog posts, download images, convert the HTML content to Markdown using Pandoc, and then clean up the Markdown file by removing unwanted tags and formatting code blocks.

## Installation

1. Install the dependencies:

```sh
npm install -g medium-blog-exporter 
```

## Usage

To use the tool, run the following command with the Medium blog URL as a parameter:

```sh
mediummd 'https://medium.com/some-blog-post-url'
```

## Features

- Downloads images from the Medium blog post into `_media` folder and updates the Markdown file with local image paths.
- Converts the HTML content of the blog post to Markdown.
- Cleans up the Markdown file by removing `div` and `span` tags and formatting code blocks.
- Removes angle brackets around URLs.
- Removes content after the last header and before the "Share" line.
- Removes unnecessary empty lines.

## Release Process

This project uses GitHub Actions to automate the release process. The release process is triggered by pushing a tag that follows the `v*.*.*` pattern (e.g., `v1.0.0`).

### Steps in the Release Process

1. **Checkout Code**: The workflow checks out the code from the repository.
2. **Set up Node.js**: The workflow sets up Node.js version 18 and caches npm dependencies.
3. **Install Dependencies**: The workflow installs the project dependencies using `npm install`.
4. **Run Tests**: The workflow runs the tests using `npm test`.
5. **Build Project**: The workflow builds the project using `npm run build`.
6. **Publish to npm**: The workflow publishes the package to npm. Ensure that the `NPM_TOKEN` secret is set in the repository settings.
7. **Create GitHub Release**: The workflow creates a GitHub release and attaches the built files. Ensure that the `GITHUB_TOKEN` secret is set in the repository settings.

## License

This project is licensed under the MIT License 
