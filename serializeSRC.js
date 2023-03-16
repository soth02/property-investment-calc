const fs = require('fs');
const path = require('path');

// Get the folder path and output file name from the command-line arguments
const folderPath = path.resolve(process.cwd(), process.argv[2]);
const outputFileName = process.argv[3];

// Define the output file path
const outputFilePath = path.join(process.cwd(), outputFileName);

// Recursively traverse the folder and all subfolders
function traverseFolder(currentPath) {
  let fileNames = [];
  let contents = '';

  // Read all the files and subdirectories in the current folder
  fs.readdirSync(currentPath).forEach((file) => {
    const filePath = path.join(currentPath, file);

    // If the file is a directory, recursively traverse it
    if (fs.statSync(filePath).isDirectory()) {
      const [subFileNames, subContents] = traverseFolder(filePath);
      fileNames = fileNames.concat(subFileNames);
      contents += subContents;
    }
    // If the file is a regular file, read its contents and add to the output
    else {
      fileNames.push(filePath);
      contents += `// File: ${filePath}\n`;
      contents += `${fs.readFileSync(filePath, 'utf8')}\n`;
      contents += '-'.repeat(80) + '\n';
    }
  });

  return [fileNames, contents];
}

// Traverse the folder and write the concatenated contents to the output file
const [fileNames, contents] = traverseFolder(folderPath);
fs.writeFileSync(outputFilePath, `// Serialized code written from:\n// ${fileNames.join('\n// ')}\n\n${contents}`);

console.log(`Serialized code written to ${outputFilePath}`);
