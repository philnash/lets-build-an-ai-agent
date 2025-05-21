import { join } from "node:path";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";

export class History {
  constructor() {
    this.filePath = join(".", "/tmp", "messages.json");
    this.messages = this.loadMessages();
  }

  loadMessages() {
    if (existsSync(this.filePath)) {
      const data = readFileSync(this.filePath, "utf-8");
      if (data.trim() === "") {
        return [];
      }
      return JSON.parse(data);
    } else {
      mkdirSync(join(".", "/tmp"));
    }
    return [];
  }

  async addMessage(message) {
    this.messages.push(message);
    await this.saveMessages();
  }

  async saveMessages() {
    this.messages = this.messages.slice(-30);

    return writeFile(
      this.filePath,
      JSON.stringify(this.messages, null, 2),
      "utf-8"
    );
  }
}
