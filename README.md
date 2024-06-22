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

1. **Tag a Commit**: Tag a commit with the version number that will later become the npm package version (e.g., if the current version is 1.3.0, create a tag `v1.4.0`). The `v` will be dropped from the version on npm.
2. **Push the Tag**: Push the tag to the remote repository.
3. **Checkout Code**: The workflow checks out the code from the repository.
4. **Set up Node.js**: The workflow sets up Node.js version 18 and caches npm dependencies.
5. **Install Dependencies**: The workflow installs the project dependencies using `npm install`.
6. **Run Tests**: The workflow runs the tests using `npm test`.
7. **Increment Version**: The workflow increments the version number in `package.json` using `npm version patch`.
8. **Build Project**: The workflow builds the project using `npm run build`.
9. **Publish to npm**: The workflow publishes the package to npm. Ensure that the `NPM_TOKEN` secret is set in the repository settings.
10. **Create GitHub Release**: The workflow creates a GitHub release and attaches the built files. Ensure that the `GITHUB_TOKEN` secret is set in the repository settings.

## License

This project is licensed under the MIT License 
