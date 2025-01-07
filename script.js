// Sample operations
const operations = {
  base64Encode: (input) => btoa(input),
  base64Decode: (input) => atob(input),
  urlEncode: (input) => encodeURIComponent(input),
  urlDecode: (input) => decodeURIComponent(input),
  md5Hash: (input) => CryptoJS.MD5(input).toString(),
  sha256Hash: (input) => CryptoJS.SHA256(input).toString(),
  rot13: (input) =>
    input.replace(/[a-zA-Z]/g, (c) =>
      String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      )
    ),
  caesarCipher: (input, shift = 3) =>
    input.replace(/[a-zA-Z]/g, (c) =>
      String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + shift) ? c : c - 26
      )
    ),
  xorCipher: (input, key = 3) =>
    input
      .split("")
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
      .join(""),
  aesEncrypt: (input, key = "1234567890123456") => {
    const encrypted = CryptoJS.AES.encrypt(input, key);
    return encrypted.toString();
  },
  aesDecrypt: (input, key = "1234567890123456") => {
    const decrypted = CryptoJS.AES.decrypt(input, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  },
};

// DOM Elements
const operationsList = document.getElementById("operations-list");
const pipelineOperations = document.getElementById("pipeline-operations");
const inputData = document.getElementById("input-data");
const outputData = document.getElementById("output-data");

// Add operation to pipeline
operationsList.addEventListener("click", (e) => {
  const operation = e.target.dataset.operation;
  if (operation) {
    const li = document.createElement("li");
    li.textContent = e.target.textContent;
    li.dataset.operation = operation;

    // Create Remove button for each operation in the pipeline
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Add remove functionality
    removeButton.addEventListener("click", () => {
      li.remove();
      runPipeline();
    });

    li.appendChild(removeButton);
    pipelineOperations.appendChild(li);
    runPipeline();
  }
});

// Run pipeline
const runPipeline = () => {
  let data = inputData.value;

  // Apply each operation in the pipeline to the data
  pipelineOperations.querySelectorAll("li").forEach((li) => {
    const operation = li.dataset.operation;
    if (operations[operation]) {
      data = operations[operation](data);
    }
  });

  outputData.value = data;
};

// Update pipeline on input change
inputData.addEventListener("input", runPipeline);
