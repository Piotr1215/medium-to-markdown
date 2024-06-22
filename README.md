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

## License

This project is licensed under the MIT License 
