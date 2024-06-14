const fs = require('fs');

const filePath = 'blog.md';
const tempFilePath = 'temp_blog.md';

// Function to remove div and span tags but keep the content inside
function removeTagsKeepContent(data, tag) {
  const tagPattern = new RegExp(`<${tag}[^>]*>`, 'g');
  const closingTagPattern = new RegExp(`</${tag}>`, 'g');
  return data.replace(tagPattern, '').replace(closingTagPattern, '');
}

// Function to clean up the artifacts in code blocks and add bash syntax highlighting
function cleanCodeBlocks(data) {
  return data.replace(/```[\s\S]*?```/g, match => {
    // Remove any unwanted characters after the initial backticks and add bash for syntax highlighting
    return match.replace(/```[^`\n]*\n/, '```bash\n');
  });
}

// Function to remove angle brackets around URLs
function removeAngleBracketsAroundURLs(data) {
  return data.replace(/<https?:\/\/[^>]+>/g, match => {
    // Remove the angle brackets around the URL
    return match.slice(1, -1);
  });
}

// Read the Markdown file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${err.message}`);
    return;
  }

  // Remove div and span tags but keep the content inside
  let cleanedData = removeTagsKeepContent(data, 'div');
  cleanedData = removeTagsKeepContent(cleanedData, 'span');

  // Clean up the artifacts in code blocks and add bash syntax highlighting
  cleanedData = cleanCodeBlocks(cleanedData);

  // Remove angle brackets around URLs
  cleanedData = removeAngleBracketsAroundURLs(cleanedData);

  // Write the cleaned data to a temporary file
  fs.writeFile(tempFilePath, cleanedData, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing to the temporary file: ${err.message}`);
      return;
    }

    // Rename the temporary file to the original file
    fs.rename(tempFilePath, filePath, (err) => {
      if (err) {
        console.error(`Error renaming the temporary file: ${err.message}`);
        return;
      }
      console.log('Markdown file cleaned successfully!');
    });
  });
});
