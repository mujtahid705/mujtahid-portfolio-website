class Terminal {
  constructor() {
    this.output = document.getElementById("terminal-output");
    this.input = document.getElementById("terminal-input");
    this.promptElement = document.getElementById("terminal-prompt");
    this.terminalElement = document.getElementById("terminal");

    this.currentPath = "~";
    this.commandHistory = [];
    this.historyIndex = -1;
    this.fileSystem = {};
    this.userFiles = {};
    this.config = null;

    this.init();
  }

  async init() {
    await this.loadConfig();
    this.setupEventListeners();
    this.showWelcome();
    this.updatePrompt();
    this.input.focus();
  }

  async loadConfig() {
    try {
      const response = await fetch("data/config.json");
      this.config = await response.json();
      this.fileSystem = this.config.terminal.fileSystem;
    } catch (error) {
      console.error("Failed to load config:", error);
    }
  }

  // Event handling
  setupEventListeners() {
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
    this.terminalElement.addEventListener("click", () => this.input.focus());

    window.addEventListener("resize", () => {
      this.refreshWelcomeMessage();
    });
  }

  refreshWelcomeMessage() {
    this.output.innerHTML = "";
    this.showWelcome();
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = this.input.value.trim();
      if (command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        this.executeCommand(command);
      }
      this.input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.commandHistory[this.historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.input.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.input.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      this.handleTabCompletion();
    }
  }

  // Display methods
  showWelcome() {
    let welcome;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 640) {
      welcome = this.config.terminal.welcomeMobile;
    } else {
      welcome = this.config.terminal.welcome;
    }

    const lines = welcome.split("\n");

    let asciiArtLines = [];
    let regularLines = [];
    let isAsciiArt = true;

    lines.forEach((line) => {
      if (line.trim() === "" && asciiArtLines.length > 0 && isAsciiArt) {
        isAsciiArt = false;
        regularLines.push(line);
      } else if (isAsciiArt) {
        asciiArtLines.push(line);
      } else {
        regularLines.push(line);
      }
    });

    if (asciiArtLines.length > 0) {
      const welcomeDiv = document.createElement("div");
      welcomeDiv.className = "terminal-welcome";
      welcomeDiv.textContent = asciiArtLines.join("\n");
      this.output.appendChild(welcomeDiv);
    }

    regularLines.forEach((line) => {
      const div = document.createElement("div");
      div.className = "terminal-line";
      div.textContent = line;
      this.output.appendChild(div);
    });

    this.output.appendChild(document.createElement("br"));
  }

  updatePrompt() {
    this.promptElement.textContent = `visitor@mujtahid:${this.currentPath}$ `;
  }

  // Command execution
  executeCommand(command) {
    const promptText = this.promptElement.textContent;
    const commandDiv = document.createElement("div");
    commandDiv.className = "terminal-line";

    const promptSpan = document.createElement("span");
    promptSpan.className = "terminal-prompt";
    promptSpan.textContent = promptText;

    const commandSpan = document.createElement("span");
    commandSpan.className = "terminal-command";
    commandSpan.textContent = command;

    commandDiv.appendChild(promptSpan);
    commandDiv.appendChild(commandSpan);
    this.output.appendChild(commandDiv);

    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        this.showHelp();
        break;
      case "ls":
        this.listDirectory(args);
        break;
      case "cd":
        this.changeDirectory(args);
        break;
      case "cat":
        this.readFile(args);
        break;
      case "pwd":
        this.printWorkingDirectory();
        break;
      case "clear":
        this.clearTerminal();
        break;
      case "mkdir":
        this.makeDirectory(args);
        break;
      case "touch":
        this.createFile(args);
        break;
      case "rm":
        this.removeFile(args);
        break;
      case "echo":
        this.echo(args);
        break;
      case "whoami":
        this.whoami();
        break;
      case "date":
        this.showDate();
        break;
      default:
        this.addOutput(
          `Command not found: ${cmd}. Type 'help' for available commands.`,
          "terminal-error"
        );
    }

    this.scrollToBottom();
  }

  // Command implementations
  showHelp() {
    const helpText = [
      "Available commands:",
      "",
      "  ls [dir]       - List directory contents",
      "  cd <dir>       - Change directory",
      "  cat <file>     - Display file contents",
      "  pwd            - Print working directory",
      "  mkdir <dir>    - Create a new directory (temporary)",
      "  touch <file>   - Create a new file (temporary)",
      "  rm <file>      - Remove a file (temporary only)",
      "  echo <text>    - Display text",
      "  clear          - Clear terminal screen",
      "  whoami         - Display current user",
      "  date           - Display current date and time",
      "  help           - Display this help message",
      "",
      "Navigation tips:",
      "  - Use Tab for auto-completion",
      "  - Use Arrow Up/Down for command history",
      "  - Use cd .. to go back to parent directory",
      "  - Use cd ~ or cd to go to home directory",
    ];
    helpText.forEach((line) => this.addOutput(line));
  }

  listDirectory(args) {
    const targetPath = args[0] || ".";
    const dir = this.resolvePath(targetPath);
    const dirContents = this.getDirectoryContents(dir);

    if (dirContents === null) {
      this.addOutput(
        `ls: cannot access '${targetPath}': No such file or directory`,
        "terminal-error"
      );
      return;
    }

    if (dirContents.type === "file") {
      this.addOutput(targetPath);
      return;
    }

    const entries = Object.keys(dirContents);
    if (entries.length === 0) {
      return;
    }

    const dirs = entries.filter((name) => {
      const item = dirContents[name];
      return item.type === "directory";
    });
    const files = entries.filter((name) => {
      const item = dirContents[name];
      return item.type === "file";
    });

    const output = [];
    dirs.forEach((dir) =>
      output.push(`<span class="terminal-dir">${dir}/</span>`)
    );
    files.forEach((file) =>
      output.push(`<span class="terminal-file">${file}</span>`)
    );

    this.addOutput(output.join("  "), "", true);
  }

  changeDirectory(args) {
    if (args.length === 0 || args[0] === "~") {
      this.currentPath = "~";
      this.updatePrompt();
      return;
    }

    const targetPath = args[0];

    if (targetPath === "..") {
      if (this.currentPath !== "~") {
        const parts = this.currentPath.split("/").filter((p) => p && p !== "~");
        parts.pop();
        this.currentPath = parts.length === 0 ? "~" : "~/" + parts.join("/");
      }
      this.updatePrompt();
      return;
    }

    const newPath = this.resolvePath(targetPath);
    const dirContents = this.getDirectoryContents(newPath);

    if (dirContents === null) {
      this.addOutput(
        `cd: ${targetPath}: No such file or directory`,
        "terminal-error"
      );
      return;
    }

    if (dirContents.type === "file") {
      this.addOutput(`cd: ${targetPath}: Not a directory`, "terminal-error");
      return;
    }

    this.currentPath = newPath;
    this.updatePrompt();
  }

  readFile(args) {
    if (args.length === 0) {
      this.addOutput("cat: missing file operand", "terminal-error");
      return;
    }

    const filePath = args[0];
    const fullPath = this.resolvePath(filePath);
    const file = this.getDirectoryContents(fullPath);

    if (file === null) {
      this.addOutput(
        `cat: ${filePath}: No such file or directory`,
        "terminal-error"
      );
      return;
    }

    if (file.type === "directory") {
      this.addOutput(`cat: ${filePath}: Is a directory`, "terminal-error");
      return;
    }

    const content = file.content || "";
    content.split("\n").forEach((line) => this.addOutput(line));
  }

  printWorkingDirectory() {
    this.addOutput(this.currentPath);
  }

  clearTerminal() {
    this.output.innerHTML = "";
  }

  makeDirectory(args) {
    if (args.length === 0) {
      this.addOutput("mkdir: missing operand", "terminal-error");
      return;
    }

    const dirName = args[0];
    if (dirName.includes("/")) {
      this.addOutput(
        "mkdir: only simple directory names allowed in current directory",
        "terminal-error"
      );
      return;
    }

    const currentDir = this.getCurrentDirectory();
    if (currentDir[dirName]) {
      this.addOutput(
        `mkdir: cannot create directory '${dirName}': File exists`,
        "terminal-error"
      );
      return;
    }

    currentDir[dirName] = {
      type: "directory",
      temporary: true,
    };

    this.addOutput(`Created directory: ${dirName}`);
  }

  createFile(args) {
    if (args.length === 0) {
      this.addOutput("touch: missing file operand", "terminal-error");
      return;
    }

    const fileName = args[0];
    if (fileName.includes("/")) {
      this.addOutput(
        "touch: only simple file names allowed in current directory",
        "terminal-error"
      );
      return;
    }

    const currentDir = this.getCurrentDirectory();
    if (currentDir[fileName]) {
      return;
    }

    currentDir[fileName] = {
      type: "file",
      content: "",
      temporary: true,
    };

    this.addOutput(`Created file: ${fileName}`);
  }

  removeFile(args) {
    if (args.length === 0) {
      this.addOutput("rm: missing operand", "terminal-error");
      return;
    }

    const fileName = args[0];
    const currentDir = this.getCurrentDirectory();

    if (!currentDir[fileName]) {
      this.addOutput(
        `rm: cannot remove '${fileName}': No such file or directory`,
        "terminal-error"
      );
      return;
    }

    if (!currentDir[fileName].temporary) {
      this.addOutput(
        `rm: cannot remove '${fileName}': Operation not permitted (only temporary files can be removed)`,
        "terminal-error"
      );
      return;
    }

    delete currentDir[fileName];
    this.addOutput(`Removed: ${fileName}`);
  }

  echo(args) {
    this.addOutput(args.join(" "));
  }

  whoami() {
    this.addOutput("visitor");
  }

  showDate() {
    this.addOutput(new Date().toString());
  }

  // Utility methods
  resolvePath(path) {
    if (path === "." || path === "") {
      return this.currentPath;
    }

    if (path === "..") {
      if (this.currentPath === "~") return "~";
      const parts = this.currentPath.split("/").filter((p) => p && p !== "~");
      parts.pop();
      return parts.length === 0 ? "~" : "~/" + parts.join("/");
    }

    if (path.startsWith("~/")) {
      return path;
    }

    if (path.startsWith("/")) {
      return "~" + path;
    }

    if (this.currentPath === "~") {
      return `~/${path}`;
    }

    return `${this.currentPath}/${path}`;
  }

  getDirectoryContents(path) {
    if (path === "~") {
      return this.fileSystem;
    }

    const parts = path
      .replace("~/", "")
      .split("/")
      .filter((p) => p);
    let current = this.fileSystem;

    for (const part of parts) {
      if (!current[part]) {
        return null;
      }

      if (current[part].type === "file") {
        return current[part];
      }

      if (current[part].type === "directory") {
        current = current[part].contents || current[part];
      }
    }

    return current;
  }

  getCurrentDirectory() {
    if (this.currentPath === "~") {
      return this.fileSystem;
    }

    const parts = this.currentPath
      .replace("~/", "")
      .split("/")
      .filter((p) => p);
    let current = this.fileSystem;

    for (const part of parts) {
      if (current[part] && current[part].type === "directory") {
        current = current[part].contents || current[part];
      }
    }

    return current;
  }

  handleTabCompletion() {
    const input = this.input.value;
    const parts = input.split(" ");
    const lastPart = parts[parts.length - 1];

    if (parts.length === 1) {
      const commands = [
        "help",
        "ls",
        "cd",
        "cat",
        "pwd",
        "clear",
        "mkdir",
        "touch",
        "rm",
        "echo",
        "whoami",
        "date",
      ];
      const matches = commands.filter((cmd) => cmd.startsWith(lastPart));
      if (matches.length === 1) {
        this.input.value = matches[0];
      }
    } else {
      const currentDir = this.getCurrentDirectory();
      const entries = Object.keys(currentDir);
      const matches = entries.filter((entry) => entry.startsWith(lastPart));

      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        this.input.value = parts.join(" ");
      }
    }
  }

  addOutput(text, className = "", isHTML = false) {
    const div = document.createElement("div");
    div.className = `terminal-line ${className}`;

    if (isHTML) {
      div.innerHTML = text;
    } else {
      div.textContent = text;
    }

    this.output.appendChild(div);
  }

  scrollToBottom() {
    this.terminalElement.scrollTop = this.terminalElement.scrollHeight;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Terminal();
});
